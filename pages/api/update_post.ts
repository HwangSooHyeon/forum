import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    if (request.body.title == "") {
      return response.status(500).json("너 제목 왜 안씀?");
    }
    try {
      const db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(request.body._id) },
          { $set: { title: request.body.title, content: request.body.content } }
        );
      return response.status(200).redirect(303, "/detail/" + request.body._id);
    } catch (error) {
      return response.status(500).json({ message: "DB 고장남", error: error });
    }
  }
}
