import { redirect } from "next/navigation";

/**
 * 🔁 SEO 301 Redirect
 * Old regional URL → New global URL
 */
export default function OldPostRedirect() {
  redirect("/post/ai-is-changing-global");
}
