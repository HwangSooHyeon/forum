import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    if (request.query.id == null) {
      console.log("글 아이디 어디감?");
      return response.status(200).redirect(303, "/list");
    }
    try {
      const db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(request.query.id.toString()) });
      if (result.deletedCount < 1) {
        return response.status(500).json("삭제 실패");
      }
      return response.status(200).json("삭제 성공");
    } catch (error) {
      return response.status(500).json("DB 고장남 다시 ㄱㄱ");
    }
  }
}
