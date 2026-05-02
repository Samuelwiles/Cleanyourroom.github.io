import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const client = new OpenAI({
  apiKey: "YOUR_OPENAI_API_KEY"
});

app.post("/analyze", async (req, res) => {
  const image = req.body.image;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: "Analyze this image and give step-by-step instructions to organize it neatly." },
          { type: "input_image", image_url: image }
        ]
      }
    ]
  });

  res.json({ result: response.output_text });
});

app.listen(3000, () => console.log("Server running on port 3000"));
