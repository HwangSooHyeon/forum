"use client";

import { signIn, signOut } from "next-auth/react";

interface LogoutBtnProps {
  userName: string;
}

export default function LogoutBtn(props: LogoutBtnProps) {
  return (
    <div>
      <span>Welcome, {props.userName} </span>
      <button
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
