import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/chat", async (req, res) => {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  if (!apiKey) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY is not configured on the server." });
    return;
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    req.log.error({ err }, "Error proxying request to Anthropic");
    res.status(502).json({ error: "Failed to reach the AI service. Please try again." });
  }
});

export default router;
