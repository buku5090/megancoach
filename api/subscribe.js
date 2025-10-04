export default async function handler(req, res) {
  // Health check pentru GET
  if (req.method === "GET") return res.status(200).json({ ok: true });

  // Preflight
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = (process.env.BREVO_API_KEY || "").trim();
  const listIdRaw = (process.env.BREVO_DEFAULT_LIST_ID || "").trim();

  if (!apiKey) return res.status(500).json({ error: "Missing BREVO_API_KEY" });
  if (!listIdRaw) return res.status(500).json({ error: "Missing BREVO_DEFAULT_LIST_ID" });

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const email = (body.email || "").trim();
  if (!email) return res.status(400).json({ error: "Email is required" });

  const listId = Number(listIdRaw);

  try {
    const r = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey, // <- important
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    const data = await r.json().catch(() => ({}));

    if (!r.ok) {
      // propaga motivul exact de la Brevo (ex. "Key not found", "List id not found" etc.)
      return res.status(r.status).json({ error: data?.message || data?.error || "Brevo error" });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
