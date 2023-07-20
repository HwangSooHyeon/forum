import { connectDB } from "@/util/database";
import { Post } from "../model/post";
import ListItem from "./ListItem";

// 강제 다이나믹 렌더링
// export const dynamic = "force-dynamic"
export const revalidate = 20;

export default async function List() {
  const db = (await connectDB).db("forum");
  let posts: Array<Post> = await db.collection("post").find().toArray();
  return (
    <div className="list-bg">
        <ListItem posts={posts}></ListItem>
    </div>
  );
}
