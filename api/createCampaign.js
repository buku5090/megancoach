export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const subject = (body.subject || "").trim();
  const content = body.content || "<p>No content</p>";
  if (!subject) return res.status(400).json({ error: "Subject is required" });

  try {
    const r = await fetch("https://api.brevo.com/v3/emailCampaigns", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        name: `Campaign ${new Date().toISOString()}`,
        subject,
        sender: {
          name: process.env.BREVO_SENDER_NAME,
          email: process.env.BREVO_SENDER_EMAIL,
        },
        type: "classic",
        htmlContent: content,
        recipients: { listIds: [Number(process.env.BREVO_DEFAULT_LIST_ID)] },
      }),
    });

    const data = await r.json();
    return res.status(r.ok ? 200 : 400).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
