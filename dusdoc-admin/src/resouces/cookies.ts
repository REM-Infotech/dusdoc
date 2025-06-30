import type { TCookieAttributes, TCookiesDusDoc } from "@/types/cookies";
import Cookies from "js-cookie";

export default class CookiesDusDoc implements TCookiesDusDoc {
  defaultOptions?: TCookieAttributes["defaultOptions"];

  insertKey(
    key: string,
    value: string,
    options: TCookieAttributes["defaultOptions"] = {
      sameSite: "Strict",
      secure: true,
    },
  ) {
    Cookies.set(key, value, options);
  }
}
