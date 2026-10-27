

"use client";


import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-auth";

import { Spinner} from "@/components/ui/spinner";

export function RequireAuth( {children} :{children: React.ReactNode}){

    const {data:user,isLoading,isError}=useCurrentUser();
    const router =useRouter();

    useEffect(()=>{
        if(!isLoading && !user){
            router.replace("/login");
        }
    }, [isLoading,user,router]);

    if(isLoading){

            return (
        <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600">
            <Spinner className="size-6"/>
            <p className="text-sm">Loading your workspace</p>
           </div>
         </div>
        );
    }
    if(isError || !user) return null;

    return <>{children}</>
}