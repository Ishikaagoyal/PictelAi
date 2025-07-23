import Constants from "@/data/Constants";
import { NextRequest } from "next/server";
import OpenAI from 'openai';
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { model, description, imageurl } = await req.json();
  
  const modelobj = Constants.AiModelList.find(item => item.name === model);
  const modelname = modelobj?.modelname || 'google/gemini-2.5-flash-lite-preview-06-17'; 
  console.log(modelname);

  const response = await openai.chat.completions.create({
    model: modelname,
    stream: true,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: description,
          },
          {
            type: "image_url",
            image_url: {
              url: imageurl,
            },
          },
        ],
      },
    ],
  });

  // Create a readable stream of data in real-time
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const text = chunk.choices?.[0]?.delta?.content || "";
        if (text) {
          controller.enqueue(new TextEncoder().encode(text)); // Push data into the stream
        }
      }
      controller.close(); // Close the stream once all chunks are processed
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
//copyrights @ishikagoyal