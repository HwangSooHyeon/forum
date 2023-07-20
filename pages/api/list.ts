import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method == "GET") {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").find().toArray();
    return response.status(200).json(result);
  }
}
