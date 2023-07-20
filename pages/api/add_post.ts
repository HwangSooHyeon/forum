import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { getServerSession, DefaultSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    let session: DefaultSession | null = await getServerSession(
      request,
      response,
      authOptions
    );
    if (session === null) {
      return response.status(500).json("유저 정보 없음");
    }
    request.body.author = session.user!.email;
    if (request.body.title == "") {
      return response.status(500).json("너 제목 왜 안씀?");
    }
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("post").insertOne(request.body);
      return response.status(200).redirect(303, "/list");
    } catch (error) {
      return response.status(500).json("DB 고장남 다시 ㄱㄱ");
    }
  }
}

