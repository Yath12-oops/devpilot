"use client";
import React from 'react';
import Link from 'next/link';
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

    if(isLoading || !user){
        return <LoginLoading/>
    }

    return (
        <div>LoginPage</div>
    )
}

export default function LoginPage(){
return (
    <Suspense fallback={<LoginLoading/>}>
    <LoginContent/>
    </Suspense>
  );
}