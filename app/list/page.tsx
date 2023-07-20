import { connectDB } from "@/util/database";
import { Post } from "../model/post";
import ListItem from "./ListItem";

export const dynamic = "force-dynamic"

export default async function List() {
  const db = (await connectDB).db("forum");
  let posts: Array<Post> = await db.collection("post").find().toArray();
  return (
    <div className="list-bg">
        <ListItem posts={posts}></ListItem>
    </div>
  );
}
