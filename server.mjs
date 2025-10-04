// server.mjs
import express from "express";
import "dotenv/config";
import { Resend } from "resend";
import fs from "fs/promises";
import path from "node:path";
import crypto from "crypto";
import * as jose from "jose";

const app = express();
app.use(express.json());

// ───────────────────────── Resend / Contact ─────────────────────────
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_TO || "paulaghcoach@gmail.com";
const CONTACT_FROM =
  process.env.CONTACT_FROM || "Website <onboarding@resend.dev>"; // în test: onboarding@resend.dev
if (!RESEND_API_KEY) console.error("[boot] Lipsă RESEND_API_KEY în .env");
const resend = new Resend(RESEND_API_KEY);

// ───────────────────────── Firebase ID Token verify (fără service account) ─────────────────────────
const FIREBASE_PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.VITE_FIREBASE_PROJECT_ID ||
  ""; // setează în .env
if (!FIREBASE_PROJECT_ID) {
  console.warn("[boot] Lipsă FIREBASE_PROJECT_ID (folosit pentru verificarea ID token-urilor)");
}
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "paulaghcoach@gmail.com")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const GOOGLE_JWKS = jose.createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  )
);

async function verifyFirebaseIdToken(idToken) {
  const { payload } = await jose.jwtVerify(idToken, GOOGLE_JWKS, {
    issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
    audience: FIREBASE_PROJECT_ID,
  });
  return payload; // { user_id, email, ... }
}

async function requireFirebaseAdmin(req, res, next) {
  try {
    const h = req.headers.authorization || "";
    const m = h.match(/^Bearer\s+(.+)$/i);
    if (!m) return res.status(401).json({ ok: false, error: "no token" });
    const decoded = await verifyFirebaseIdToken(m[1]);
    const email = String(decoded.email || "").toLowerCase();
    if (!email || !ADMIN_EMAILS.includes(email)) {
      return res.status(403).json({ ok: false, error: "forbidden" });
    }
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, error: "invalid token" });
  }
}

// (opțional) debug: vezi cine e logat la API
app.get("/api/auth/me", requireFirebaseAdmin, (req, res) => {
  res.json({ ok: true, email: req.user.email, uid: req.user.user_id });
});

// ───────────────────────── Newsletter (file storage) ─────────────────────────
const APP_BASE_URL = process.env.APP_BASE_URL || "http://localhost:5173"; // pt. linkul de unsubscribe
const NEWSLETTER_SECRET = process.env.NEWSLETTER_SECRET || "dev-secret"; // HMAC pt. linkuri dezabonare

const SUBS_FILE = path.resolve("./subscribers.json");
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function readSubs() {
  try {
    return JSON.parse(await fs.readFile(SUBS_FILE, "utf8"));
  } catch {
    return { subscribers: [] };
  }
}
async function writeSubs(data) {
  await fs.writeFile(SUBS_FILE, JSON.stringify(data, null, 2));
}
function tokenFor(email) {
  return crypto
    .createHmac("sha256", NEWSLETTER_SECRET)
    .update(String(email).toLowerCase())
    .digest("hex")
    .slice(0, 24);
}
function unsubLink(email) {
  return `${APP_BASE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(
    email
  )}&token=${tokenFor(email)}`;
}
function escapeHtml(str) {
  return String(str).replace(/[&<>\"']/g, (m) =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    })[m]
  );
}

// ───────────────────────── CONTACT ─────────────────────────
app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body || {};
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ ok: false, error: "Câmpuri lipsă." });
    }
    const subject = `Mesaj nou de pe site: ${firstName} ${lastName}`;
    const { data, error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject,
      replyTo: email,
      text: `De la: ${firstName} ${lastName} <${email}>\n\n${message}`,
      html: `
        <p><strong>De la:</strong> ${escapeHtml(firstName)} ${escapeHtml(
        lastName
      )} &lt;${escapeHtml(email)}&gt;</p>
        <p>${escapeHtml(String(message)).replace(/\n/g, "<br/>")}</p>
      `,
    });
    if (error)
      return res
        .status(502)
        .json({ ok: false, error: error.message || "Resend error" });

    return res.json({ ok: true, id: data?.id || null });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return res
      .status(500)
      .json({ ok: false, error: err?.message || "Eroare server." });
  }
});

// ───────────────────────── NEWSLETTER: subscribe (file) ─────────────────────────
async function subscribeHandler(req, res) {
  try {
    const { email, name } = req.body || {};
    if (!email || !emailRx.test(email)) {
      return res.status(400).json({ ok: false, error: "Email invalid." });
    }
    const dbFile = await readSubs();
    const emailL = String(email).toLowerCase();
    const found = dbFile.subscribers.find(
      (s) => s.email.toLowerCase() === emailL
    );

    if (found) {
      if (found.status !== "active") {
        found.status = "active";
        found.updatedAt = new Date().toISOString();
        await writeSubs(dbFile);
      }
      return res.json({ ok: true, already: true });
    }

    dbFile.subscribers.push({
      email: emailL,
      name: name?.trim() || "",
      status: "active",
      subscribedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    await writeSubs(dbFile);

    // welcome (în test → preview către tine)
    try {
      const isTest = /resend\.dev/i.test(CONTACT_FROM);
      const toForWelcome = isTest ? CONTACT_TO : emailL;
      const note = isTest
        ? `<p style="font-size:12px;color:#666">[PREVIEW pentru ${emailL}]</p>`
        : "";
      await resend.emails.send({
        from: CONTACT_FROM,
        to: toForWelcome,
        subject: "Bine ai venit în newsletter!",
        text: `Mulțumim pentru abonare.${
          isTest ? ` (PREVIEW pentru ${emailL})` : ""
        }\n\n—\nDezabonare: ${unsubLink(emailL)}`,
        html:
          note +
          `<h2>Bine ai venit!</h2><p>Mulțumim pentru abonare.</p>
        <hr/><p style="font-size:12px;color:#666">Dacă nu mai vrei aceste emailuri, <a href="${unsubLink(
          emailL
        )}">dezabonează-te</a>.</p>`,
        headers: { "List-Unsubscribe": `<${unsubLink(emailL)}>` },
      });
    } catch (e) {
      console.warn("[newsletter] welcome failed:", e?.message);
    }

    // notify admin
    try {
      await resend.emails.send({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        subject: `Abonare nouă: ${emailL}`,
        html: `<p><strong>S-a abonat:</strong> ${emailL}</p><p><strong>Nume:</strong> ${escapeHtml(
          name || "-"
        )}</p>`,
      });
    } catch (e) {
      console.warn("[newsletter] admin notify failed:", e?.message);
    }

    return res.json({ ok: true });
  } catch (e) {
    console.error("[subscribe] error", e);
    return res.status(500).json({ ok: false, error: "Eroare server." });
  }
}
app.post("/api/newsletter/subscribe", subscribeHandler);
app.post("/api/subscribe", subscribeHandler);

app.get("/api/newsletter/unsubscribe", async (req, res) => {
  try {
    const email = String(req.query.email || "").toLowerCase();
    const token = String(req.query.token || "");
    if (!email || token !== tokenFor(email))
      return res.status(400).send("Link invalid.");
    const dbFile = await readSubs();
    const s = dbFile.subscribers.find(
      (x) => x.email.toLowerCase() === email
    );
    if (!s) return res.status(404).send("Abonat inexistent.");
    s.status = "unsubscribed";
    s.updatedAt = new Date().toISOString();
    await writeSubs(dbFile);
    return res.send("Te-ai dezabonat cu succes. Îți mulțumim!");
  } catch (e) {
    console.error("[unsubscribe] error", e);
    return res.status(500).send("Eroare server.");
  }
});

// ───────────────────────── NEWSLETTER: broadcast (autentificare Firebase) ─────────────────────────
app.post("/api/newsletter/broadcast", requireFirebaseAdmin, async (req, res) => {
  try {
    const { subject, html, text, test } = req.body || {};
    if (!subject || (!html && !text)) {
      return res
        .status(400)
        .json({ ok: false, error: "Subject și conținut necesare." });
    }

    let recipients = [];
    if (test === true) {
      // test → doar către admin
      recipients = [{ email: CONTACT_TO }];
    } else {
      const dbFile = await readSubs();
      recipients = dbFile.subscribers
        .filter((s) => s.status === "active")
        .map((s) => ({ email: s.email }));
    }
    if (!recipients.length)
      return res.json({ ok: true, sent: 0, failed: 0, errors: [] });

    let sent = 0,
      failed = 0;
    const errors = [];

    for (const r of recipients) {
      try {
        const u = unsubLink(r.email);
        const { error } = await resend.emails.send({
          from: CONTACT_FROM,
          to: r.email,
          subject,
          text: (text || "") + `\n\n—\nDezabonare: ${u}`,
          html:
            (html || `<p>${escapeHtml(text || "")}</p>`) +
            `<hr/><p style="font-size:12px;color:#666">Dacă nu mai vrei aceste emailuri, <a href="${u}">dezabonează-te</a>.</p>`,
          headers: { "List-Unsubscribe": `<${u}>` },
        });
        if (error) {
          failed++;
          errors.push(error.message || "unknown");
        } else {
          sent++;
        }
      } catch (e) {
        failed++;
        errors.push(e.message || "exception");
      }
    }
    return res.json({ ok: true, sent, failed, errors });
  } catch (e) {
    console.error("[broadcast] error", e);
    return res
      .status(500)
      .json({ ok: false, error: e?.message || "Eroare server." });
  }
});

// ───────────────────────── Health (opțional) ─────────────────────────
app.get("/api/newsletter/health", async (_req, res) => {
  const fileDb = await readSubs();
  const active = fileDb.subscribers.filter((s) => s.status === "active").length;
  const unsub = fileDb.subscribers.filter((s) => s.status === "unsubscribed")
    .length;
  res.json({ ok: true, counts: { active, unsub } });
});

app.listen(3001, () => console.log("API ready on http://localhost:3001"));
