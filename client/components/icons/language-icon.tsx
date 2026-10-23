import { Code2 } from "lucide-react";
import type { IconType } from "react-icons";
import {
    SiApple,
    SiC,
    SiClojure,
    SiCoffeescript,
    SiCplusplus,
    SiCss,
    SiDart,
    SiDocker,
    SiElixir,
    SiErlang,
    SiFsharp,
    SiGnubash,
    SiGo,
    SiHaskell,
    SiHtml5,
    SiJavascript,
    SiJulia,
    SiJupyter,
    SiKotlin,
    SiLua,
    SiMake,
    SiNixos,
    SiOcaml,
    SiPerl,
    SiPhp,
    SiPython,
    SiR,
    SiRuby,
    SiRust,
    SiScala,
    SiSharp,
    SiSwift,
    SiTypescript,
    SiVim,
    SiZig,
} from "react-icons/si";

import { cn } from "@/lib/utils";

type Language = {
    icon: IconType;
    color: string;
};

const LANGUAGES: Record<string, Language> = {
    c: { icon: SiC, color: "#A8B9CC" },
    "c++": { icon: SiCplusplus, color: "#00599C" },
    "c#": { icon: SiSharp, color: "#512BD4" },
    clojure: { icon: SiClojure, color: "#5881D8" },
    coffeescript: { icon: SiCoffeescript, color: "#2F2625" },
    css: { icon: SiCss, color: "#663399" },
    dart: { icon: SiDart, color: "#0175C2" },
    dockerfile: { icon: SiDocker, color: "#2496ED" },
    elixir: { icon: SiElixir, color: "#4B275F" },
    erlang: { icon: SiErlang, color: "#A90533" },
    "f#": { icon: SiFsharp, color: "#378BBA" },
    go: { icon: SiGo, color: "#00ADD8" },
    haskell: { icon: SiHaskell, color: "#5D4F85" },
    html: { icon: SiHtml5, color: "#E34F26" },
    javascript: { icon: SiJavascript, color: "#F7DF1E" },
    julia: { icon: SiJulia, color: "#9558B2" },
    jupyternotebook: { icon: SiJupyter, color: "#F37626" },
    kotlin: { icon: SiKotlin, color: "#7F52FF" },
    lua: { icon: SiLua, color: "#2C2D72" },
    makefile: { icon: SiMake, color: "#6D00CC" },
    nix: { icon: SiNixos, color: "#5277C3" },
    objectivec: { icon: SiApple, color: "#438EFF" },
    ocaml: { icon: SiOcaml, color: "#EC6813" },
    perl: { icon: SiPerl, color: "#39457E" },
    php: { icon: SiPhp, color: "#777BB4" },
    python: { icon: SiPython, color: "#3776AB" },
    r: { icon: SiR, color: "#276DC3" },
    ruby: { icon: SiRuby, color: "#CC342D" },
    rust: { icon: SiRust, color: "#000000" },
    scala: { icon: SiScala, color: "#DC322F" },
    shell: { icon: SiGnubash, color: "#4EAA25" },
    swift: { icon: SiSwift, color: "#F05138" },
    typescript: { icon: SiTypescript, color: "#3178C6" },
    vimscript: { icon: SiVim, color: "#019733" },
    zig: { icon: SiZig, color: "#F7A41D" },
};

function normalize(language: string) {
    return language.trim().toLowerCase().replace(/[^a-z0-9+#]/g, "");
}

export type LanguageIconProps = {
    language?: string | null;
    className?: string;
};

export function LanguageIcon({ language, className }: LanguageIconProps) {
    const definition = language ? LANGUAGES[normalize(language)] : undefined;
    const Icon = definition?.icon ?? Code2;

    return (
        <Icon
            aria-hidden="true"
            focusable="false"
            className={cn("size-4 shrink-0", className)}
            style={definition ? { color: definition.color } : undefined}
        />
    );
}
