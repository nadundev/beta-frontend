import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a diet planning assistant. Always respond with valid JSON data following the specified structure. Ensure all numeric values are numbers, not strings.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate diet plan. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
