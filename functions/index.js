/* eslint-disable no-undef */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Setează tokenul în config, nu în cod:
// firebase functions:config:set admin.token="super-secret"
exports.createPost = functions.https.onRequest(async (req, res) => {
  // CORS minimal (poți restrânge pe domeniul tău)
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, x-admin-token");
  if (req.method === "OPTIONS") return res.status(204).send("");

  try {
    const token = req.header("x-admin-token");
    const expected = functions.config().admin?.token;
    if (!token || !expected || token !== expected) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { title, slug, cover, tags, excerpt, content } = req.body || {};
    if (!title || !slug || !content) {
      return res.status(400).json({ error: "title, slug, content sunt obligatorii" });
    }

    const now = new Date().toISOString();
    const doc = {
      title,
      slug,
      cover: cover || null,
      tags: Array.isArray(tags) ? tags : [],
      excerpt: excerpt || "",
      content,
      createdAt: now,
      updatedAt: now,
      published: true
    };

    const ref = await db.collection("posts").add(doc);
    return res.status(201).json({ id: ref.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});
