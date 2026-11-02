"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect,  } from "next/navigation";
import {
  Aperture,
  Check,
  Circle,
  Eye,
  EyeOff,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

export default function RegisterForm() {
  

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Password validation
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinimumLength = password.length >= 6;

  const isPasswordValid =
    hasUppercase && hasLowercase && hasMinimumLength;

  const handleRegister = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

    if (!isPasswordValid) {
      setError("Please fulfill all password requirements.");
      return;
    }

    setError("");

    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData.entries()) as{name:string,email:string,password:string,image:string};
    

    console.log(userData);

     const { data, error } = await authClient.signUp.email({
    ...userData
});
         if(data){
          toast.add({
            type: "success",
            description: "Registration successful. Please log in.",
          })
            redirect("/login")
        }
        if(error){
            toast.add({
            type: "warning",
            description: "Registration failed. Please try again.",
          })
        }
  
  };
     const GooglesignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};
const GithubsignIn = async () => {
    const data = await authClient.signIn.social({
        provider: "github"
    })
}
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 ring-1 ring-border sm:p-8">

        {/* Brand + Heading */}
        <div className="flex flex-col items-center text-center">
          <span className="flex size-11 items-center justify-center rounded-xl bg-[#6D4AFF]">
            <Aperture className="size-6 text-white" />
          </span>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Join StudioSpace to book studios in minutes or host your own space
            for creators.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className="h-10"
              required
            />
          </div>

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

          {/* Photo URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Photo URL</Label>
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="h-10"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-10 pr-10"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
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

            {/* Password Requirements */}
            <ul className="space-y-2 pt-2">
              <li className="flex items-center gap-2 text-xs">
                {hasUppercase ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Circle className="size-3.5 text-muted-foreground" />
                )}
                <span className={hasUppercase ? "text-green-600" : "text-muted-foreground"}>
                  At least one uppercase letter
                </span>
              </li>

              <li className="flex items-center gap-2 text-xs">
                {hasLowercase ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Circle className="size-3.5 text-muted-foreground" />
                )}
                <span className={hasLowercase ? "text-green-600" : "text-muted-foreground"}>
                  At least one lowercase letter
                </span>
              </li>

              <li className="flex items-center gap-2 text-xs">
                {hasMinimumLength ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Circle className="size-3.5 text-muted-foreground" />
                )}
                <span className={hasMinimumLength ? "text-green-600" : "text-muted-foreground"}>
                  Minimum 6 characters
                </span>
              </li>
            </ul>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Register Button */}
          <Button
            type="submit"
            className="h-10 w-full bg-[#6D4AFF] text-white hover:bg-[#5A3BD9]"
          >
            Register
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

        {/* Social Registration */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            type="button"
            onClick={GooglesignIn}
            variant="outline"
            className="h-10 gap-2"
          >
            <FcGoogle className="size-5" />
            Google
          </Button>

          <Button
          onClick={GithubsignIn }
            type="button"
            variant="outline"
            className="h-10 gap-2"
          >
            <FaGithub className="size-5" />
            GitHub
          </Button>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-brand-text hover:text-brand-text-hover"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}