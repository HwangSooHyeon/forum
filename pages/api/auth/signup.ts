import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { UserCred } from "@/app/model/user_cred";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    request.body.isAdmin = false;
    let userCred: UserCred = request.body;
    console.log(userCred);
    if (
      userCred.email === "" ||
      userCred.name === "" ||
      userCred.password === ""
    ) {
      return response.status(500).json("빈칸 없이 쓰셈");
    }
    let db = (await connectDB).db("forum");
    let checkEmailDistinct: UserCred = await db
      .collection("user_cred")
      .findOne({ email: userCred.email });
    if (checkEmailDistinct) {
      console.log(checkEmailDistinct.email);
      return response.status(500).json("이메일 중복임");
    }
    let hash: string = await bcrypt.hash(userCred.password, 10);
    userCred.password = hash;
    await db.collection("user_cred").insertOne(userCred);
    return response.status(200).json("가입성공");
  }
}
