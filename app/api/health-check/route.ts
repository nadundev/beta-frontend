import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function GET() {
  try {
    // Simple model list request to check API availability
    await openai.models.list();
    return new Response(JSON.stringify({ status: "available" }));
  } catch (error) {
    console.error("OpenAI API Health Check Error:", error);
    return new Response(JSON.stringify({ status: "unavailable" }), {
      status: 503,
    });
  }
}
