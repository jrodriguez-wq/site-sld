import { redirect } from "next/navigation";

/**
 * Any non-existent route redirects to the home page.
 */
export default function NotFound() {
  redirect("/");
}
