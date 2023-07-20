import { NextApiRequest, NextApiResponse } from "next";
import { CommentModel } from "@/app/model/comment";
import { connectDB } from "@/util/database";
import { authOptions } from "../auth/[...nextauth]";
import { DefaultSession, getServerSession } from "next-auth";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let session: DefaultSession | null = await getServerSession(
    request,
    response,
    authOptions
  );
  if (session === null) {
    return response.status(500).json("로그인 하시오");
  }
  if (request.method == "POST") {
    let requestBody: CommentModel = JSON.parse(request.body);
    if (requestBody.content === "") {
      return response.status(500).json("내용 없어");
    }
    requestBody.author = session.user?.email!;
    requestBody.authorName = session.user?.name!;
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("comment").insertOne(requestBody);
      let comments = await db
        .collection("comment")
        .find({ parent: requestBody.parent })
        .toArray();
      return response.status(200).json({ data: comments });
    } catch (error) {
      return response.status(500).json("DB 고장");
    }
  }
}
