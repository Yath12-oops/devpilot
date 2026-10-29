

"use client";


import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-auth";

import { Spinner} from "@/components/ui/spinner";

export function RequireAuth( {children} :{children: React.ReactNode}){

    const {data:user,isLoading,isError}=useCurrentUser();
    const router =useRouter();

    useEffect(()=>{
        if(!isLoading && (isError || !user)){
            router.replace("/login");
        }
    }, [isLoading,isError,user,router]);

    if(isLoading){
        return (
            <div className="flex min-h-svh flex-col items-center justify-center gap-3">
                <Spinner className="size-8" />
                <p className="text-sm text-muted-foreground">
                    Loading your workspace
                </p>
            </div>
        );
    }
    if(isError || !user) return null;

    return <>{children}</>
}