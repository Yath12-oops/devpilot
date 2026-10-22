"use client";
import React from 'react';
import {useRouter,useSearchParams} from 'next/navigation';
import { Suspense,useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

import {GitHubIcon} from "@components/icons/github-icon";
import {BrandMark} from "@components/layout/app-shell";
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Alert,AlertDescription,AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';

import{Card,CardContent,CardDescription,CardHeader,CardTitle} from "@/components/ui/card";
import { Spinner } from '@/components/ui/spinner';
import { cn } from "@/lib/utils";

function LoginLoading(){
    return (
        <div className="flex min-h-svh items-center justify-center">
            <Spinner className="size-8"/>
        </div>
    )
}
const LoginContent = () =>{
    const params=useSearchParams();
    const router=useRouter();
    const error=params.get("error");
    const next =params.get("next") || "/dashboard";

    const user=null;
    const isLoading=false;

    function getGithubLoginUrl() {
        const base = process.env.NEXT_PUBLIC_API_URL ?? "";
        return `${base}/oauth2/authorization/github?redirect=${encodeURIComponent(next)}`;
    }

    useEffect(() => {
        if (user) {
            router.replace(next);
        }
    }, [user, router, next]);

    if(isLoading){
        return <LoginLoading/>
    }

    return (
        <div className="relative flex min-h-svh flex-col">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_60%)] opacity-[0.08]"
            />

            <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-8">
                <BrandMark className="text-lg" />
                <ModeToggle />
            </header>

            <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-10">
                <Card className="w-full max-w-sm">
                    <CardHeader className="text-center">
                        <CardTitle>Sign in</CardTitle>
                        <CardDescription className="leading-6">
                            Connect GitHub to chat with your repositories.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4">
                        {error ? (
                            <Alert variant="destructive">
                                <AlertCircle />
                                <AlertTitle>Couldn&apos;t sign you in</AlertTitle>
                                <AlertDescription>
                                    {error === "access_denied"
                                        ? "You cancelled the authorization request. Try again when you're ready."
                                        : "Something went wrong during sign in. Please try again."}
                                </AlertDescription>
                            </Alert>
                        ) : null}

                        <a
                            href={getGithubLoginUrl()}
                            className={cn(
                                buttonVariants({ size: "lg" }),
                                "w-full",
                            )}
                        >
                            <GitHubIcon className="size-4" />
                            Continue with GitHub
                        </a>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default function LoginPage(){
return (
    <Suspense fallback={<LoginLoading/>}>
    <LoginContent/>
    </Suspense>
  );
}