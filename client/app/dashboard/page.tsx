"use client";

import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUser, useLogout } from "@/hooks/use-auth";

const DashboardPage = () => {
    const { data: user } = useCurrentUser();
    const logout = useLogout();
    const name = user?.displayName ?? user?.githubUsername ?? "User";

    return (
        <div className="p-6">
            <Button
                variant="outline"
                className="h-auto gap-2 py-1.5 pr-3 pl-1.5"
                title={
                    user
                        ? `User ID: ${user.id} · GitHub ID: ${user.githubId}`
                        : undefined
                }
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
            >
                <Avatar size="sm">
                    {user?.avatarUrl ? (
                        <AvatarImage src={user.avatarUrl} alt={name} />
                    ) : null}
                    <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="flex flex-col items-start leading-tight">
                    <span>{name}</span>
                    {user ? (
                        <span className="text-xs font-normal text-muted-foreground">
                            @{user.githubUsername}
                        </span>
                    ) : null}
                </span>
                <LogOut className="size-4" />
                <span className="sr-only">Log out</span>
            </Button>
        </div>
    );
};

export default DashboardPage;
