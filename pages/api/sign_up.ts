import { NextApiRequest, NextApiResponse } from "next";
import { closeDB, connectDB } from "@/util/database";
import { User } from "@/app/model/user";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    console.log(request.body);
    if (request.body.username == "") {
      return response.json("너 아이디 왜 안씀?");
    }
    if (request.body.password == "") {
      return response.json("너 비밀번호 왜 안씀?");
    }
    try {
      const db = (await connectDB).db("forum");
      let isUnique: User = await db
        .collection("user")
        .findOne({ email: request.body.email });
      if (isUnique != null) {
        await closeDB;
        return response.status(500).json("아이디 중복임 다시 쓰셈");
      }
      let result = await db.collection("user").insertOne(request.body);
      await closeDB;
      return response.status(200).json({"message": "회원가입 성공!!!", "result": result});
    } catch (error) {
      await closeDB;
      return response.status(500).json({"message": "DB 고장남", "error": error});
    }
  }
}
