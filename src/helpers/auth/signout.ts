import "client-only";
import Cookies from "js-cookie";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export default function signout(router: AppRouterInstance) {
  Cookies.remove("token");
  router.push("/signin");
}
