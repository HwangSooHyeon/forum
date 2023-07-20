"use client";

import Link from "next/link";
import { Post } from "../model/post";

interface Posts {
  posts: Array<Post>;
}

export default function ListItem(props: Posts) {
  return props.posts.map((post: Post, index: number) => (
    <div className="list-item" key={index}>
      <Link prefetch={false} href={`/detail/${post._id.toString()}`}>
        {post.title}
      </Link>
      <p>{post.content}</p>
      <span
        onClick={(e) => {
          console.log(e.target);
          const span = e.target as HTMLSpanElement;
            fetch("/api/delete_post", {
              method: "POST",
              body: JSON.stringify({ _id: post._id.toString(), author: post.author}),
            })
              .then((r) => r.json())
              .then(() => {
                if (span.parentElement != null) {
                  span.parentElement.style.opacity = "0";
                  setTimeout(() => {
                    if (span.parentElement != null) {
                      span.parentElement.style.display = "none";
                    }
                  }, 1000);
                }
              });
          // fetch("/api/test?name=hwang&age=20");

          // fetch(`/api/post/delete/${post._id.toString()}`, {
          //   method: "POST",
          // })
          //   .then((r) => r.json())
          //   .then(() => {
          //     if (span.parentElement !== null) {
          //       span.parentElement.style.opacity = "0";
          //       setTimeout(() => {
          //         if (span.parentElement !== null) {
          //           span.parentElement.style.display = "none";
          //         }
          //       }, 1000);
          //     }
          //   });
          // end
        }}
      >
        🗑️
      </span>
    </div>
  ));
}
