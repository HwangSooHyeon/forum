"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DarkMode() {
  let router = useRouter();
  let value: string | undefined = "";
  useEffect(() => {
    value = ("; " + document.cookie).split(`; mode=`).pop()?.split(";")[0];
    if (value === "") {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
    }
  });
  return (
    <span
      onClick={() => {
        let value = ("; " + document.cookie)
          .split(`; mode=`)
          .pop()
          ?.split(";")[0];
        if (value === "dark") {
          document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
        }
        if (value === "light") {
          document.cookie = "mode=dark; max-age=" + 3600 * 24 * 400;
        }
        router.refresh();
      }}
    >
      {value === "light" ? "🌙" : "🌞"}
    </span>
  );
}
