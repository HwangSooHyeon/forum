import { Post } from "@/app/model/post";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";
import Comment from "./Comment";
import { notFound } from "next/navigation";

interface PostId {
  post_id: string;
}

interface DetailProps {
  params: PostId;
  searchParams: Object;
}

export default async function Detail(props: DetailProps) {
  const db = (await connectDB).db("forum");
  let result: Post = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.post_id) });

  if (result === null) {
    return notFound();
  }
  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <Link href={`/detail/${props.params.post_id}/update`}>✏️</Link>
      <Comment author={result.author} parent={props.params.post_id}></Comment>
    </div>
  );
}

export type { PostId };
