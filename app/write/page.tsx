import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { DefaultSession, getServerSession } from "next-auth";

export default async function Write() {
  let session: DefaultSession | null = await getServerSession(authOptions);
  if (session === null) {
    return <div>로그인하세요</div>;
  }
  return (
    <div className="p-20">
      <h4 className="title">글작성</h4>
      <form action="/api/add_post" method="POST">
        <h5>제목</h5>
        <input type="text" name="title" placeholder="글제목" />
        <h5>내용</h5>
        <textarea name="content" cols={30} rows={10} placeholder="글내용" />
        <br />
        <button type="submit">작성</button>
      </form>
    </div>
  );
}
