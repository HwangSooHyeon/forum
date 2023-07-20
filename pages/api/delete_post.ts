import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { DefaultSession, getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { UserCred } from "@/app/model/user_cred";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    let requestBody = JSON.parse(request.body);
    if (requestBody == null) {
      console.log("글 아이디 어디감?");
      return response.status(200).redirect(303, "/list");
    }
    let session: DefaultSession | null = await getServerSession(
      request,
      response,
      authOptions
    );
    if (session === null) {
      return response.status(500).json("유저 정보 없음");
    }
    try {
      const db = (await connectDB).db("forum");
      let userCred: UserCred = await db
        .collection("user_cred")
        .findOne({ email: session.user?.email });
      console.log(userCred.isAdmin);
      if (
        session.user?.email === requestBody.author ||
        userCred.isAdmin === true
      ) {
        let result = await db
          .collection("post")
          .deleteOne({ _id: new ObjectId(requestBody._id) });
        if (result.deletedCount < 1) {
          return response.status(500).json("삭제 실패");
        }
        return response.status(200).json("삭제 성공");
      }
      return response.status(500).json("니 글 아님");
    } catch (error) {
      return response.status(500).json("DB 고장남 다시 ㄱㄱ");
    }
  }
}
