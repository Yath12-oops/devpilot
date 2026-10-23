import type { SVGProps } from "react";

export function DevPilotIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path d="M4 19 20 12 4 5l3 7-3 7Z" />
            <path d="M7 12h13" />
        </svg>
    );
}
