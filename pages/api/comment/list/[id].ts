import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "GET") {
    if (request.query.id == null) {
      console.log("글 아이디 어디감?");
      return response.status(200).redirect(303, "/list");
    }
    try {
      const db = (await connectDB).db("forum");
      let result = await db
        .collection("comment")
        .find({ parent: request.query.id.toString() })
        .toArray();
      return response.status(200).json({data: result});
    } catch (error) {
      return response.status(500).json("DB 고장남 다시 ㄱㄱ");
    }
  }
}
