const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });

// ✅ Attach the secret
const DOCUMIND_API_KEY = defineSecret("DOCUMIND_API_KEY");

exports.chat = onRequest(
  { region: "us-central1", secrets: [DOCUMIND_API_KEY] },
  async (req, res) => {
    cors(req, res, async () => {
      if (req.method === "OPTIONS") return res.status(204).send("");

      try {
        if (req.method !== "POST") {
          return res.status(405).json({ error: "Use POST" });
        }

        const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        const { message, history } = body || {};

        if (!message || typeof message !== "string") {
          return res.status(400).json({ error: "Missing 'message' string" });
        }

        // ✅ Call your custom Documind API
        const documindRes = await fetch("https://documind.parshantyadav.com/api/v1/chat", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + DOCUMIND_API_KEY.value(),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: message,
            history: history || []
          })
        });

        if (!documindRes.ok) {
          throw new Error("Documind API returned status " + documindRes.status);
        }

        const data = await documindRes.json();
        const reply = data.reply;

        return res.status(200).json({ reply });
      } catch (e) {
        logger.error("Error in chat function", e);
        return res.status(500).json({ error: "Server error", detail: e.message || String(e) });
      }
    });
  }
);
