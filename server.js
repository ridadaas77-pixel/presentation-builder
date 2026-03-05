// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");  // <-- use OpenAI directly

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  // <-- reads your .env
});

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });

    const text = completion.choices[0].message.content;
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI Fehler" });
  }
});

app.listen(3000, () =>
  console.log("Server läuft auf http://localhost:3000")
);
