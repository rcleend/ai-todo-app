import { NextResponse } from "next/server";
import { Task } from "@/lib/types";
import { GROQ_API_URL } from "@/lib/config";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(request: Request) {
  try {
    const { tasks } = await request.json();

    const prompt = `Given these tasks:
${tasks
  .map(
    (task: Task) =>
      `- ${task.title}${task.description ? `: ${task.description}` : ""}`
  )
  .join("\n")}

Suggest 3 additional tasks that would complement the existing ones. Return them in this JSON format:
{
  "suggestions": [
    {"title": "task title", "description": "task description"},
    {"title": "task title", "description": "task description"},
    {"title": "task title", "description": "task description"}
  ]
}`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get suggestions from Groq");
    }

    const data = await response.json();
    const suggestions = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Error in suggestion generation:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 }
    );
  }
}
