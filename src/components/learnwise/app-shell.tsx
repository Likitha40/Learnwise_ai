import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity, Bell, BookOpen, CalendarCheck2, ChevronDown, CircleHelp, GraduationCap,
  LayoutDashboard, Menu, NotebookPen, X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "My Learning", to: "/learning", icon: BookOpen },
  { label: "Study Plan", to: "/study-plan", icon: CalendarCheck2 },
  { label: "Practice Quiz", to: "/quiz", icon: NotebookPen },
  { label: "Progress & Insights", to: "/insights", icon: Activity },
  { label: "About the Project", to: "/about", icon: CircleHelp },
] as const;

function NavigationLinks({ close }: { close?: () => void }) {
  const pathname = useRouterState({ select: (router) => router.location.pathname });
  return (
    <nav aria-label="Main navigation" className="space-y-1">
      {navigation.map(({ label, to, icon: Icon }) => {
        const active = to === "/learning" ? pathname.startsWith("/learning") : pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={close}
            className={`flex min-h-10 items-center gap-3 rounded-sm px-3 text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="size-[18px] shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <Link to="/" className="flex h-[72px] items-center gap-3 border-b border-border px-6">
          <span className="flex size-9 items-center justify-center rounded-sm bg-primary text-primary-foreground"><GraduationCap className="size-5" /></span>
          <span><span className="block font-display text-base font-extrabold leading-tight">LearnWise<span className="text-primary"> AI</span></span><span className="text-[10px] text-muted-foreground">Student learning studio</span></span>
        </Link>
        <div className="px-4 pt-6"><p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Workspace</p><NavigationLinks /></div>
        <div className="mt-auto border-t border-border p-4">
          <div className="rounded-sm bg-muted/70 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold"><span className="size-2 rounded-full bg-demo" /> Prototype workspace</div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Exploring clear, topic-based learning guidance.</p>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-sm px-1 py-2">
            <Avatar className="size-9"><AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">AR</AvatarFallback></Avatar>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Ananya Rao</p><p className="text-xs text-muted-foreground">Demo student</p></div>
            <ChevronDown className="size-4 text-muted-foreground" />
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-[72px] items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" aria-label={menuOpen ? "Close navigation" : "Open navigation"} className="lg:hidden" onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X /> : <Menu />}
            </Button>
            <div className="flex items-center gap-2 lg:hidden"><GraduationCap className="size-5 text-primary" /><span className="font-display text-sm font-extrabold">LearnWise AI</span></div>
            <p className="hidden text-sm text-muted-foreground lg:block">Your learning, made clearer.</p>
          </div>
          <div className="relative flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}><Bell className="size-[18px]" /></Button>
            {notificationsOpen && <div role="status" className="absolute right-10 top-12 z-30 w-64 rounded-sm border border-border bg-card p-4 text-sm shadow-lg"><p className="font-semibold">You’re all caught up</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Your next suggested session is DBMS normalization practice.</p></div>}
            <span className="hidden h-8 w-px bg-border sm:block" />
            <div className="flex items-center gap-2.5"><Avatar className="size-8"><AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">AR</AvatarFallback></Avatar><span className="hidden text-sm font-semibold sm:block">Ananya Rao</span></div>
          </div>
        </header>
        {menuOpen && <div className="fixed inset-x-0 top-[72px] z-30 border-b border-border bg-card p-4 shadow-md lg:hidden"><NavigationLinks close={() => setMenuOpen(false)} /></div>}
        <main className="mx-auto min-h-[calc(100vh-72px)] max-w-[1440px] px-4 py-7 sm:px-7 sm:py-9 lg:px-10">{children}</main>
        <footer className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground sm:px-7 lg:px-10">LearnWise AI · Early-stage research prototype · All student data shown is illustrative</footer>
      </div>
    </div>
  );
}