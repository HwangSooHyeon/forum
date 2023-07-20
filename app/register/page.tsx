export default function Register() {
  return (
    <div>
      <form action="api/auth/signup" method="POST">
        <input type="text" name="name" placeholder="이름" />
        <input type="text" name="email" placeholder="이메일" />
        <input type="password" name="password" placeholder="비번" />
        <input type="hidden" name="isAdmin" value={"false"} readOnly />
        <button type="submit">id/pw 가입요청</button>
      </form>
    </div>
  );
}
