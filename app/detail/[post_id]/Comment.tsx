"use client";

import { CommentModel } from "@/app/model/comment";
import { useEffect, useState } from "react";

interface CommentProps {
  author: string;
  parent: string;
}

export default function Comment(props: CommentProps) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/comment/list/${props.parent}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
      });
  }, []);

  return (
    <div>
      <hr />
      <div>
        {data.length > 0 ? (
          data.map((comment: CommentModel, index: number) => {
            return (
              <div key={index}>
                <p>{comment.content}</p>
                <p>작성자: {comment.authorName}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <p>댓글 없음</p>
        )}
      </div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/add", {
            method: "POST",
            body: JSON.stringify({
              content: comment,
              parent: props.parent,
            }),
          })
            .then((response) => response.json())
            .then((json) => setData(json.data));
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
