import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const API_KEY = "AIzaSyCbv1m7WSLo7uBp5pTvlFoMYkqW6wnp-s0";

const genAI = new GoogleGenerativeAI(API_KEY);

async function expandBackdrop() {
  const imagePath = path.join(process.cwd(), "public/assets/theater-bg.jpg");

  // Read the image
  const imageData = fs.readFileSync(imagePath);
  const base64Image = imageData.toString("base64");

  // Use Gemini 2.0 Flash for image generation
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      responseModalities: ["image", "text"],
    },
  });

  console.log("Sending request to Gemini...");

  const prompt = `You are given an image of a vintage ornate movie theater interior.

Please generate an EXPANDED version of this image that extends the scene vertically (adding more content above and below).
The expanded areas should seamlessly continue:
- Above: More of the ornate ceiling, architectural details, and dark theater atmosphere
- Below: More theater seats and floor

Maintain the same vintage, noir aesthetic with golden/bronze tones and the ornate architectural style.

Generate the expanded image.`;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
    ]);

    const response = await result.response;

    // Check for image in response
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          // Save the generated image
          const outputPath = path.join(process.cwd(), "public/assets/theater-bg-expanded.png");
          const imageBuffer = Buffer.from(part.inlineData.data, "base64");
          fs.writeFileSync(outputPath, imageBuffer);
          console.log(`Expanded image saved to: ${outputPath}`);
          return;
        }
        if (part.text) {
          console.log("Text response:", part.text);
        }
      }
    }

    console.log("No image in response. Full response:", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Response details:", error.response);
    }
  }
}

expandBackdrop();
