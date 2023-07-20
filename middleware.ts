import { JWT, getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session: JWT | null = await getToken({ req: request });
  console.log(session);

  if (request.nextUrl.pathname.startsWith("/register")) {
    if (request.cookies.has("visited")) {
      return NextResponse.next();
    }
    const response = NextResponse.next();
    response.cookies.set({
      name: "visited",
      value: "true",
      maxAge: 3600 * 24 * 400,
      httpOnly: true,
    });
    return response;
  }

  if (request.nextUrl.pathname.startsWith("/write")) {
    if (session === null) {
      return NextResponse.redirect(
        new NextURL("http://localhost:3000/api/auth/signin")
      );
    }
  }

  if (request.nextUrl.pathname.startsWith("/list")) {
    console.log(new Date());
    console.log(request.headers.get("sec-ch-ua-platform"));
    return NextResponse.next();
  }
}
