import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  ChevronRight,
  Database,
  FileCode,
  FileSearch,
  GitBranch,
  MessagesSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { DevPilotIcon } from "@/components/icons/devpilot-icon";
import { AuthCta } from "@/components/landing/auth-cta";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Chat with your GitHub codebase",
  description:
    "DevPilot is an AI co-pilot for your GitHub repositories. Ask questions in plain English and get answers grounded in your own code with file and line citations.",
};

const features = [
  {
    icon: MessagesSquare,
    title: "Ask in plain English",
    description:
      "Skip the grep. Ask about architecture, bugs, or how a feature works and get a direct answer.",
  },
  {
    icon: FileSearch,
    title: "Answers with citations",
    description:
      "Every response points back to the exact files and lines it used, so you can verify it instantly.",
  },
  {
    icon: Zap,
    title: "Streamed responses",
    description:
      "Answers stream in token by token over SSE, so you see progress instead of waiting on a spinner.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description:
      "GitHub tokens are encrypted at rest, and answers are generated only from your indexed code.",
  },
];

const steps = [
  {
    icon: GitBranch,
    title: "Sign in with GitHub",
    description:
      "Authenticate with OAuth2. Your access token is encrypted before it is stored.",
  },
  {
    icon: Database,
    title: "Index your repository",
    description:
      "The backend chunks your code, creates embeddings, and stores vectors in pgvector.",
  },
  {
    icon: Bot,
    title: "Ask and get answers",
    description:
      "Relevant chunks are retrieved by similarity and streamed back with file references.",
  },
];

const stack = [
  "Next.js 16",
  "React 19",
  "Tailwind CSS 4",
  "Spring Boot 4",
  "Spring AI",
  "OpenAI",
  "PostgreSQL + pgvector",
  "GitHub OAuth2",
];

const mockRepos = [
  { name: "devpilot", active: true },
  { name: "spring-rag", active: false },
  { name: "next-dashboard", active: false },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground text-pretty sm:text-base">
        {description}
      </p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-x-clip">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-base font-semibold tracking-tight"
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <DevPilotIcon className="size-4" />
            </span>
            DevPilot
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <Link
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              How it works
            </Link>
            <Link
              href="#stack"
              className="transition-colors hover:text-foreground"
            >
              Stack
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <AuthCta size="sm" className="hidden sm:inline-flex" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 75%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_65%)] opacity-[0.12]"
          />

          <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 lg:px-8">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <Badge
                variant="outline"
                className="h-7 gap-1.5 rounded-full bg-background/60 px-3 text-xs backdrop-blur"
              >
                <Sparkles className="text-primary" />
                AI-powered code intelligence
              </Badge>

              <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                Chat with your{" "}
                <span className="text-primary">GitHub codebase</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground text-pretty sm:text-lg">
                Ask questions in plain English and get answers grounded in your
                own code, with file and line references, streamed in real time.
              </p>

              <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <AuthCta size="lg" className="w-full sm:w-auto" />
                <Link
                  href="#how-it-works"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-full gap-2 sm:w-auto",
                  )}
                >
                  See how it works
                  <ChevronRight />
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-primary" />
                  Tokens encrypted at rest
                </span>
                <span className="flex items-center gap-1.5">
                  <FileCode className="size-3.5 text-primary" />
                  File and line citations
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="size-3.5 text-primary" />
                  Streamed over SSE
                </span>
              </div>
            </div>

            <div className="relative mx-auto mt-14 max-w-4xl">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-8 -top-8 -bottom-12 -z-10 rounded-[3rem] bg-primary/15 blur-3xl"
              />

              <Card className="mx-auto gap-0 overflow-hidden rounded-2xl bg-card/80 py-0 shadow-2xl shadow-primary/10 backdrop-blur">
                <div className="flex items-center gap-3 border-b px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-400/70" />
                    <span className="size-2.5 rounded-full bg-amber-400/70" />
                    <span className="size-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="mx-auto flex items-center gap-2 text-xs text-muted-foreground">
                    <DevPilotIcon className="size-3.5 text-primary" />
                    <span className="font-mono">devpilot / chat</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="h-5 gap-1 px-2 text-[10px]"
                  >
                    <span className="size-1.5 rounded-full bg-primary" />
                    Live
                  </Badge>
                </div>

                <div className="grid md:grid-cols-[190px_1fr]">
                  <aside className="hidden border-r p-3 md:block">
                    <p className="px-2 pb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Repositories
                    </p>
                    <div className="flex flex-col gap-1">
                      {mockRepos.map((repo) => (
                        <span
                          key={repo.name}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs",
                            repo.active
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-muted-foreground",
                          )}
                        >
                          <GitBranch className="size-3.5 shrink-0" />
                          <span className="truncate">{repo.name}</span>
                        </span>
                      ))}
                    </div>
                  </aside>

                  <div className="space-y-4 p-4 sm:p-5">
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                        Where is the GitHub access token encrypted before it is
                        saved?
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <Bot className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="rounded-2xl rounded-tl-sm bg-muted/60 px-4 py-3 text-sm leading-6">
                          <p>
                            The token is encrypted in{" "}
                            <code className="rounded bg-background px-1 py-0.5 font-mono text-[11px]">
                              TokenEncryptionService
                            </code>{" "}
                            before it is persisted, and only decrypted when a
                            request is made to GitHub.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            <Badge
                              variant="outline"
                              className="h-6 gap-1 bg-background/60 font-mono text-[10px] font-normal"
                            >
                              <FileCode />
                              TokenEncryptionService.java:24
                            </Badge>
                            <Badge
                              variant="outline"
                              className="h-6 gap-1 bg-background/60 font-mono text-[10px] font-normal"
                            >
                              <FileCode />
                              UserService.java:57
                            </Badge>
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-xl border bg-background/70">
                          <div className="flex items-center justify-between gap-3 border-b px-3 py-2">
                            <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                              <FileCode className="size-3" />
                              TokenEncryptionService.java
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              lines 24–31
                            </span>
                          </div>
                          <pre className="overflow-x-auto p-3 font-mono text-[11px] leading-5 text-muted-foreground">
                            <code>{`public String encrypt(String rawToken) {
  byte[] encrypted = cipher.encrypt(rawToken, key);
  return base64.encode(encrypted);
}`}</code>
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border bg-background/60 px-3 py-2 text-sm text-muted-foreground">
                      <Search className="size-4 shrink-0" />
                      <span className="flex-1 truncate">
                        Ask anything about your code…
                      </span>
                      <span className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                        Enter
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
        >
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to understand a codebase"
            description="DevPilot combines retrieval-augmented generation with your repository, so answers stay accurate and verifiable."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="h-full gap-3 p-5 transition-colors hover:bg-muted/40"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {feature.description}
                  </CardDescription>
                </Card>
              );
            })}
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-y bg-muted/30 py-20 sm:py-24"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="How it works"
              title="From login to answers in three steps"
              description="No local setup and no manual context hunting. Connect GitHub and let the RAG pipeline do the rest."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <Card key={step.title} className="h-full gap-3 p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription className="leading-6">
                      {step.description}
                    </CardDescription>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="stack"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
        >
          <SectionHeading
            eyebrow="Stack"
            title="Built on a modern, production-ready stack"
            description="A typed Next.js frontend talking to a Spring Boot RAG service backed by pgvector and OpenAI."
          />

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {stack.map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="h-8 gap-1.5 rounded-full bg-background/60 px-3 text-xs font-normal"
              >
                <span className="size-1.5 rounded-full bg-primary" />
                {item}
              </Badge>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground shadow-2xl shadow-primary/20 ring-1 ring-primary/30 sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_60%)]"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Your codebase has answers.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-primary-foreground/80 text-pretty sm:text-base">
                Connect GitHub and start asking questions about your
                repositories in under a minute.
              </p>
              <div className="mt-7 flex justify-center">
                <AuthCta
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <DevPilotIcon className="size-3.5" />
            </span>
            <span>DevPilot</span>
          </div>

          <p className="text-xs text-muted-foreground">
            Built with Next.js, Spring Boot, and pgvector.
          </p>

          <nav className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="#features" className="hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-foreground">
              How it works
            </Link>
            <Link href="/login" className="hover:text-foreground">
              Sign in
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
