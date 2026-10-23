import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { adminConfigured, isAdmin } from "@/lib/auth";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <>
      <p className="font-pixel text-sm text-muted-foreground">~/admin</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Sign in</h1>
      {adminConfigured() ? (
        <LoginForm />
      ) : (
        <p className="mt-6 max-w-prose text-muted-foreground">
          Admin is turned off. Set the <code className="font-mono text-foreground">ADMIN_PASSWORD</code>{" "}
          environment variable and redeploy to enable it.
        </p>
      )}
    </>
  );
}
