import { Post } from "@/app/model/post";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

interface PostIdPath {
  post_id: string;
}

interface UpdateProps {
  params: PostIdPath;
  searchParams: any;
}

export default async function Update(props: UpdateProps) {
  const db = (await connectDB).db("forum");
  let result: Post = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.post_id) });
  return (
    <div className="p-20">
      <h4 className="title">글수정</h4>
      <form action="/api/update_post" method="POST">
        <input type="hidden" name="_id" value={props.params.post_id} readOnly/>
        <h5>제목</h5>
        <input type="text" name="title" placeholder="글제목" defaultValue={result.title}/>
        <h5>내용</h5>
        <textarea name="content" cols={30} rows={10} placeholder="글내용" defaultValue={result.content}/>
        <br />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
