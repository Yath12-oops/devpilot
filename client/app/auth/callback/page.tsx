
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

import { useCurrentUser } from "@/hooks/use-auth";

export default function AuthCallbackPage() {
    const router = useRouter();
    const { data: user, isError, isFetched } = useCurrentUser();

    useEffect(() => {
        if (!isFetched) return;

        router.replace(
            user && !isError ? "/dashboard" : "/login?error=oauth_failed",
        );
    }, [isError, isFetched, router, user]);

    return (
        <div className="flex min-h-svh items-center justify-center">
            <Spinner className="size-8" />
        </div>
    );
}