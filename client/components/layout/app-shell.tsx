import { DevPilotIcon } from "@/components/icons/devpilot-icon";

import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <DevPilotIcon className="size-4" />
      </span>
      DevPilot
    </span>
  );
}
