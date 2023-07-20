// 현재 페이지를 방문했을 때
// 60초 동안 캐싱된 결과를 사용함
export const revalidate = 60;

export default async function Home() {
  // page cache
  // 두 번째 파라미터가 없어도 됨
  // await fetch("/URL", { cache: "force-cache" });
  // 캐싱 안함
  // await fetch("/URL", { cache: "no-store" });
  // 60초 마다 갱신
  // await fetch("/URL", { next: { revalidate: 60 } });
  return <div>안녕</div>;
}
