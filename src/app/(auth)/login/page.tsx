
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Aperture, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries())as{email: string, password: string};

    console.log(userData);
const {data,error} = await authClient.signIn.email({
  ...userData,
  rememberMe: true,
});
  if (data) {
    toast.add({
            type: "success",
            description: "Login successful.",
          })
  }
  if (error) {
    toast.add({
            type: "warning",
            description: "login failed. Please try again.",
          })
  return;
}

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    // Only allow internal paths.
    const safeRedirect = callbackUrl.startsWith("/") &&
      !callbackUrl.startsWith("//")
      ? callbackUrl
      : "/";

    router.push(safeRedirect);
  };
  const GooglesignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 ring-1 ring-border sm:p-8">

        {/* Brand + Heading */}
        <div className="flex flex-col items-center text-center">
          <span className="flex size-11 items-center justify-center rounded-xl bg-[#6D4AFF]">
            <Aperture className="size-6 text-white" />
          </span>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Login to your StudioSpace account and continue creating.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-10"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

              <Link
                href="/forgot-password"
                className="text-xs font-medium text-brand-text hover:text-brand-text-hover"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-10 pr-10"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            className="h-10 w-full bg-[#6D4AFF] text-white hover:bg-[#5A3BD9]"
          >
            Login
          </Button>
        </form>

        {/* Social Divider */}
        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-border" />

          <span className="text-xs text-muted-foreground">
            or continue with
          </span>

          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Google Login */}
        <Button
          type="button"
          onClick={GooglesignIn}
          variant="outline"
          className="h-10 w-full gap-2"
        >
          <FcGoogle className="size-5" />
          Continue with Google
        </Button>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-brand-text hover:text-brand-text-hover"
          >
            Register
          </Link>
        </p>

      </div>
    </main>
  );
}
