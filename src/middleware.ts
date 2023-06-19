import { NextRequest, NextResponse } from "next/server";
import { GetUserByTokenResponse } from "./interfaces/server/GetUserByTokenResponse";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  // 1. Check if token exists
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return false;
  }

  // 2. Check if token is valid
  try {
    const userByTokenResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/me`,
      { headers: { Cookie: `token=${token}` } }
    );
    const data: GetUserByTokenResponse = await userByTokenResponse.json();
    if (data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

function isAuthPage(req: NextRequest): boolean {
  const result = ["/signin", "/signup"].some((page) =>
    req.nextUrl.pathname.startsWith(page)
  );
  return result;
}

export default async function middleware(req: NextRequest) {
  const authenticated = await isAuthenticated(req);
  if (isAuthPage(req) && authenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isAuthPage(req) && !authenticated) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}
