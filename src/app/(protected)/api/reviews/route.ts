import { NextResponse } from "next/server";
import { client } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch comments from Prisma database without user authentication
    const comments = await client.dms.findMany({
      select: {
        id: true,
        message: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!comments.length) {
      return NextResponse.json({ message: "No comments found" }, { status: 200 });
    }

    // Send comments to FastAPI for sentiment analysis
    const analyzedComments = await Promise.all(
      comments.map(async (comment) => {
        const response = await fetch("http://localhost:8000/analyze-comment/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: "insta_comment", // Dummy ID
            text: comment.message,
          }),
        });

        const data = await response.json();
        return {
          id: comment.id,
          message: comment.message,
          createdAt: comment.createdAt,
          sentiment: data.sentiment, // "positive", "negative", or "neutral"
        };
      })
    );

    // Count positive and negative comments
    const positiveCount = analyzedComments.filter(c => c.sentiment === "positive").length;
    const negativeCount = analyzedComments.filter(c => c.sentiment === "negative").length;
    const neutralCount = analyzedComments.filter(c => c.sentiment === "neutral").length;

    return NextResponse.json({
      totalComments: comments.length,
      positiveComments: positiveCount,
      negativeComments: negativeCount,
      neutralComments: neutralCount,
      comments: analyzedComments,
    });

  } catch (error) {
    console.error("Error fetching and analyzing comments:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
