export default function SignUp() {
  return (
    <div className="p-20">
      <h4 className="title">회원가입</h4>
      <form action="/api/sign_up" method="POST">
        <h5>아이디</h5>
        <input type="text" name="username" placeholder="아이디" />
        <h5>비밀번호</h5>
        <input type="text" name="password" placeholder="비밀번호" />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
