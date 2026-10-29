"use client";

import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { ArrowRight, LayoutDashboard } from "lucide-react";

import { GitHubIcon } from "@/components/icons/github-icon";
import { buttonVariants } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-auth";
import { getGithubLoginUrl } from "@/lib/api";
import { cn } from "@/lib/utils";

type AuthCtaProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

export function AuthCta({ size, variant, className }: AuthCtaProps) {
  const { data: user } = useCurrentUser();

  const classes = cn(
    buttonVariants({ size, variant }),
    "group gap-2",
    className,
  );

  if (user) {
    return (
      <Link href="/dashboard" className={classes}>
        <LayoutDashboard />
        Open dashboard
        <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    );
  }

  return (
    <a href={getGithubLoginUrl()} className={classes}>
      <GitHubIcon />
      Continue with GitHub
      <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}
