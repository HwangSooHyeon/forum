"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error(props: ErrorProps) {
  return (
    <div>
      <h4>에러남 ㅅㄱ</h4>
      <button
        onClick={() => {
          props.reset();
        }}
      >
        리셋
      </button>
    </div>
  );
}
