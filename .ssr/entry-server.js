import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StaticRouter } from "react-router-dom/server.mjs";
import * as React from "react";
import { useState, useEffect, forwardRef, useRef, Fragment as Fragment$1 } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, Menu, Database, Clock3, FileText, UserCheck, ChevronLeft, ChevronRight, Waypoints, FileCheck2, Archive, Eye, ShieldCheck, CheckCircle2, UserX, Quote, UserRound, MapPin, GitBranch, Route, BadgeCheck, ArrowRight, Gauge, Shield, Globe, Lock, Puzzle, Rocket, Calendar, Search, ChevronDown, BriefcaseBusiness, Users, ClipboardCheck, MessageCircleQuestion, FolderOpen, TimerOff, UploadCloud, Scale, LockKeyhole, Mail, ArrowLeft, Boxes, ScanSearch, MessageSquareShare, Milestone, FileSearch, TimerReset, Landmark, Warehouse, FileBox, ScanText, Files } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useLocation, Link, useParams, Routes, Route as Route$1, matchPath } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import { motion, useReducedMotion, useMotionValue, useTransform, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import * as LabelPrimitive from "@radix-ui/react-label";
import { createClient } from "@supabase/supabase-js";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
function AppShell({ children }) {
  return /* @__PURE__ */ jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsx(Toaster$1, {}),
    /* @__PURE__ */ jsx(Toaster, {}),
    children
  ] });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-mono ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#5E6AD2] text-white h-[44px] px-6 hover:bg-[#5E6AD2]/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-white/08 bg-transparent text-white hover:bg-white/5",
        secondary: "bg-[#0F1011] text-white border border-white/08 hover:bg-white/5",
        ghost: "text-white/50 hover:text-white",
        link: "text-[#5E6AD2] underline-offset-4 hover:underline",
        accent: "bg-[#5E6AD2] text-white hover:bg-[#5E6AD2]/90",
        "accent-outline": "border-2 border-[#5E6AD2] text-[#5E6AD2] bg-transparent hover:bg-[#5E6AD2] hover:text-white",
        hero: "bg-[#5E6AD2] text-white hover:bg-[#5E6AD2]/90 hover:scale-[1.02] active:scale-[0.98] text-base px-8 py-6 h-14 shadow-lg shadow-[#5E6AD2]/0 hover:shadow-[#5E6AD2]/20",
        "hero-secondary": "border border-white/08 text-white bg-transparent hover:bg-white/5 text-base px-8 py-6 h-14",
        nav: "hover:bg-transparent"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const logoImage = "/assets/indataflow-logo-DWwf7N9f.png";
const navigation = [
  { name: "Product", href: "/product/" },
  { name: "Pricing", href: "/pricing/" },
  { name: "Case Study", href: "/case-study/" }
];
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxs("header", { className: isScrolled || mobileMenuOpen ? "fixed top-0 left-0 right-0 z-50 border-b bg-[#010102]/95 border-white/[0.08] backdrop-blur-[12px] transition-[background-color,border-color] duration-200" : "fixed top-0 left-0 right-0 z-50 border-b bg-[#010102]/40 border-transparent backdrop-blur-[8px] transition-[background-color,border-color] duration-200", children: [
    /* @__PURE__ */ jsxs("nav", { className: "container-wide flex items-center justify-between h-16 lg:h-20", "aria-label": "Primary navigation", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center", children: /* @__PURE__ */ jsx("img", { src: logoImage, alt: "InDataFlow", className: "h-16 w-auto brightness-0 invert" }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center gap-1", children: navigation.map((item) => /* @__PURE__ */ jsx(
        Link,
        {
          to: item.href,
          className: "px-4 py-2 text-sm font-medium transition-colors text-white/50 hover:text-white",
          children: item.name
        },
        item.name
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Log in" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/contact/", children: "Book a walkthrough" }) })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "lg:hidden p-3 -mr-1 text-white/50 hover:text-white transition-colors duration-200",
          onClick: () => setMobileMenuOpen(!mobileMenuOpen),
          "aria-expanded": mobileMenuOpen,
          "aria-controls": "mobile-navigation",
          "aria-label": mobileMenuOpen ? "Close navigation menu" : "Open navigation menu",
          children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
        }
      )
    ] }),
    mobileMenuOpen && /* @__PURE__ */ jsx("div", { id: "mobile-navigation", className: "lg:hidden bg-[#010102] border-t border-white/[0.08] animate-fade-in max-h-[calc(100svh-4rem)] overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "container-wide py-4 space-y-2", children: [
      navigation.map((item) => /* @__PURE__ */ jsx(
        Link,
        {
          to: item.href,
          className: "block py-3 text-white/50 hover:text-white transition-colors",
          onClick: () => setMobileMenuOpen(false),
          children: item.name
        },
        item.name
      )),
      /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "w-full", children: /* @__PURE__ */ jsx(Link, { to: "/login", onClick: () => setMobileMenuOpen(false), children: "Log in" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full", children: /* @__PURE__ */ jsx(Link, { to: "/contact/", onClick: () => setMobileMenuOpen(false), children: "Book a walkthrough" }) })
      ] })
    ] }) })
  ] });
}
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "bg-[#010102] border-t border-white/[0.06]", children: /* @__PURE__ */ jsxs("div", { className: "container-wide py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-flex items-center mb-4", children: /* @__PURE__ */ jsx("img", { src: logoImage, alt: "InDataFlow", className: "h-12 w-auto brightness-0 invert" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-white/60 leading-[1.75] max-w-md mb-4", children: "InDataFlow is a cargo operations platform that connects shipment documents, validation, events, approvals and client updates into one traceable shipment record." }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white/38 font-mono", children: "Built for freight forwarders, clearing agents and logistics teams operating across East Africa." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-5 leading-[1.4]", children: "Product" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: [
          { name: "Product", href: "/product/" },
          { name: "How It Works", href: "/how-it-works/" },
          { name: "Pricing", href: "/pricing/" },
          { name: "Case Study", href: "/case-study/" }
        ].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.href, className: "text-base text-white/58 hover:text-white transition-colors leading-[1.55]", children: link.name }) }, link.href)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-5 leading-[1.4]", children: "Solutions" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: [
          { name: "Freight Forwarders", href: "/solutions/freight-forwarders/" },
          { name: "Clearing Agents", href: "/solutions/clearing-agents/" },
          { name: "Resources", href: "/resources/" },
          { name: "Contact", href: "/contact/" }
        ].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.href, className: "text-base text-white/58 hover:text-white transition-colors leading-[1.55]", children: link.name }) }, link.href)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-5 leading-[1.4]", children: "Resources" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: [
          { name: "Bill of Lading Workflow", href: "/resources/bill-of-lading-workflow/" },
          { name: "Commercial Invoice Workflow", href: "/resources/commercial-invoice-workflow/" },
          { name: "Packing List Workflow", href: "/resources/packing-list-workflow/" },
          { name: "Company Documents", href: "/company-documentation/" }
        ].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.href, className: "text-base text-white/58 hover:text-white transition-colors leading-[1.55]", children: link.name }) }, link.href)) }),
        /* @__PURE__ */ jsx("h4", { className: "text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-3 leading-[1.4]", children: "Contact" }),
        /* @__PURE__ */ jsx("a", { href: "mailto:hello@indataflow.com", className: "text-base text-white/58 hover:text-white transition-colors leading-[1.55]", children: "hello@indataflow.com" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-white/35 font-mono leading-[1.5]", children: [
        "© ",
        currentYear,
        " InDataFlow. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsx(Link, { to: "/company-documentation/privacy-notice/", className: "text-sm text-white/35 hover:text-white/65 transition-colors font-mono leading-[1.5]", children: "Privacy" }),
        /* @__PURE__ */ jsx(Link, { to: "/company-documentation/terms-of-service/", className: "text-sm text-white/35 hover:text-white/65 transition-colors font-mono leading-[1.5]", children: "Terms" }),
        /* @__PURE__ */ jsx(Link, { to: "/company-documentation/security/", className: "text-sm text-white/35 hover:text-white/65 transition-colors font-mono leading-[1.5]", children: "Security" })
      ] })
    ] })
  ] }) });
}
function Layout({ children, className }) {
  const layoutClassName = ["min-h-screen", "flex", "flex-col", "home-theme", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: layoutClassName, children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 pt-16 lg:pt-20", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function HeroSection() {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)] flex items-center bg-[#010102]", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, className: "w-full h-full object-cover", children: /* @__PURE__ */ jsx("source", { src: "/14294690_3840_2160_24fps.mp4", type: "video/mp4" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#010102]/10 via-[#010102]/20 to-[#010102]/40" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container-wide relative z-10 py-16 sm:py-20 md:py-24 lg:py-28 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6 max-w-5xl mx-auto", children: "Cargo operations, connected." }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto mb-4", children: "InDataFlow is a cargo operations platform that connects shipment documents, validation, events, approvals and client updates into one traceable shipment record." }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg leading-[1.6] text-white/55 max-w-3xl mx-auto mb-8", children: "Built for freight forwarders, clearing agents and logistics teams operating across East Africa." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "hero", className: "animate-cta-glow", children: /* @__PURE__ */ jsx(Link, { to: "/contact/", children: "Book a walkthrough" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/resources/", children: "Read workflow resources" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#010102] to-transparent pointer-events-none z-10" })
  ] });
}
function DashboardGallery() {
  return /* @__PURE__ */ jsxs("section", { className: "section-padding pt-0 bg-[#010102] overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "container-wide mb-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-3", children: "The full picture" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white tracking-[-0.02em]", children: "Every dashboard. One platform." })
    ] }) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: "easeOut" },
        viewport: { once: true },
        className: "mx-auto w-full max-w-[1180px] px-4 sm:px-6 md:px-8",
        children: /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-[18px] border border-white/[0.14] bg-[#050506] shadow-[0_30px_120px_rgba(0,0,0,0.55)]", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] min-h-[260px] sm:min-h-[400px] lg:min-h-[600px]", children: [
          /* @__PURE__ */ jsx(
            "video",
            {
              autoPlay: true,
              muted: true,
              loop: true,
              playsInline: true,
              preload: "auto",
              className: "absolute inset-0 h-full w-full scale-[1.012] object-cover object-center contrast-[1.08] saturate-[1.06] brightness-[1.03] [backface-visibility:hidden] [transform:translateZ(0)_scale(1.012)]",
              children: /* @__PURE__ */ jsx("source", { src: "/homepage_The_full_picture_hd.mp4", type: "video/mp4" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0)_16%,rgba(0,0,0,0)_72%,rgba(0,0,0,0.30))]" }),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08]" })
        ] }) })
      }
    )
  ] });
}
function useScrollAnimation(options = {}) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);
  return { ref, isVisible };
}
const ScrollAnimation = forwardRef(
  function ScrollAnimation2({
    children,
    className = "",
    animation = "fade-up",
    delay = 0,
    threshold = 0.1
  }, forwardedRef) {
    const shouldReduceMotion = useReducedMotion();
    const { ref, isVisible } = useScrollAnimation({ threshold });
    const animationClasses = {
      "fade-up": "translate-y-4 opacity-0",
      "fade-in": "opacity-0",
      "slide-left": "-translate-x-4 opacity-0",
      "slide-right": "translate-x-4 opacity-0",
      "scale-in": "scale-[0.98] opacity-0"
    };
    const visibleClass = "translate-y-0 translate-x-0 scale-100 opacity-100";
    const baseClass = animationClasses[animation] || animationClasses["fade-up"];
    const setRefs = (element) => {
      ref.current = element;
      if (typeof forwardedRef === "function") {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref: setRefs,
        className: `${shouldReduceMotion ? "" : "transition-all duration-300 ease-out"} ${shouldReduceMotion || isVisible ? visibleClass : baseClass} ${className}`,
        style: { transitionDelay: shouldReduceMotion ? void 0 : `${delay}ms` },
        children
      }
    );
  }
);
const problems = [
  {
    title: "No authoritative cargo record",
    description: "Cargo data scattered across spreadsheets, emails, and chat threads.",
    icon: Database
  },
  {
    title: "Client disputes over timelines",
    description: "No shared, timestamped view of where cargo stands.",
    icon: Clock3
  },
  {
    title: "Documents lost between teams",
    description: "Compliance paperwork delayed or misplaced across handoffs.",
    icon: FileText
  },
  {
    title: "No accountability per milestone",
    description: "It's unclear who did what, when, and why delays happened.",
    icon: UserCheck
  }
];
function ProblemSection() {
  return /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsxs("div", { className: "container-wide", children: [
    /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "Cargo operations still live across WhatsApp and Excel." }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-white/80 leading-relaxed max-w-3xl mx-auto", children: "Most logistics operations rely on spreadsheets, messages, and emails to track critical cargo information creating confusion, delays, and accountability gaps." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-4", children: problems.map((problem, index) => /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: index * 100, className: "flex", children: /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden bg-[#0F1011] rounded-[12px] border border-white/12 p-5 flex flex-col h-full hover:border-white/25 hover:-translate-y-0.5 transition-all duration-300", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-[10px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#5E6AD2] group-hover:text-white group-hover:border-[#5E6AD2]/40 transition-colors duration-300", children: /* @__PURE__ */ jsx(problem.icon, { className: "w-4 h-4", strokeWidth: 1.8 }) }),
        /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-white/40 tabular-nums", children: (index + 1).toString().padStart(2, "0") })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg leading-snug font-bold text-white mb-3", children: problem.title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70 leading-relaxed", children: problem.description })
    ] }) }, problem.title)) })
  ] }) });
}
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 home-theme bg-background/80 backdrop-blur-[6px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg home-theme duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const internalFeatures = [
  { label: "Complete cargo lifecycle control", icon: Waypoints },
  { label: "Document validation and verification", icon: FileCheck2 },
  { label: "Milestone tracking with timestamps", icon: Clock3 },
  { label: "Full activity and audit trail", icon: Archive }
];
const clientFeatures = [
  { label: "Real-time shipment visibility", icon: Eye },
  { label: "Secure document upload portal", icon: ShieldCheck },
  { label: "Transparent status updates", icon: CheckCircle2 },
  { label: "Fewer calls, fewer disputes", icon: UserX }
];
const previewVideo = "/homepage_client_ops_preview_hd.mp4";
const internalScreens = [
  {
    title: "Dashboard Overview",
    description: "Track all active shipments with real-time status updates",
    src: "/internal_dashboard2.png",
    alt: "Internal dashboard overview"
  },
  {
    title: "Document Management",
    description: "Upload, validate, and organize all cargo documentation",
    src: "/internal_cargo_registry.png",
    alt: "Document review screen"
  },
  {
    title: "Milestone Tracking",
    description: "Monitor every step of the cargo lifecycle with timestamps",
    src: "/internal_pending_documents.png",
    alt: "Milestone tracking screen"
  },
  {
    title: "Activity Log",
    description: "Complete audit trail of all operations and changes",
    src: "/internal_validation_request.png",
    alt: "Operations dashboard"
  }
];
const clientScreens = [
  {
    title: "Shipment Status",
    description: "Real-time visibility into your cargo's journey",
    src: "/client_operations_overview.png",
    alt: "Client operations overview"
  },
  {
    title: "Document Portal",
    description: "Securely upload and access all shipment documents",
    src: "/client_document_status.png",
    alt: "Client document status"
  },
  {
    title: "Timeline View",
    description: "Visual progress tracking from origin to destination",
    src: "/client_operations_overview.png",
    alt: "Client operations overview"
  },
  {
    title: "Notifications",
    description: "Stay updated with automatic status alerts",
    src: "/client_document_status.png",
    alt: "Client document status"
  }
];
function SolutionSection() {
  var _a, _b;
  const [openModal, setOpenModal] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentScreens = openModal === "internal" ? internalScreens : clientScreens;
  const handlePrev = () => {
    setActiveIndex((prev) => prev === 0 ? currentScreens.length - 1 : prev - 1);
  };
  const handleNext = () => {
    setActiveIndex((prev) => prev === currentScreens.length - 1 ? 0 : prev + 1);
  };
  const handleOpen = (type) => {
    setOpenModal(type);
    setActiveIndex(0);
  };
  return /* @__PURE__ */ jsxs("section", { className: "section-padding bg-[#010102]", children: [
    /* @__PURE__ */ jsxs("div", { className: "container-wide", children: [
      /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "One system for internal operations and client visibility." }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white/80 leading-relaxed max-w-3xl mx-auto", children: "A shared source of truth across your entire cargo operation without exposing internal complexity." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12 sm:space-y-14 lg:space-y-16", children: [
        /* @__PURE__ */ jsxs(ScrollAnimation, { className: "flex flex-col h-full max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-6", children: "Internal Operations Dashboard" }),
          /* @__PURE__ */ jsx(
            PreviewVideoCard,
            {
              label: "Open internal operations preview",
              onClick: () => handleOpen("internal")
            }
          ),
          /* @__PURE__ */ jsx("ul", { className: "grid sm:grid-cols-2 gap-3 flex-grow", children: internalFeatures.map((feature) => {
            const Icon = feature.icon;
            return /* @__PURE__ */ jsxs("li", { className: "group flex items-start gap-3 bg-[#0F1011] rounded-[10px] p-3.5 border border-white/08 hover:border-white/20 transition-all duration-300", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-[8px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#5E6AD2] group-hover:text-white group-hover:border-[#5E6AD2]/40 transition-colors duration-300 shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4", strokeWidth: 1.8 }) }),
              /* @__PURE__ */ jsx("span", { className: "text-[15px] text-white/75 leading-[1.45] font-medium", children: feature.label })
            ] }, feature.label);
          }) })
        ] }),
        /* @__PURE__ */ jsxs(ScrollAnimation, { delay: 100, className: "flex flex-col h-full max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-6", children: "Client Dashboard" }),
          /* @__PURE__ */ jsx(
            PreviewVideoCard,
            {
              label: "Open client dashboard preview",
              onClick: () => handleOpen("client")
            }
          ),
          /* @__PURE__ */ jsx("ul", { className: "grid sm:grid-cols-2 gap-3 flex-grow", children: clientFeatures.map((feature) => {
            const Icon = feature.icon;
            return /* @__PURE__ */ jsxs("li", { className: "group flex items-start gap-3 bg-[#0F1011] rounded-[10px] p-3.5 border border-white/08 hover:border-white/20 transition-all duration-300", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-[8px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#5E6AD2] group-hover:text-white group-hover:border-[#5E6AD2]/40 transition-colors duration-300 shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4", strokeWidth: 1.8 }) }),
              /* @__PURE__ */ jsx("span", { className: "text-[15px] text-white/75 leading-[1.45] font-medium", children: feature.label })
            ] }, feature.label);
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openModal !== null, onOpenChange: () => setOpenModal(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-5xl w-[95vw] h-[90vh] p-0 bg-[#010102] border border-white/08 overflow-hidden [&>button]:hidden", children: [
      /* @__PURE__ */ jsx(VisuallyHidden, { children: /* @__PURE__ */ jsxs(DialogTitle, { children: [
        openModal === "internal" ? "Internal Operations Dashboard" : "Client Dashboard",
        " Preview"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-white/08", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white", children: openModal === "internal" ? "Internal Operations" : "Client Dashboard" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-white/50", children: (_a = currentScreens[activeIndex]) == null ? void 0 : _a.title })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setOpenModal(null),
              className: "p-2 rounded-lg hover:bg-white/5 transition-colors",
              children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-white" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center justify-center p-6 bg-[#010102] relative overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handlePrev,
              className: "absolute left-4 z-10 p-3 rounded-full bg-[#0F1011]/80 border border-white/12 hover:bg-white/10 hover:border-white/25 transition-all",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 text-white" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "w-full max-w-3xl rounded-[12px] overflow-hidden border border-white/08 bg-[#0F1011]", children: openModal === "internal" ? /* @__PURE__ */ jsx(ExpandedInternalMockup, { screenIndex: activeIndex }) : /* @__PURE__ */ jsx(ExpandedClientMockup, { screenIndex: activeIndex }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleNext,
              className: "absolute right-4 z-10 p-3 rounded-full bg-[#0F1011]/80 border border-white/12 hover:bg-white/10 hover:border-white/25 transition-all",
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 text-white" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-white/08", children: [
          /* @__PURE__ */ jsx("p", { className: "text-center text-white/50 mb-4", children: (_b = currentScreens[activeIndex]) == null ? void 0 : _b.description }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-white/30 font-mono tabular-nums", children: [
              activeIndex + 1,
              " / ",
              currentScreens.length
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: currentScreens.map((_, index) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setActiveIndex(index),
                className: `w-2 h-2 rounded-full transition-all ${index === activeIndex ? "bg-[#5E6AD2] w-5" : "bg-white/20 hover:bg-white/40"}`
              },
              index
            )) })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function PreviewVideoCard({ label, onClick }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      "aria-label": label,
      onClick,
      className: "group relative mb-8 w-full overflow-hidden rounded-[18px] border border-white/[0.14] bg-[#050506] text-left shadow-[0_28px_90px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_34px_120px_rgba(47,71,190,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EA0FF]/70",
      children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[59/30] min-h-[320px] bg-[#050506] sm:min-h-[440px] lg:min-h-[560px]", children: [
        /* @__PURE__ */ jsx(
          "video",
          {
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            preload: "auto",
            className: "absolute inset-0 h-full w-full scale-[1.012] object-cover object-center contrast-[1.08] saturate-[1.06] brightness-[1.03] [backface-visibility:hidden] [transform:translateZ(0)_scale(1.012)]",
            children: /* @__PURE__ */ jsx("source", { src: previewVideo, type: "video/mp4" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0)_18%,rgba(0,0,0,0)_70%,rgba(0,0,0,0.28))]" }),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08]" })
      ] })
    }
  );
}
function ExpandedInternalMockup({ screenIndex }) {
  const screens = internalScreens.map((screen) => /* @__PURE__ */ jsx("img", { src: screen.src, alt: screen.alt, className: "w-full h-full object-cover" }, screen.src));
  return screens[screenIndex] || screens[0];
}
function ExpandedClientMockup({ screenIndex }) {
  const screens = clientScreens.map((screen) => /* @__PURE__ */ jsx("img", { src: screen.src, alt: screen.alt, className: "w-full h-full object-cover" }, screen.src + screen.title));
  return screens[screenIndex] || screens[0];
}
const credibilitySignals = [
  { label: "Live cargo operations in East Africa", icon: MapPin },
  { label: "Active clearing and forwarding workflows", icon: GitBranch },
  { label: "Port-to-warehouse coverage", icon: Route },
  { label: "Paying clients using the system daily", icon: BadgeCheck }
];
function ProofSection() {
  return /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
    /* @__PURE__ */ jsxs(ScrollAnimation, { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "Already running live cargo operations." }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-white/80 leading-relaxed mb-10", children: "InDataFlow is actively used in real logistics workflows tracking shipments, validating documents, and coordinating teams daily." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto", children: credibilitySignals.map((signal, index) => {
      const Icon = signal.icon;
      return /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: index * 80, children: /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden bg-[#0F1011] rounded-[12px] border border-white/08 p-5 flex items-start gap-4 h-full text-left hover:-translate-y-0.5 hover:border-white/20 transition-all duration-300", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-[9px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#5E6AD2] group-hover:text-white group-hover:border-[#5E6AD2]/40 transition-colors duration-300 shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4", strokeWidth: 1.8 }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[15px] text-white/75 leading-[1.45] font-medium", children: signal.label })
      ] }) }, signal.label);
    }) }),
    /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: 300, children: /* @__PURE__ */ jsxs("figure", { className: "mt-12 max-w-2xl mx-auto bg-[#0F1011] rounded-[12px] p-6 sm:p-8 border border-white/08 text-left overflow-hidden relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5E6AD2]/50 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-[10px] bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 text-[#5E6AD2]", children: /* @__PURE__ */ jsx(Quote, { className: "w-4 h-4", strokeWidth: 1.8 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("blockquote", { className: "text-base sm:text-lg text-white/80 leading-[1.65]", children: '"InDataFlow replaced three different systems. Now our team and clients see the same information in real-time."' }),
          /* @__PURE__ */ jsxs("figcaption", { className: "mt-5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-[#5E6AD2]/15 border border-[#5E6AD2]/25 flex items-center justify-center text-[#5E6AD2]", children: /* @__PURE__ */ jsx(UserRound, { className: "w-3.5 h-3.5", strokeWidth: 1.8 }) }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-white/45 leading-[1.4]", children: "Operations Manager, Clearing & Forwarding, East Africa" })
          ] })
        ] })
      ] })
    ] }) })
  ] }) }) });
}
function CTASection() {
  return /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "One shipment record from document intake to verified cargo status." }),
    /* @__PURE__ */ jsx("p", { className: "text-lg text-white/80 leading-relaxed mb-8", children: "Explore the product, solution pages and workflow guides that show how InDataFlow connects cargo operations, document validation and client visibility." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-3", children: [
      /* @__PURE__ */ jsx(Link, { to: "/contact/", children: /* @__PURE__ */ jsxs(Button, { className: "bg-[#5E6AD2] h-[44px] rounded-[10px] px-8 text-white hover:bg-[#5E6AD2]/90 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2 group shadow-lg shadow-[#5E6AD2]/0 hover:shadow-[#5E6AD2]/20", children: [
        "Book a walkthrough",
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" })
      ] }) }),
      /* @__PURE__ */ jsx(Link, { to: "/solutions/freight-forwarders/", children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "h-[44px] rounded-[10px] px-8 inline-flex items-center gap-2", children: "View solutions" }) }),
      /* @__PURE__ */ jsx(Link, { to: "/resources/", children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "h-[44px] rounded-[10px] px-8 inline-flex items-center gap-2", children: "Read resources" }) })
    ] })
  ] }) }) }) });
}
const Index = () => {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(DashboardGallery, {}),
    /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsx(ProblemSection, {}) }),
    /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsx(SolutionSection, {}) }),
    /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsx(ProofSection, {}) }),
    /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsx(CTASection, {}) })
  ] });
};
function AnimatedWords({
  text,
  className = "",
  delay = 0,
  staggerDelay = 100
}) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  const words = text.split(" ");
  return /* @__PURE__ */ jsx("span", { className, children: words.map((word, index) => /* @__PURE__ */ jsxs(
    "span",
    {
      className: `inline-block transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-sm"}`,
      style: {
        transitionDelay: `${index * staggerDelay}ms`
      },
      children: [
        word,
        index < words.length - 1 && /* @__PURE__ */ jsx(Fragment, { children: " " })
      ]
    },
    index
  )) });
}
function PageHeader({ title, description, children, className }) {
  return /* @__PURE__ */ jsx("section", { className: `section-padding bg-[#010102] ${className ?? ""}`, children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6", children: /* @__PURE__ */ jsx(AnimatedWords, { text: title, staggerDelay: 80 }) }),
    description && /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto", children: description }),
    children && /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-center", children })
  ] }) }) });
}
function BrowserMockup({ src, alt, tilt = false, className = "" }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-3, 3]);
  const isVideo = src.endsWith(".mp4");
  const handleMouseMove = (e) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xVal);
    y.set(yVal);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      style: tilt ? { rotateX, rotateY, perspective: 1e3 } : void 0,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      initial: shouldReduceMotion ? false : { opacity: 0, y: 14 },
      whileInView: shouldReduceMotion ? void 0 : { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-40px" },
      transition: { duration: 0.28, ease: "easeOut" },
      className: `relative w-full rounded-[12px] overflow-hidden border border-white/[0.12] bg-[#0A0A0B] shadow-[0_0_60px_rgba(0,0,0,0.4)] ${className}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -left-24 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_top,rgba(94,106,210,0.08),transparent_70%)] pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-3 border-b border-white/[0.08] relative z-[1]", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" }),
          /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" }),
          /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" })
        ] }),
        isVideo ? /* @__PURE__ */ jsx(
          "video",
          {
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            className: "w-full h-auto block relative z-[1] transition-transform duration-300 ease-out hover:scale-[1.01]",
            children: /* @__PURE__ */ jsx("source", { src, type: "video/mp4" })
          }
        ) : /* @__PURE__ */ jsx(
          motion.img,
          {
            src,
            alt,
            initial: shouldReduceMotion ? false : { opacity: 0, y: 10 },
            whileInView: shouldReduceMotion ? void 0 : { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-40px" },
            transition: { duration: 0.3, delay: 0.08, ease: "easeOut" },
            className: "w-full h-auto block relative z-[1] transition-transform duration-300 ease-out hover:scale-[1.01]"
          }
        )
      ]
    }
  );
}
const statusSteps = [
  { label: "Pending", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { label: "Validating", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { label: "Validated", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { label: "Approved", color: "bg-[#5E6AD2]/20 text-[#5E6AD2] border-[#5E6AD2]/30" }
];
const docFlowSteps = [
  { label: "Uploaded", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { label: "Validating", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { label: "Verified", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { label: "Notified", color: "bg-[#5E6AD2]/20 text-[#5E6AD2] border-[#5E6AD2]/30" }
];
const integrationSteps = [
  { label: "Email", status: "Connected", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { label: "WhatsApp", status: "Connected", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { label: "Documents", status: "Connected", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { label: "Dashboard", status: "Live", color: "bg-[#5E6AD2]/20 text-[#5E6AD2] border-[#5E6AD2]/30" }
];
function SectionFade({ children, className = "" }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.28, ease: "easeOut" },
      viewport: { once: true, margin: "-40px" },
      className,
      children
    }
  );
}
function ContentSection({
  eyebrow,
  title,
  description,
  tilt = false,
  imageSrc,
  imageAlt
}) {
  return /* @__PURE__ */ jsx(SectionFade, { children: /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102] overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "container-wide", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl text-center mb-8 sm:mb-10 lg:mb-12", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-4 leading-[1.5]", children: eyebrow }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl leading-[1.2] sm:text-3xl font-serif font-bold text-white mb-4 sm:mb-5 tracking-[-0.02em]", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-[17px] sm:text-lg leading-[1.7] text-white/70 max-w-3xl mx-auto", children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-6xl", children: /* @__PURE__ */ jsx(BrowserMockup, { src: imageSrc, alt: imageAlt, tilt }) })
  ] }) }) });
}
function StatusAnimation() {
  const finalStatus = statusSteps[statusSteps.length - 1];
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0F1011] rounded-[12px] border border-white/[0.12] p-5 sm:p-6 max-w-[500px] mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm sm:text-base text-white/50 font-mono leading-[1.5]", children: "Cargo-2847" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-white/30 font-mono leading-[1.5]", children: "2 min ago" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: statusSteps.map((status, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -12 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.25, delay: 0.1 + index * 0.1, ease: "easeOut" },
        viewport: { once: true, amount: 0.8 },
        className: "flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 flex-none rounded-full bg-[#5E6AD2]" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 text-sm sm:text-base text-white/70 leading-[1.5]", children: [
            "Document ",
            status.label.toLowerCase()
          ] }),
          /* @__PURE__ */ jsx("div", { className: `px-2.5 sm:px-3 py-1 rounded-[6px] border text-xs sm:text-sm font-mono leading-[1.4] ${status.color}`, children: status.label })
        ]
      },
      status.label
    )) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 6 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.25, delay: 0.55, ease: "easeOut" },
        viewport: { once: true, amount: 0.8 },
        className: "mt-4 pt-4 border-t border-white/[0.06]",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm text-white/40 font-mono leading-[1.5]", children: "Status updated" }),
          /* @__PURE__ */ jsx("div", { className: `px-3 py-1.5 rounded-[6px] border text-sm sm:text-base font-mono leading-[1.4] ${finalStatus.color}`, children: finalStatus.label })
        ] })
      }
    )
  ] });
}
function DocumentDemo() {
  const finalStatus = docFlowSteps[docFlowSteps.length - 1];
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0F1011] rounded-[12px] border border-white/[0.12] p-5 sm:p-6 max-w-[500px] mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-sm text-[#5E6AD2] font-bold", children: "PDF" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-white font-medium leading-[1.4]", children: "Bill of Lading #2847" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-white/40 font-mono leading-[1.4]", children: "Client upload" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: docFlowSteps.map((status, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -12 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.25, delay: 0.1 + index * 0.1, ease: "easeOut" },
        viewport: { once: true, amount: 0.8 },
        className: "flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 flex-none rounded-full bg-[#5E6AD2]" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 text-xs sm:text-sm text-white/70 leading-[1.5]", children: [
            index === 0 && "Document received from client",
            index === 1 && "System validating contents",
            index === 2 && "All fields match requirements",
            index === 3 && "Client notified of approval"
          ] }),
          /* @__PURE__ */ jsx("div", { className: `px-2 sm:px-2.5 py-0.5 rounded-[6px] border text-[11px] sm:text-xs font-mono leading-[1.4] whitespace-nowrap ${status.color}`, children: status.label })
        ]
      },
      status.label
    )) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 6 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.25, delay: 0.55, ease: "easeOut" },
        viewport: { once: true, amount: 0.8 },
        className: "mt-4 pt-4 border-t border-white/[0.06]",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-white/40 font-mono leading-[1.5]", children: "Last updated" }),
          /* @__PURE__ */ jsx("div", { className: `px-3 py-1 rounded-[6px] border text-xs sm:text-sm font-mono leading-[1.4] ${finalStatus.color}`, children: finalStatus.label })
        ] })
      }
    )
  ] });
}
function IntegrationDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0F1011] rounded-[12px] border border-white/[0.12] p-5 sm:p-6 max-w-[500px] mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-white/40 font-mono leading-[1.4]", children: "System Status" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: integrationSteps.map((integration, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.25, delay: 0.1 + index * 0.1, ease: "easeOut" },
        viewport: { once: true, amount: 0.8 },
        className: "flex items-center justify-between py-2",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { scale: 0 },
                whileInView: { scale: 1 },
                transition: { duration: 0.22, delay: 0.14 + index * 0.1, ease: "easeOut" },
                viewport: { once: true, amount: 0.8 },
                className: "w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center",
                children: /* @__PURE__ */ jsx("span", { className: "text-[10px] text-green-400", children: "✓" })
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-white/80 leading-[1.5]", children: integration.label })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `px-2 sm:px-2.5 py-0.5 rounded-[6px] border text-[11px] sm:text-xs font-mono leading-[1.4] ${integration.color}`, children: integration.status })
        ]
      },
      integration.label
    )) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 6 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.25, delay: 0.55, ease: "easeOut" },
        viewport: { once: true, amount: 0.8 },
        className: "mt-4 pt-4 border-t border-white/[0.06]",
        children: /* @__PURE__ */ jsx("div", { className: "text-xs text-white/50 font-mono leading-[1.5]", children: "All systems operational" })
      }
    )
  ] });
}
function MicroDemoHub() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "section-padding pb-0 bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-4 leading-[1.5]", children: "Live system" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl leading-[1.2] sm:text-3xl font-serif font-bold text-white tracking-[-0.02em]", children: "See the operation run in real time." })
    ] }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative bg-[#010102]", children: [
      /* @__PURE__ */ jsxs("div", { className: "sticky top-0 h-[100svh] overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "video",
          {
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            "aria-hidden": "true",
            className: "absolute inset-0 w-full h-full object-cover",
            children: /* @__PURE__ */ jsx("source", { src: "/15231603_3840_2160_25fps-loop.mp4", type: "video/mp4" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#010102]/20 via-transparent to-[#010102]/40" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "container-wide relative z-10 -mt-[100svh] py-[18vh] sm:py-[20vh]", children: /* @__PURE__ */ jsxs("div", { className: "ml-auto w-full max-w-[540px] space-y-[28vh] sm:space-y-[32vh]", children: [
        /* @__PURE__ */ jsx(SectionFade, { children: /* @__PURE__ */ jsx(StatusAnimation, {}) }),
        /* @__PURE__ */ jsx(SectionFade, { children: /* @__PURE__ */ jsx(DocumentDemo, {}) }),
        /* @__PURE__ */ jsx(SectionFade, { children: /* @__PURE__ */ jsx(IntegrationDemo, {}) })
      ] }) })
    ] })
  ] });
}
function Product() {
  return /* @__PURE__ */ jsxs(Layout, { className: "product-page overflow-x-clip", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)] flex items-center bg-[#010102]", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, className: "w-full h-full object-cover", children: /* @__PURE__ */ jsx("source", { src: "/15231603_3840_2160_25fps-loop.mp4", type: "video/mp4" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#010102]/10 via-[#010102]/20 to-[#010102]/40" })
      ] }),
      /* @__PURE__ */ jsx(
        PageHeader,
        {
          title: "The control layer for modern logistics operations.",
          description: "Connect your messages, documents, and operational systems. InDataFlow gives your team one live view of what is happening and what needs to happen next.",
          className: "bg-transparent relative z-10 w-full py-24 sm:py-28 md:py-32 lg:py-36 [&_h1]:mb-7 [&_p]:max-w-4xl [&_p]:text-white/75 [&_p]:leading-[1.7] [&_.mt-8]:mt-10",
          children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full sm:w-auto", children: /* @__PURE__ */ jsx(Link, { to: "/contact/", children: "Book a walkthrough" }) })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#010102] to-transparent pointer-events-none z-10" })
    ] }),
    /* @__PURE__ */ jsx(
      ContentSection,
      {
        eyebrow: "Operations",
        title: "Your operation, finally under control.",
        description: "Your command center for daily operations. See what is happening, what needs attention, and what happens next without chasing updates across WhatsApp, email, and spreadsheets.",
        tilt: true,
        imageSrc: "/indataflow_product_page_video_v2_longer_transitions.mp4",
        imageAlt: "Internal operations dashboard showing cargo timeline, active shipments, and exception alerts"
      }
    ),
    /* @__PURE__ */ jsx(
      ContentSection,
      {
        eyebrow: "AI connected",
        title: "Information comes from everywhere. Control lives in one place.",
        description: "AI agents connect the messages, documents, and systems your operation already depends on, turning fragmented information into structured operational context.",
        imageSrc: "/indataflow_product_page_video_2_v2_richer.mp4",
        imageAlt: "Operational timeline showing aggregated events from WhatsApp, email, documents, and connected systems into a single feed"
      }
    ),
    /* @__PURE__ */ jsx(MicroDemoHub, {}),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsxs("div", { className: "container-wide text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl leading-[1.2] sm:text-3xl font-serif font-bold text-white mb-5 tracking-[-0.02em]", children: "Ready to see InDataFlow in action?" }),
      /* @__PURE__ */ jsx("p", { className: "text-[17px] sm:text-lg leading-[1.7] text-white/70 mb-8", children: "Book a walkthrough and see how it fits your operation." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "inline-flex w-full sm:w-auto items-center gap-2", children: /* @__PURE__ */ jsxs(Link, { to: "/contact/", children: [
        "Book a walkthrough",
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) })
    ] }) })
  ] });
}
const steps = [
  {
    number: "01",
    title: "Sign up and describe your operation",
    description: "Tell us about your cargo types, the ports you work with, your typical workflows, and your team structure. This helps us configure InDataFlow for your specific needs.",
    bullets: [
      "Quick onboarding questionnaire tailored to your operation",
      "No technical knowledge or IT setup required",
      "Support available via call or chat throughout"
    ],
    image: "/how_it_works_1.mp4"
  },
  {
    number: "02",
    title: "Preview your dashboard",
    description: "See a preview of how your operation will look in InDataFlow. Review the cargo pipeline, document structure, and client portal before going live.",
    bullets: [
      "Personalized demo environment with your actual workflows",
      "See real cargo examples mapped to your operation",
      "Provide feedback and adjustments before going live"
    ],
    image: "/how_it_works_final.mp4"
  },
  {
    number: "03",
    title: "Complete setup",
    description: "Configure your milestones, document requirements, team roles, and client access levels. We help you set up everything correctly the first time.",
    bullets: [
      "Guided configuration of milestones and document types",
      "Import existing data and digital archive if needed",
      "Team training session included in every plan"
    ],
    image: "/how_it_works_2.mp4"
  },
  {
    number: "04",
    title: "Run daily operations",
    description: "Start managing real cargo from day one. Your team uses InDataFlow for every shipment, and your clients get instant visibility.",
    bullets: [
      "Begin with live cargo immediately after setup",
      "Ongoing support and regular check-ins during first month",
      "Clients access their portal for real-time shipment updates"
    ],
    image: "/homepage_The_full_picture.mp4"
  }
];
function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(steps.length - 1, Math.max(0, Math.floor(latest * steps.length)));
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "From signup to daily operations",
        description: "No heavy IT. No months of implementation. InDataFlow is designed for fast onboarding and immediate daily usage."
      }
    ),
    /* @__PURE__ */ jsx("div", { ref: sectionRef, children: /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-5 gap-8 lg:gap-12", children: [
      /* @__PURE__ */ jsx("div", { className: "md:col-span-3 md:sticky md:top-32 md:self-start", children: /* @__PURE__ */ jsx("div", { className: "rounded-[20px] overflow-hidden border border-white/08 bg-[#0A0A0B] shadow-[0_0_40px_rgba(0,0,0,0.35)] aspect-[16/9] lg:aspect-[16/8]", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.985 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.32, ease: "easeOut" },
          className: "w-full h-full",
          children: steps[activeIndex].image.endsWith(".mp4") ? /* @__PURE__ */ jsx(
            "video",
            {
              autoPlay: true,
              muted: true,
              loop: true,
              playsInline: true,
              preload: "metadata",
              className: "w-full h-full object-cover block",
              children: /* @__PURE__ */ jsx("source", { src: steps[activeIndex].image, type: "video/mp4" })
            }
          ) : /* @__PURE__ */ jsx(
            "img",
            {
              src: steps[activeIndex].image,
              alt: steps[activeIndex].title,
              className: "w-full h-full object-cover block"
            }
          )
        },
        activeIndex
      ) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-2 flex flex-col", children: steps.map((step, i) => {
        const isActive = i === activeIndex;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "min-h-[60vh] flex flex-col justify-center py-12 transition-all duration-300 " + (isActive ? "opacity-100" : "opacity-65"),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-[10px] flex items-center justify-center border transition-colors " + (isActive ? "border-[#5E6AD2] bg-[#5E6AD2]/10" : "border-white/15 bg-white/[0.03]"), children: /* @__PURE__ */ jsx("span", { className: "text-[#5E6AD2] font-mono font-bold text-sm", children: step.number }) }),
                /* @__PURE__ */ jsxs("span", { className: "text-xs text-[#5E6AD2] uppercase tracking-[0.15em] font-mono", children: [
                  "Step ",
                  step.number
                ] })
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "text-4xl font-serif font-bold text-white mb-4", children: step.title }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-white/70 mb-6", children: step.description }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: step.bullets.map((bullet) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#5E6AD2] mt-2 shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "text-base text-white/70", children: bullet })
              ] }, bullet)) })
            ]
          },
          step.number
        );
      }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsxs("div", { className: "container-wide", children: [
      /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-12 text-center tracking-[-0.02em]", children: "What makes InDataFlow different" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
        { value: "Days", label: "Not months", desc: "Go live within a week of signup" },
        { value: "Zero", label: "IT requirements", desc: "No servers, no installations, no IT team needed" },
        { value: "100%", label: "Web-based", desc: "Access from any device, anywhere" }
      ].map((item, index) => /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: index * 100, children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-white mb-2", children: item.value }),
        /* @__PURE__ */ jsx("div", { className: "text-lg text-white mb-1", children: item.label }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70", children: item.desc })
      ] }) }, item.value)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsxs("div", { className: "container-wide text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "Ready to get started?" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-white/70 mb-8", children: "Book a call and we'll walk you through the entire process." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "inline-flex items-center gap-2", children: /* @__PURE__ */ jsxs(Link, { to: "/contact/", children: [
        "Book a walkthrough",
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) })
    ] }) })
  ] });
}
const plans = [
  {
    name: "Starter",
    description: "For teams getting started. Up to 3 clients, 1 ops number.",
    priceUSD: 250,
    capacity: "Up to 30 shipments/month",
    highlighted: false
  },
  {
    name: "Growth",
    description: "For growing operations. Up to 10 clients, 2 ops numbers, email intake.",
    priceUSD: 500,
    capacity: "Up to 100 shipments/month",
    highlighted: true
  },
  {
    name: "Custom",
    description: "Unlimited shipments, clients, and dedicated support.",
    priceUSD: null,
    priceLabel: "Custom",
    capacity: "Unlimited",
    highlighted: false
  }
];
const tableSections = [
  {
    category: "Operations",
    rows: [
      { label: "Cargo timeline dashboard", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Clearing progress visibility", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Storage day counter", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Milestone tracking", starter: "yes", growth: "yes", volume: "yes" }
    ]
  },
  {
    category: "Documents",
    rows: [
      { label: "Document upload + validation", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Digital archive", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Bulk document management", starter: "no", growth: "no", volume: "yes" }
    ]
  },
  {
    category: "Notifications",
    rows: [
      { label: "Email notifications", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Clearing progress alerts", starter: "no", growth: "yes", volume: "yes" },
      { label: "Weekly shipment summary", starter: "no", growth: "yes", volume: "yes" }
    ]
  },
  {
    category: "Support",
    rows: [
      { label: "Standard support", starter: "yes", growth: "no", volume: "no" },
      { label: "Priority response SLA", starter: "no", growth: "yes", volume: "no" },
      { label: "Dedicated support", starter: "no", growth: "no", volume: "yes" }
    ]
  },
  {
    category: "Access",
    rows: [
      { label: "Multi-user access", starter: "no", growth: "yes", volume: "yes" },
      { label: "Multi-department access", starter: "no", growth: "no", volume: "yes" },
      { label: "Custom reporting", starter: "no", growth: "no", volume: "yes" }
    ]
  }
];
function Check({ state }) {
  if (state === "yes") return /* @__PURE__ */ jsx("span", { className: "text-[#5E6AD2] text-lg", children: "✓" });
  return /* @__PURE__ */ jsx("span", { className: "text-white/[0.06] text-lg", children: "—" });
}
function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const faqs = [
    { q: "What counts as a cargo?", a: "Any shipment you create in InDataFlow, regardless of size or number of containers." },
    { q: "Can I upgrade or downgrade my plan?", a: "Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle." },
    { q: "What happens if I exceed my cargo limit?", a: "We'll notify you when you're approaching your limit. Extra shipments are billed at $6/shipment. Traffic overage (WhatsApp, OCR, AI) is billed at low per-unit rates." },
    { q: "Is there a contract?", a: "We offer monthly and annual billing. Annual plans come with a discount. No long-term contracts required." },
    { q: "How does billing work?", a: "You're billed monthly or annually based on your plan. Invoices are sent via email and can be paid by bank transfer or card." },
    { q: "Can I try before committing?", a: "Absolutely. We offer a 14-day trial with full access to all features. No credit card required." }
  ];
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "Simple, volume-based pricing",
        description: "Pricing based on operational volume, not users. No per-seat pricing. No hidden fees.",
        className: "pb-4 md:pb-8"
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "section-padding pt-0 bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxs("div", { className: "relative inline-flex bg-[#0F1011] border border-[#1A1A1A] rounded-full p-[4px]", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-[4px] bottom-[4px] rounded-full bg-[#5E6AD2] transition-all duration-300 shadow-lg shadow-[#5E6AD2]/20",
            style: {
              width: "calc(50% - 4px)",
              left: annual ? "calc(50% + 4px)" : "4px"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setAnnual(false),
            className: `relative z-10 px-7 py-2.5 text-sm font-medium text-center transition-colors duration-300 ${!annual ? "text-white" : "text-white/50 hover:text-white"}`,
            children: "Monthly"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setAnnual(true),
            className: `relative z-10 px-7 py-2.5 text-sm font-medium text-center inline-flex items-center gap-1.5 transition-colors duration-300 ${annual ? "text-white" : "text-white/50 hover:text-white"}`,
            children: [
              "Yearly",
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#22c55e] font-semibold whitespace-nowrap", children: "Save 10%" })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4 items-stretch mb-8", children: plans.map((plan, i) => /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: i * 80, className: "flex", children: /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        plan.highlighted && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 z-20", children: /* @__PURE__ */ jsx("span", { className: "relative text-xs font-semibold text-white px-5 py-1.5 rounded-full bg-[#5E6AD2] shadow-sm shadow-[#5E6AD2]/10 whitespace-nowrap", children: "Most Popular" }) }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `rounded-[16px] border p-8 flex flex-col h-full relative ${plan.highlighted ? "border-[#5E6AD2]/40 bg-gradient-to-b from-white/[0.03] to-transparent shadow-lg shadow-[#5E6AD2]/5 z-10" : "border-white/06 bg-gradient-to-b from-white/[0.03] to-transparent"}`,
            children: [
              plan.highlighted && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-[2px] bg-[#5E6AD2] rounded-t-[16px]" }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-1", children: plan.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-white/60 mb-5", children: plan.description }),
              /* @__PURE__ */ jsx("div", { className: "mb-1", children: plan.priceUSD ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("span", { className: "text-4xl font-bold text-white font-mono tracking-tight", children: [
                  "$",
                  annual ? Math.round(plan.priceUSD * 12 * 0.9).toLocaleString() : plan.priceUSD
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-base text-white/40 font-mono ml-0.5", children: annual ? "/yr" : "/mo" })
              ] }) : /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white font-mono tracking-tight", children: plan.priceLabel }) }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-white/35 mb-8", children: plan.capacity }),
              /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsx(
                Button,
                {
                  asChild: true,
                  className: `w-full h-[44px] rounded-[10px] text-base font-medium transition-all duration-300 ${plan.highlighted ? "bg-[#5E6AD2] text-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#5E6AD2]/10" : "bg-transparent border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:-translate-y-0.5"}`,
                  children: /* @__PURE__ */ jsx(Link, { to: "/contact/", children: plan.priceUSD ? "Subscribe" : "Contact us" })
                }
              ) })
            ]
          }
        )
      ] }) }, plan.name)) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#0F1011] rounded-[16px] border border-[#1A1A1A]", children: [
        /* @__PURE__ */ jsx("div", { className: "md:hidden p-4 space-y-4", children: tableSections.map((section) => /* @__PURE__ */ jsxs("div", { className: "rounded-[14px] border border-white/[0.04] bg-black/20 p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3 text-[10px] uppercase tracking-[0.15em] font-medium text-white/25", children: section.category }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: section.rows.map((row) => /* @__PURE__ */ jsxs("div", { className: "rounded-[12px] border border-white/[0.04] bg-white/[0.015] p-3", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-3 text-sm font-medium text-white/80", children: row.label }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 text-center text-[11px]", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-[8px] border border-white/[0.04] px-2 py-2", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-1 text-white/35", children: "Starter" }),
                /* @__PURE__ */ jsx(Check, { state: row.starter })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-[8px] border border-white/[0.04] px-2 py-2", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-1 text-white/35", children: "Growth" }),
                /* @__PURE__ */ jsx(Check, { state: row.growth })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-[8px] border border-white/[0.04] px-2 py-2", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-1 text-white/35", children: "Custom" }),
                /* @__PURE__ */ jsx(Check, { state: row.volume })
              ] })
            ] })
          ] }, row.label)) })
        ] }, section.category)) }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsx("thead", { className: "sticky top-0 z-10 bg-[#0F1011]", children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/[0.04]", children: [
            /* @__PURE__ */ jsx("th", { className: "text-left py-5 px-8 text-sm text-white/35 w-[44%] font-medium", children: "Feature" }),
            plans.map((plan) => /* @__PURE__ */ jsx(
              "th",
              {
                className: `py-5 px-4 text-sm font-semibold text-center w-[18.67%] ${plan.highlighted ? "text-[#5E6AD2]" : "text-white/50"}`,
                children: plan.name
              },
              plan.name
            ))
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: tableSections.map((section) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
            /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
              "td",
              {
                colSpan: 4,
                className: "py-3 px-8 text-[10px] text-white/15 uppercase tracking-[0.15em] font-medium",
                children: section.category
              }
            ) }),
            section.rows.map((row) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors", children: [
              /* @__PURE__ */ jsx("td", { className: "py-4 px-8 text-base text-white/80 font-medium", children: row.label }),
              /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(Check, { state: row.starter }) }),
              /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(Check, { state: row.growth }) }),
              /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(Check, { state: row.volume }) })
            ] }, row.label))
          ] }, section.category)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-white/25 mt-6", children: "Unlimited dashboard users and client portal accounts on all plans. Usage-based overage for traffic beyond plan limits." })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-[16px] border border-white/[0.06] bg-gradient-to-br from-[#111216] via-[#0F1011] to-[#0D0E12] p-10 md:p-12 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-[#5E6AD2]/8 to-transparent rounded-full blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-8 left-8 flex gap-2 pointer-events-none", children: [
        /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-white/[0.04]" }),
        /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-white/[0.03]" }),
        /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-white/[0.06]" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-serif font-bold text-white mb-4", children: "Enterprise" }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-white/70 max-w-[512px] mb-10", children: "Custom deployment and dedicated support for organizations processing high volumes across multiple regions." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 mb-10", children: [
          { icon: Gauge, label: "Unlimited cargo volume", desc: "No monthly caps or overage fees" },
          { icon: Shield, label: "SLA-backed support", desc: "Guaranteed response times with dedicated contacts" },
          { icon: Globe, label: "Regional rollout", desc: "Multi-location deployment with localized workflows" },
          { icon: Lock, label: "Security review", desc: "Compliance documentation and audit support" },
          { icon: Puzzle, label: "Custom integrations", desc: "API access and third-party system connections" },
          { icon: Rocket, label: "Dedicated onboarding", desc: "White-glove setup with your operations team" }
        ].map((item) => {
          const Icon = item.icon;
          return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-[8px] bg-[#5E6AD2]/10 border border-[#5E6AD2]/15 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-[#5E6AD2]" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-base font-medium text-white", children: item.label }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-white/60 mt-0.5", children: item.desc })
            ] })
          ] }, item.label);
        }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            asChild: true,
            className: "inline-flex items-center gap-3 h-[48px] px-6 bg-[#5E6AD2] rounded-[10px] text-base font-medium text-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#5E6AD2]/10 transition-all duration-300",
            children: /* @__PURE__ */ jsxs(Link, { to: "/contact/", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
              "Talk to our team",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[768px] mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif font-bold text-white text-center mb-10", children: "Common questions" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mb-6", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search questions...",
            value: searchQuery,
            onChange: (e) => {
              setSearchQuery(e.target.value);
              setOpenFaq(null);
            },
            className: "w-full h-[44px] pl-11 pr-4 rounded-[12px] bg-[#0F1011] border border-[#1A1A1A] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#5E6AD2]/50 transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: faqs.filter(
        (item) => item.q.toLowerCase().includes(searchQuery.toLowerCase())
      ).map((item, idx) => {
        const isOpen = openFaq === idx;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "rounded-[16px] border border-[#1A1A1A] bg-[#0F1011] relative overflow-hidden",
            children: [
              isOpen && /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 bottom-0 w-[4px] bg-[#5E6AD2]" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setOpenFaq(isOpen ? null : idx),
                  className: "w-full flex items-center justify-between p-6 pl-7 text-left",
                  children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-xl font-bold transition-colors duration-300 ${isOpen ? "text-[#5E6AD2]" : "text-white"}`,
                        children: item.q
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ChevronDown,
                      {
                        className: `w-5 h-5 text-white/35 shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
                  children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70 px-6 pb-6", children: item.a }) })
                }
              )
            ]
          },
          item.q
        );
      }) }),
      searchQuery && faqs.filter(
        (item) => item.q.toLowerCase().includes(searchQuery.toLowerCase())
      ).length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-white/35 mt-6", children: "No questions match your search." })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsxs("div", { className: "container-wide text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif font-bold text-white mb-4", children: "Ready to get started?" }),
      /* @__PURE__ */ jsx("p", { className: "text-base text-white/70 mb-6", children: "Book a call to discuss your needs and get a personalized quote." }),
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          className: "inline-flex items-center gap-2 h-[40px] px-4 bg-[#5E6AD2] rounded-[10px] text-base font-medium text-white hover:bg-[#5E6AD2]/90 transition-all",
          children: /* @__PURE__ */ jsxs(Link, { to: "/contact/", children: [
            "Book a walkthrough",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
          ] })
        }
      )
    ] }) })
  ] });
}
const beforeIssues = [
  { icon: ClipboardCheck, label: "Cargo status tracked in spreadsheets shared via email" },
  { icon: MessageCircleQuestion, label: "Clients calling daily to ask 'where is my shipment?'" },
  { icon: FolderOpen, label: "Documents scattered across WhatsApp, email, and local folders" },
  { icon: TimerOff, label: "No visibility into which milestone was delayed and why" },
  { icon: ShieldCheck, label: "Disputes with clients over timelines and responsibilities" }
];
const outcomes = [
  { icon: MessageCircleQuestion, metric: "70%", title: "Client communication reduced", description: "Clients access the portal instead of calling or messaging for updates." },
  { icon: UploadCloud, metric: "50%", title: "Document collection time cut", description: "Clients upload required documents directly through the portal with clear requirements." },
  { icon: ShieldCheck, metric: "~0", title: "Disputes nearly eliminated", description: "Timestamped milestone tracking provides clear accountability and evidence." },
  { icon: Users, metric: "Days", title: "New staff onboarded faster", description: "Clear workflows and centralized information make training faster and more effective." }
];
const afterOutcomes = [
  { icon: CheckCircle2, label: "Single source of truth for all active cargo" },
  { icon: BadgeCheck, label: "Clients check status themselves through their portal" },
  { icon: FileCheck2, label: "All documents uploaded, validated, and linked to cargo" },
  { icon: Clock3, label: "Clear milestone tracking with timestamps and accountability" },
  { icon: Route, label: "Transparent audit trail reduces disputes to near zero" }
];
const supportingDocumentation = [
  {
    title: "Freight forwarder workflow",
    description: "How forwarding teams keep documents, milestones and client updates tied to one shipment record.",
    href: "/solutions/freight-forwarders/"
  },
  {
    title: "Clearing agent workflow",
    description: "How customs-facing teams keep approvals, handoffs and shipment context traceable.",
    href: "/solutions/clearing-agents/"
  },
  {
    title: "Bill of lading validation",
    description: "How a bill of lading is checked against invoice and packing list before status is shared.",
    href: "/resources/bill-of-lading-workflow/"
  },
  {
    title: "Commercial invoice workflow",
    description: "How invoice data is matched back to the shipment record across operations.",
    href: "/resources/commercial-invoice-workflow/"
  },
  {
    title: "Packing list workflow",
    description: "How packing-list details support cargo validation and client visibility.",
    href: "/resources/packing-list-workflow/"
  }
];
function CaseStudy() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx(ScrollAnimation, {}),
      /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: 100, children: /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6", children: "Running real cargo operations with InDataFlow" }) }),
      /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: 200, children: /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto", children: "How a clearing and forwarding agent transformed their operation from fragmented chaos to controlled transparency." }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-6 tracking-[-0.02em]", children: "The Operation" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg max-w-2xl mx-auto mb-8", children: "A mid-sized clearing and forwarding agent operating in West Africa, handling cargo from port arrival through customs clearance to final warehouse delivery. The team of 12 manages approximately 150-200 shipments per month across multiple clients." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        { icon: BriefcaseBusiness, value: "150+", label: "Shipments/month" },
        { icon: Users, value: "12", label: "Team members" },
        { icon: BadgeCheck, value: "20+", label: "Active clients" }
      ].map((stat, index) => {
        const Icon = stat.icon;
        return /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: index * 100, children: /* @__PURE__ */ jsxs("div", { className: "bg-[#0F1011] rounded-[16px] p-6 sm:p-8 border border-white/08 text-center h-full hover:border-white/18 hover:-translate-y-0.5 transition-all duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-[10px] border border-white/10 bg-white/[0.03] text-[#5E6AD2] flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl md:text-4xl font-bold text-white mb-2 tabular-nums", children: stat.value }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-white/55", children: stat.label })
        ] }) }, stat.label);
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "The Transformation" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white/70 max-w-xl mx-auto", children: "See the dramatic shift from manual chaos to streamlined operations" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-6 items-stretch", children: [
        /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs("div", { className: "bg-[#0F1011] rounded-[16px] p-7 sm:p-8 border border-white/08 h-full", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-5", children: "Before InDataFlow" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: beforeIssues.map((issue) => {
            const Icon = issue.icon;
            return /* @__PURE__ */ jsxs("li", { className: "group flex items-start gap-3 rounded-[10px] border border-white/06 bg-white/[0.015] p-3.5 transition-colors hover:border-white/14", children: [
              /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-[8px] border border-white/10 bg-white/[0.03] text-white/40 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-[15px] text-white/62 leading-[1.5]", children: issue.label })
            ] }, issue.label);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: 100, children: /* @__PURE__ */ jsxs("div", { className: "bg-[#0F1011] rounded-[16px] p-7 sm:p-8 border border-[#5E6AD2]/35 h-full shadow-lg shadow-[#5E6AD2]/5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-5", children: "After InDataFlow" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: afterOutcomes.map((outcome) => {
            const Icon = outcome.icon;
            return /* @__PURE__ */ jsxs("li", { className: "group flex items-start gap-3 rounded-[10px] border border-[#5E6AD2]/12 bg-[#5E6AD2]/[0.035] p-3.5 transition-colors hover:border-[#5E6AD2]/30", children: [
              /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-[8px] border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 text-[#5E6AD2] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-[15px] text-white/76 leading-[1.5] font-medium", children: outcome.label })
            ] }, outcome.label);
          }) })
        ] }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs("div", { className: "rounded-[16px] p-8 sm:p-12 border border-white/08 bg-[#0F1011] text-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5E6AD2]/45 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-[12px] border border-white/10 bg-white/[0.03] text-[#5E6AD2] flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(Quote, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx("blockquote", { className: "text-xl md:text-2xl font-medium text-white mb-8 leading-relaxed", children: `"We used to spend half our day answering 'where is my cargo?' calls. Now clients check the portal themselves. Our team focuses on actually moving cargo, not reporting on it."` }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-[#0F1011] border border-white/08 flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: "/galaxy-logistics-logo.png", alt: "Galaxy Logistics", className: "w-full h-full object-contain" }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-white", children: "Operations Director" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-white/50", children: "Galaxy clearing and forwarding, East Africa" })
        ] })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "Operational Outcomes" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/50 text-lg", children: "Measurable improvements within the first month" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: outcomes.map((outcome, index) => {
        const Icon = outcome.icon;
        return /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: index * 100, children: /* @__PURE__ */ jsxs("div", { className: "bg-[#0F1011] rounded-[16px] p-7 sm:p-8 border border-white/08 h-full hover:border-white/18 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute right-5 top-5 w-10 h-10 rounded-[10px] border border-white/10 bg-white/[0.03] text-[#5E6AD2] flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-[#5E6AD2] mb-2 pr-14 tabular-nums", children: outcome.metric }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2 pr-10", children: outcome.title }),
          /* @__PURE__ */ jsx("p", { className: "text-[15px] text-white/62 leading-relaxed", children: outcome.description })
        ] }) }, outcome.title);
      }) }),
      /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: 400, children: /* @__PURE__ */ jsxs("div", { className: "mt-8 p-7 sm:p-8 border border-[#5E6AD2]/30 rounded-[16px] bg-[#0F1011] text-center flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-[10px] border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 text-[#5E6AD2] flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-white/86 font-medium text-lg max-w-2xl mx-auto", children: "The operational improvements translated into faster cargo clearance, fewer disputes, and measurable cost savings within the first month." })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs(Link, { to: "/contact/", className: "block bg-[#0F1011] border border-white/08 rounded-[16px] p-8 text-center hover:border-[#5E6AD2]/50 transition-colors", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "See how this could work for you" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/50 mb-5", children: "Book a walkthrough and see how InDataFlow would run inside your operation." }),
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#5E6AD2] font-bold", children: [
        "Book a walkthrough",
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding pt-0 bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "Supporting documentation" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white/70 max-w-2xl mx-auto", children: "Operational notes and workflow documentation that explain how InDataFlow structures shipment records, document validation and cargo visibility." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 xl:grid-cols-3 gap-4", children: supportingDocumentation.map((item, index) => /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: index * 80, children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: item.href,
          className: "block rounded-[16px] border border-white/08 bg-[#0F1011] p-6 hover:border-[#5E6AD2]/35 hover:-translate-y-0.5 transition-all duration-300 h-full",
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-white/62 leading-relaxed mb-5", children: item.description }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-sm font-medium text-[#5E6AD2]", children: [
              "Read documentation",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ]
        }
      ) }, item.href)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsxs("div", { className: "container-wide text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-6 tracking-[-0.02em]", children: "Ready to transform your operation?" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg mb-8 max-w-xl mx-auto", children: "See how this would run inside your operation." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "inline-flex items-center gap-2", children: /* @__PURE__ */ jsxs(Link, { to: "/contact/", children: [
        "Book a walkthrough",
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) })
    ] }) })
  ] });
}
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "VITE_MT_API_BASE_URL": "https://cargo-api-worker-mt.indoha.workers.dev", "VITE_MT_TENANT_SUBDOMAIN": "indataflow", "VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxZ3NodWlodXVjdnFxa2N6dXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMjEyMTYsImV4cCI6MjA4Mzc5NzIxNn0.doS2S6z-HS8_NI4mGS1UPK4fFmMAPYqVRQH7erdsJXg", "VITE_SUPABASE_URL": "https://wqgshuihuucvqqkczupt.supabase.co", "VITE_WORKERS_ENABLED": "true" };
function resolveMtWorkerBaseUrl(env) {
  return String(env.VITE_MT_API_BASE_URL);
}
const ENV = {
  // Multi-tenant API worker base URL.
  // NOTE: other apps in this repo use `VITE_MT_API_BASE_URL`, while older code used `VITE_MT_WORKER_BASE_URL`.
  // Support both to avoid misconfiguration breaking login/contact forms.
  MT_WORKER_BASE_URL: resolveMtWorkerBaseUrl(__vite_import_meta_env__),
  API_BASE_URL: "https://cargo-api-worker-mt.indoha.workers.dev",
  MT_TENANT_SUBDOMAIN: "indataflow",
  INTERNAL_DASHBOARD_URL: "",
  CLIENT_DASHBOARD_URL: "",
  BILLING_HUB_URL: "",
  CONTROL_HUB_URL: "",
  MANAGER_DASHBOARD_URL: "",
  SUPABASE_URL: "https://wqgshuihuucvqqkczupt.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxZ3NodWlodXVjdnFxa2N6dXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMjEyMTYsImV4cCI6MjA4Mzc5NzIxNn0.doS2S6z-HS8_NI4mGS1UPK4fFmMAPYqVRQH7erdsJXg"
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateLead(payload) {
  var _a, _b, _c;
  if (!((_a = payload.name) == null ? void 0 : _a.trim())) return "Please enter your name.";
  if (!((_b = payload.company) == null ? void 0 : _b.trim())) return "Please enter your company.";
  if (!((_c = payload.email) == null ? void 0 : _c.trim())) return "Please enter your email.";
  if (!EMAIL_RE.test(payload.email.trim())) return "Please enter a valid email address.";
  return null;
}
async function submitLead(payload) {
  const baseUrl = ENV.MT_WORKER_BASE_URL || ENV.API_BASE_URL;
  if (!baseUrl) {
    return { ok: false, error: "Lead submission is not configured yet. Please email hello@indataflow.com instead." };
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15e3);
  try {
    const res = await fetch(`${baseUrl}/public/lead`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    if (!res.ok) {
      let serverError = "";
      try {
        const data2 = await res.json();
        serverError = data2.error || data2.detail || "";
      } catch {
      }
      if (res.status === 429) {
        return { ok: false, error: "Too many attempts. Please wait a moment and try again." };
      }
      if (res.status >= 500) {
        return { ok: false, error: "Something went wrong on our side. Please try again in a moment." };
      }
      return {
        ok: false,
        error: serverError || `We couldn't submit the form (${res.status}). Please try again.`
      };
    }
    const data = await res.json().catch(() => ({}));
    if (!(data == null ? void 0 : data.ok)) {
      return { ok: false, error: "We couldn't confirm your submission. Please try again." };
    }
    return { ok: true };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { ok: false, error: "The request timed out. Please check your connection and try again." };
    }
    return { ok: false, error: "Network error. Please check your connection and try again." };
  } finally {
    clearTimeout(timeout);
  }
}
function utmParams() {
  const params = new URLSearchParams(window.location.search);
  const pick = (key) => {
    var _a;
    return ((_a = params.get(key)) == null ? void 0 : _a.trim()) || void 0;
  };
  return {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign")
  };
}
function Contact() {
  const [formState, setFormState] = useState("idle");
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const handleSubmit = async (e) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    e.preventDefault();
    if (formState === "submitting" || formState === "success") return;
    const form = e.currentTarget;
    const payload = {
      name: ((_a = new FormData(form).get("name")) == null ? void 0 : _a.toString().trim()) ?? "",
      company: ((_b = new FormData(form).get("company")) == null ? void 0 : _b.toString().trim()) ?? "",
      country: ((_c = new FormData(form).get("country")) == null ? void 0 : _c.toString().trim()) ?? void 0,
      email: ((_d = new FormData(form).get("email")) == null ? void 0 : _d.toString().trim()) ?? "",
      phone: ((_e = new FormData(form).get("phone")) == null ? void 0 : _e.toString().trim()) || void 0,
      volume: ((_f = new FormData(form).get("volume")) == null ? void 0 : _f.toString().trim()) || void 0,
      pricing_tier: ((_g = new FormData(form).get("pricing_tier")) == null ? void 0 : _g.toString().trim()) || void 0,
      message: ((_h = new FormData(form).get("message")) == null ? void 0 : _h.toString().trim()) || void 0,
      source_page: window.location.pathname,
      ...utmParams()
    };
    const clientError = validateLead(payload);
    if (clientError) {
      setFormError(clientError);
      return;
    }
    setFormError(null);
    setFormState("submitting");
    setError(null);
    const result = await submitLead(payload);
    if (result.ok === true) {
      setFormState("success");
    } else {
      setFormState("error");
      setError(result.error);
    }
  };
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-start", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6", children: "Book a walkthrough" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl leading-[1.6] text-white/70 mb-8", children: "See how InDataFlow can transform your logistics operation. Fill out the form and we'll schedule a personalized demo." }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [
        { title: "30-minute walkthrough", desc: "See the platform in action with real workflows relevant to your operation." },
        { title: "Custom configuration preview", desc: "We'll show you how InDataFlow would look for your specific cargo types." },
        { title: "No commitment required", desc: "Just a conversation about whether InDataFlow is right for you." }
      ].map((item, index) => /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: index * 100, children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-1", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70", children: item.desc })
      ] }) }, item.title)) }),
      /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: 300, children: /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-4", children: "Other ways to reach us" }),
        /* @__PURE__ */ jsx("a", { href: "mailto:hello@indataflow.com", className: "text-white/50 hover:text-white transition-colors", children: "hello@indataflow.com" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: 200, children: /* @__PURE__ */ jsx("div", { className: "bg-[#0F1011] rounded-[16px] border border-white/08 p-8", children: formState === "success" ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", role: "status", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif font-bold text-white mb-2", children: "Thank you!" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/50", children: "We've received your request and will be in touch within 24 hours to schedule your walkthrough." })
    ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", noValidate: false, children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-white", children: "Name" }),
        /* @__PURE__ */ jsx(Input, { id: "name", name: "name", placeholder: "Your name", required: true, className: "h-12 bg-[#010102] border-white/08 text-white" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "company", className: "text-white", children: "Company" }),
        /* @__PURE__ */ jsx(Input, { id: "company", name: "company", placeholder: "Your company name", required: true, className: "h-12 bg-[#010102] border-white/08 text-white" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-white", children: "Email" }),
        /* @__PURE__ */ jsx(Input, { id: "email", name: "email", type: "email", placeholder: "you@company.com", required: true, className: "h-12 bg-[#010102] border-white/08 text-white" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "phone", className: "text-white", children: [
          "Phone ",
          /* @__PURE__ */ jsx("span", { className: "text-white/35 font-normal", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsx(Input, { id: "phone", name: "phone", type: "tel", placeholder: "+250 ...", className: "h-12 bg-[#010102] border-white/08 text-white" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "country", className: "text-white", children: "Country" }),
        /* @__PURE__ */ jsx(Input, { id: "country", name: "country", placeholder: "Where are you based?", required: true, className: "h-12 bg-[#010102] border-white/08 text-white" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "pricing_tier", className: "text-white", children: "Plan" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "pricing_tier",
            name: "pricing_tier",
            defaultValue: "starter",
            className: "h-12 w-full bg-[#010102] border border-white/08 text-white rounded-lg px-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 [&>option]:text-white [&>option]:bg-[#0F1011]",
            children: [
              /* @__PURE__ */ jsx("option", { value: "starter", children: "Starter — $250/mo" }),
              /* @__PURE__ */ jsx("option", { value: "growth", children: "Growth — $500/mo" }),
              /* @__PURE__ */ jsx("option", { value: "custom", children: "Custom" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-white/35", children: /* @__PURE__ */ jsx(Link, { to: "/pricing/", className: "underline hover:text-white", children: "See what's included in each plan" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "volume", className: "text-white", children: "Monthly cargo volume (optional)" }),
        /* @__PURE__ */ jsx(Input, { id: "volume", name: "volume", placeholder: "e.g., 100-200 shipments", className: "h-12 bg-[#010102] border-white/08 text-white" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "message", className: "text-white", children: "Message" }),
        /* @__PURE__ */ jsx(Textarea, { id: "message", name: "message", placeholder: "Tell us about your operation, cargo types, or what you'd like to see", className: "min-h-[110px] bg-[#010102] border-white/08 text-white" })
      ] }),
      formError && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-sm text-red-400", children: formError }),
      formState === "error" && error && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-sm text-red-400", children: error }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: formState === "submitting", children: formState === "submitting" ? "Submitting..." : "Book a walkthrough" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-white/35", children: "We'll respond within 24 hours. No spam, ever." })
    ] }) }) })
  ] }) }) }) }) });
}
const companyDocuments = [
  {
    slug: "terms-of-service",
    id: "terms-of-service",
    title: "Terms of Service",
    eyebrow: "Business terms",
    description: "Business terms governing access to and use of the InDataFlow platform.",
    effectiveDate: "11 August 2026",
    icon: "terms",
    summary: "Business terms governing access to and use of the InDataFlow platform, including accounts, customer data, document processing, acceptable use, third-party services, fees, intellectual property, confidentiality, data protection and service availability.",
    points: [
      "Customers retain rights in data and documents submitted to the service.",
      "Automated OCR, classification and workflow outputs require human review where accuracy matters.",
      "InDataFlow is a technology workflow service, not a customs, tax or legal adviser."
    ],
    sections: [
      { id: "agreement", heading: "1. Agreement", paragraphs: ["These Terms of Service ('Terms') govern access to and use of services provided by INDATAFLOW LTD ('InDataFlow', 'we', 'us'). By creating an account, accepting an order or service agreement, or using the service, the customer agrees to these Terms. If you use the service for an organization, you represent that you have authority to bind that organization."] },
      { id: "the-service", heading: "2. The service", paragraphs: ["InDataFlow provides software for trade-document intake, organization, document processing, workflow coordination, cargo records, operational visibility, notifications and related logistics functions. Features may evolve over time."] },
      { id: "accounts-and-authorized-users", heading: "3. Accounts and authorized users", paragraphs: ["Customers are responsible for their accounts, authorized users and credentials, and for ensuring that access is granted only to appropriate persons. Customers must promptly notify InDataFlow of suspected unauthorized access."] },
      { id: "customer-data-and-documents", heading: "4. Customer data and documents", paragraphs: ["Customers retain their rights in data and documents submitted to the service. The customer authorizes InDataFlow to host, process, transmit, reproduce and otherwise use Customer Data only as reasonably necessary to provide, secure and support the service and as otherwise permitted by the Agreement.", "The customer is responsible for ensuring that it has the rights, permissions and lawful basis necessary to provide Customer Data to InDataFlow and that its instructions and use of the service comply with applicable law."] },
      { id: "document-processing-and-accuracy", heading: "5. Document processing and accuracy", paragraphs: ["The service may use OCR, automated classification, rules, heuristics and machine-assisted processing. Outputs may contain errors or omissions. Customers and their authorized operators remain responsible for reviewing information where accuracy is operationally, legally or commercially important."] },
      { id: "no-customs-tax-or-legal-advice", heading: "6. No customs, tax or legal advice", paragraphs: ["InDataFlow is a technology and workflow service. Unless expressly agreed otherwise in writing, InDataFlow does not act as a customs authority, customs agent, tax adviser or legal adviser and does not guarantee customs clearance, regulatory approval, shipment delivery times, document acceptance, classification outcomes or other governmental decisions."] },
      { id: "acceptable-use", heading: "7. Acceptable use", bullets: ["Do not use the service unlawfully or to infringe the rights of others.", "Do not submit data or documents that you are not authorized to process or disclose.", "Do not attempt to bypass access controls, probe the service for unauthorized purposes, interfere with availability, introduce malicious code or access another customer's data.", "Do not use automated outputs as the sole basis for a consequential decision where independent review is reasonably required."] },
      { id: "third-party-services", heading: "8. Third-party services", paragraphs: ["The service may interoperate with third-party communications, infrastructure, authentication, storage and payment services. Third-party services may be governed by their own terms. InDataFlow is not responsible for third-party services outside its reasonable control."] },
      { id: "fees-billing-and-taxes", heading: "9. Fees, billing and taxes", paragraphs: ["Fees, billing periods, plan limits and payment terms are those presented at purchase or stated in an applicable order or service agreement. Unless stated otherwise, the customer is responsible for applicable taxes, duties and charges. Failure to pay amounts when due may result in suspension or termination, subject to applicable law and any agreed cure period."] },
      { id: "intellectual-property", heading: "10. Intellectual property", paragraphs: ["InDataFlow and its licensors retain all rights in the service, software, designs, documentation and related intellectual property. Except for the limited right to use the service during the subscription, no rights are transferred to the customer. Customer Data remains subject to the customer's rights."] },
      { id: "confidentiality", heading: "11. Confidentiality", paragraphs: ["Each party must use reasonable care to protect non-public confidential information received from the other and may use it only for purposes connected with the Agreement, except where disclosure is required by law or the information is lawfully public or independently obtained."] },
      { id: "data-protection-and-dpa", heading: "12. Data protection and DPA", paragraphs: ["Each party is responsible for its obligations under applicable data-protection law. Where InDataFlow processes Personal Data on behalf of the customer, the InDataFlow Data Processing Addendum forms part of the Agreement. The customer authorizes the engagement of subprocessors in accordance with that DPA."] },
      { id: "service-availability-and-changes", heading: "13. Service availability and changes", paragraphs: ["We aim to provide a reliable service but do not promise uninterrupted or error-free availability unless a separate service-level agreement expressly provides otherwise. We may modify features for security, legal, operational or product reasons while seeking to avoid materially reducing the core paid service without reasonable notice."] },
      { id: "suspension-and-termination", heading: "14. Suspension and termination", paragraphs: ["InDataFlow may suspend access where reasonably necessary to address security threats, unlawful use, material breach, non-payment or risks to the service or other customers. Either party may terminate as provided by the applicable subscription, order or service agreement."] },
      { id: "data-after-termination", heading: "15. Data after termination", paragraphs: ["Following termination, Customer Data will be handled in accordance with the Agreement and DPA. Data may be deleted or returned, subject to applicable legal retention requirements and reasonable backup cycles."] },
      { id: "disclaimers", heading: "16. Disclaimers", paragraphs: ["To the extent permitted by applicable law, the service is provided on an 'as available' basis. InDataFlow does not warranty that automated extraction, document classification, cargo matching, third-party communications or external data will always be complete, accurate or uninterrupted."] },
      { id: "limitation-of-liability", heading: "17. Limitation of liability", paragraphs: ["To the maximum extent permitted by applicable law, neither party will be liable for indirect, incidental, special, punitive or consequential damages, or for loss of profits, revenue, goodwill or anticipated savings arising from the Agreement. Any aggregate liability cap, exclusions that cannot lawfully be limited, and any exceptions for confidentiality, data protection, fraud or wilful misconduct will be governed by the applicable order, service agreement or mandatory law. Customers requiring a negotiated liability structure should enter into a written service agreement with InDataFlow."] },
      { id: "indemnity", heading: "18. Indemnity", paragraphs: ["To the extent permitted by applicable law, the customer is responsible for claims arising from Customer Data, unlawful instructions, or use of the service in violation of these Terms or applicable law, except to the extent caused by InDataFlow's own breach or unlawful conduct."] },
      { id: "governing-law-and-disputes", heading: "19. Governing law and disputes", paragraphs: ["These Terms are governed by the laws of the Republic of Rwanda, without prejudice to mandatory rights that cannot lawfully be excluded. The parties should first attempt in good faith to resolve disputes directly. Any forum, court jurisdiction or additional dispute procedure stated in an applicable signed service agreement will prevail for that agreement."] },
      { id: "changes", heading: "20. Changes", paragraphs: ["We may update these Terms from time to time. For material changes affecting an active paid service, we will provide reasonable notice where practicable or required by law. Continued use after the effective date of updated Terms constitutes acceptance where permitted by law."] },
      { id: "contact", heading: "21. Contact", paragraphs: ["INDATAFLOW Ltd", "Rwanda", "Privacy: indoha@indataflow.com", "Phone: +250 795619627"] }
    ]
  },
  {
    slug: "privacy-notice",
    id: "privacy-notice",
    title: "Privacy Notice",
    eyebrow: "Personal data",
    description: "This notice explains how InDataFlow handles personal data when providing its trade-document and logistics workflow platform.",
    effectiveDate: "11 August 2026",
    icon: "privacy",
    summary: "Explains how InDataFlow handles personal data across the website, accounts, platform, support, communications, document-intake channels and related services.",
    points: [
      "Covers account, business contact, trade, logistics, document, communication, payment, technical and security information.",
      "Describes OCR and automated document processing used for classification, extraction, matching and workflows.",
      "States that InDataFlow does not sell customer personal data."
    ],
    sections: [
      { id: "who-we-are-and-scope", heading: "1. Who we are and scope", paragraphs: ["INDATAFLOW LTD is established in Rwanda. This Privacy Notice applies to personal data processed in connection with the InDataFlow website, accounts, platform, support, communications, document-intake channels and related services. We process personal data in accordance with applicable law, including Rwanda Law No. 058/2021 relating to the protection of personal data and privacy.", "For customer-submitted operational data, the customer organization generally determines why the data is processed and InDataFlow processes it on the customer's behalf. For account administration, security, billing, support and our own legal obligations, InDataFlow may determine the purposes of processing."] },
      { id: "information-we-process", heading: "2. Information we process", bullets: ["Account and business contact information, such as names, work email addresses, phone numbers, company details, roles and user/account identifiers.", "Trade and logistics information, such as shipment references, bills of lading, container references, invoices, packing lists, cargo records, shipment contacts and related operational information.", "Documents and communications submitted through the platform, including PDFs, images, WhatsApp messages, email messages, attachments, captions and support communications.", "Information extracted or generated from documents, including OCR text, document classifications, identifiers, matching results, workflow status and validation records.", "Payment and subscription information, such as transaction references and payment-confirmation information. Payment providers may process additional payment data under their own terms.", "Technical and security information, such as IP addresses, authentication events, access logs, browser/device information and system-security records."], paragraphs: ["InDataFlow is not designed for the routine submission of sensitive personal data unrelated to trade and logistics operations. Customers should avoid submitting unnecessary sensitive information and remain responsible for ensuring that data submitted to the service may lawfully be processed."] },
      { id: "how-we-receive-information", heading: "3. How we receive information", paragraphs: ["We may receive information directly from users; from the organization that provides a user with access to InDataFlow; through documents uploaded to the platform; through authorized WhatsApp or email intake channels; from payment and authentication providers; and automatically through normal use of the service."] },
      { id: "why-we-process-information", heading: "4. Why we process information", bullets: ["To provide, operate and administer the InDataFlow service.", "To receive, organize, classify, extract and match trade documents and operational records.", "To authenticate users and manage access to customer workspaces.", "To maintain cargo/document workflows, dashboards, audit trails and operational notifications.", "To process subscriptions and confirm payments.", "To provide customer support, maintain the service and improve reliability.", "To protect the platform, investigate misuse and maintain security.", "To comply with applicable legal and regulatory obligations."] },
      { id: "legal-bases", heading: "5. Legal bases", paragraphs: ["Depending on the context, processing may be based on performance of a contract, legitimate interests such as security and service administration, compliance with legal obligations, consent where required, or processing carried out on documented instructions from a customer acting as Data Controller."] },
      { id: "ocr-and-automated-document-processing", heading: "6. OCR and automated document processing", paragraphs: ["InDataFlow uses optical character recognition (OCR), rules, heuristics and automated software to assist with document classification, information extraction, identifier detection, document-to-cargo matching and operational workflows. Automated outputs may be incomplete or inaccurate and are intended to support, not replace, appropriate human review. InDataFlow does not make governmental or customs decisions and does not guarantee customs clearance or regulatory outcomes."] },
      { id: "sharing-and-subprocessors", heading: "7. Sharing and subprocessors", paragraphs: ["Personal data may be made available to authorized users of the relevant customer organization, service providers and subprocessors used to operate the platform, payment or communications providers where applicable, professional advisers where necessary, and regulators, courts or public authorities where disclosure is required by law. InDataFlow does not sell customer personal data.", "A current public list of relevant subprocessors may be maintained on the InDataFlow website."] },
      { id: "international-storage-and-transfers", heading: "8. International storage and transfers", paragraphs: ["InDataFlow uses cloud and communications infrastructure that may involve processing or storage outside Rwanda. Where required, InDataFlow applies appropriate safeguards and seeks or maintains the authorizations required under applicable Rwandan data-protection law. Specific hosting and processing locations may depend on the services and regions configured for the platform."] },
      { id: "retention-and-deletion", heading: "9. Retention and deletion", paragraphs: ["We retain personal data only for as long as reasonably necessary for the purposes for which it is processed, to provide the service, to meet contractual or legal obligations, to resolve disputes and to maintain appropriate security and business records. Customer data is deleted or returned following termination where required by the applicable agreement, subject to lawful retention requirements and reasonable backup cycles."] },
      { id: "security", heading: "10. Security", paragraphs: ["InDataFlow uses technical and organizational safeguards designed to protect personal data, including authenticated access, role-based permissions, encrypted network transport and controls intended to reduce unauthorized access, alteration, disclosure or loss. No system can guarantee absolute security."] },
      { id: "your-rights", heading: "11. Your rights", paragraphs: ["Individuals may have rights under applicable data-protection law, including rights to request access, correction or deletion of personal data and to object to certain unlawful processing. Where InDataFlow processes data on behalf of a customer organization, we may refer the request to that organization or assist it in responding.", "Privacy requests may be sent to indoha@indataflow.com."] },
      { id: "cookies-and-website-technologies", heading: "12. Cookies and website technologies", paragraphs: ["InDataFlow may use cookies or similar technologies that are necessary for authentication, security, session management and operation of the website or platform. If optional analytics or marketing technologies are introduced, InDataFlow will provide additional information and consent controls where required."] },
      { id: "changes-to-this-notice", heading: "13. Changes to this notice", paragraphs: ["We may update this Privacy Notice to reflect changes to the service, law or our processing practices. The current version will identify its effective or last-updated date."] },
      { id: "contact", heading: "14. Contact", paragraphs: ["Data Protection Contact", "INDATAFLOW LTD", "Rwanda", "Email: indoha@indataflow.com", "Phone: +250 788 324 982"] }
    ]
  },
  {
    slug: "contact",
    id: "contact",
    title: "Contact InDataFlow",
    eyebrow: "Public contact",
    description: "Public contact information for customers, users and privacy enquiries.",
    effectiveDate: "11 August 2026",
    icon: "contact",
    summary: "Public contact information for customers, users, privacy enquiries and security reports related to InDataFlow.",
    points: ["General and customer enquiries: indoha@indataflow.com.", "Privacy requests and data-subject requests may be sent to the same contact address.", "Security concerns may be reported through the published contact until a dedicated mailbox is available."],
    sections: [
      { id: "general-and-customer-enquiries", heading: "General and customer enquiries", paragraphs: ["INDATAFLOW LTD", "Rwanda", "Email: indoha@indataflow.com", "Phone: +250 795619627"] },
      { id: "privacy-and-data-protection", heading: "Privacy and data protection", paragraphs: ["Privacy requests, questions about personal data, or data-subject requests may be sent to: indoha@indataflow.com"] },
      { id: "security-reports", heading: "Security reports", paragraphs: ["Until a dedicated security mailbox is published, suspected security issues may be reported to: indoha@indataflow.com"] },
      { id: "customer-specific-requests", heading: "Customer-specific requests", paragraphs: ["Where a request concerns data submitted by an InDataFlow customer organization, InDataFlow may need to coordinate with or refer the request to that organization."] }
    ]
  },
  {
    slug: "security",
    id: "security",
    title: "Security at InDataFlow",
    eyebrow: "Platform safeguards",
    description: "A public overview of InDataFlow's approach to protecting operational and trade data.",
    effectiveDate: "11 August 2026",
    icon: "security",
    summary: "A public overview of InDataFlow's approach to protecting operational and trade data through technical and organizational safeguards.",
    points: ["Platform access uses authenticated accounts and role-based permissions.", "Supported web services use encrypted HTTPS/TLS transport.", "Security is shared: customers should manage credentials, access and suspected compromise promptly."],
    sections: [
      { id: "overview", heading: "Overview", paragraphs: ["InDataFlow processes operational and trade documentation for logistics organizations. We use technical and organizational safeguards designed to protect information while recognizing that no internet-connected service can guarantee absolute security."] },
      { id: "access-and-authentication", heading: "Access and authentication", paragraphs: ["Platform access is restricted through authenticated accounts and role-based permissions. Customers are responsible for managing their authorized users and protecting account credentials."] },
      { id: "network-and-integration-security", heading: "Network and integration security", paragraphs: ["InDataFlow uses encrypted HTTPS/TLS transport for supported web services. External integrations may use provider authentication, signature verification or other verification mechanisms where applicable."] },
      { id: "document-processing", heading: "Document processing", paragraphs: ["Documents may pass through controlled application services for classification, OCR, extraction, matching and workflow processing. Access to operational information is intended to be limited to authorized users and services."] },
      { id: "application-and-infrastructure-safeguards", heading: "Application and infrastructure safeguards", paragraphs: ["InDataFlow applies security controls across its application and infrastructure, including authentication controls, access restrictions and protective infrastructure services. Controls are reviewed and may evolve as the platform changes."] },
      { id: "incident-response", heading: "Incident response", paragraphs: ["InDataFlow maintains procedures for investigating, containing and responding to suspected security incidents and personal-data breaches, including customer and regulatory notification where required by applicable law or contract."] },
      { id: "customer-responsibilities", heading: "Customer responsibilities", paragraphs: ["Security is shared. Customers should use strong credentials, limit access to appropriate personnel, promptly remove access for departing users, avoid submitting unnecessary sensitive information and report suspected compromise promptly."] },
      { id: "security-claims-and-certifications", heading: "Security claims and certifications", paragraphs: ["Unless expressly stated in a current written InDataFlow document, this page should not be interpreted as a claim of a particular third-party certification, penetration-test status, uninterrupted monitoring service or regulatory endorsement."] },
      { id: "report-a-security-issue", heading: "Report a security issue", paragraphs: ["Security concerns may currently be reported to indoha@indataflow.com. InDataFlow may publish a dedicated security contact as the service matures."] }
    ]
  }
];
function getCompanyDocument(slug) {
  return companyDocuments.find((document2) => document2.slug === slug);
}
const iconMap = {
  terms: Scale,
  privacy: LockKeyhole,
  contact: Mail,
  security: ShieldCheck
};
function CompanyDocumentation() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-[#5E6AD2] text-sm font-medium px-4 py-2 rounded-full border border-[#5E6AD2]/35 bg-[#5E6AD2]/10 mb-6", children: [
        /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }),
        "Company Documentation"
      ] }) }),
      /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: 100, children: /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6", children: "Legal, privacy, contact and security documents." }) }),
      /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: 200, children: /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto", children: "Read the current public InDataFlow company documents directly on the website. Each section opens a full text transcription of the original document." }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding pt-0 bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-5 lg:gap-6", children: companyDocuments.map((doc, index) => {
      const Icon = iconMap[doc.icon];
      return /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: index * 80, className: "flex", children: /* @__PURE__ */ jsxs(
        Link,
        {
          id: doc.id,
          to: "/company-documentation/" + doc.slug,
          className: "group flex w-full flex-col rounded-[16px] border border-white/[0.08] bg-[#0F1011] p-6 sm:p-7 hover:border-[#5E6AD2]/35 hover:-translate-y-0.5 transition-all duration-300 scroll-mt-28",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-5 mb-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-[12px] border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 text-[#5E6AD2] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-1 leading-[1.4]", children: doc.eyebrow }),
                  /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif font-bold text-white tracking-[-0.02em]", children: doc.title })
                ] })
              ] }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 text-white/35 group-hover:text-[#5E6AD2] group-hover:translate-x-0.5 transition-all shrink-0 mt-2" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-base text-white/70 leading-[1.7] mb-5", children: doc.summary }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-6 flex-grow", children: doc.points.map((point) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 rounded-[10px] border border-white/[0.06] bg-white/[0.015] p-3.5", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 w-1.5 h-1.5 rounded-full bg-[#5E6AD2] shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-[15px] text-white/65 leading-[1.55]", children: point })
            ] }, point)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-5 border-t border-white/[0.06]", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-white/35 font-mono leading-[1.5]", children: "Effective date" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-white/65 leading-[1.5]", children: doc.effectiveDate })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/10 px-4 py-2 text-sm font-mono text-white/75 group-hover:border-[#5E6AD2]/35 group-hover:text-white transition-colors", children: [
                "Read page",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ] })
            ] })
          ]
        }
      ) }, doc.id);
    }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding pt-0 bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "rounded-[16px] border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-7 sm:p-8 text-center max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "Need a specific document?" }),
      /* @__PURE__ */ jsx("p", { className: "text-base text-white/70 leading-[1.7] mb-6", children: "For privacy requests, customer enquiries or security reports, contact InDataFlow using the published company contact details." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:indoha@indataflow.com", children: "Contact InDataFlow" }) })
    ] }) }) })
  ] });
}
function CompanyDocumentTranscript() {
  const { slug } = useParams();
  const document2 = getCompanyDocument(slug);
  if (!document2) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsxs("div", { className: "container-wide text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6", children: "Document not found." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/company-documentation/", children: "Back to company documents" }) })
    ] }) }) });
  }
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/company-documentation/",
        className: "inline-flex items-center gap-2 text-sm font-mono text-white/45 hover:text-white transition-colors mb-8",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Company documents"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "rounded-[18px] border border-white/[0.08] bg-[#0F1011] overflow-hidden w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-8 md:p-10 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.035] to-transparent", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-[#5E6AD2] text-sm font-medium px-4 py-2 rounded-full border border-[#5E6AD2]/35 bg-[#5E6AD2]/10 mb-6", children: [
          /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }),
          document2.eyebrow
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-5", children: document2.title }),
        /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl", children: document2.description }),
        /* @__PURE__ */ jsxs("div", { className: "mt-7 grid sm:grid-cols-2 gap-3 max-w-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-[12px] border border-white/[0.06] bg-white/[0.015] p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-white/35 font-mono leading-[1.5]", children: "Effective date" }),
            /* @__PURE__ */ jsx("p", { className: "text-base text-white/75 leading-[1.5]", children: document2.effectiveDate })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-[12px] border border-white/[0.06] bg-white/[0.015] p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-white/35 font-mono leading-[1.5]", children: "Source" }),
            /* @__PURE__ */ jsx("p", { className: "text-base text-white/75 leading-[1.5]", children: "Transcribed from company PDF" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]", children: [
        /* @__PURE__ */ jsxs("aside", { className: "hidden lg:block border-r border-white/[0.06] p-6 sticky top-20 self-start max-h-[calc(100svh-5rem)] overflow-y-auto", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-white/35 uppercase tracking-[0.15em] font-mono mb-4", children: "On this page" }),
          /* @__PURE__ */ jsx("nav", { className: "space-y-2", children: document2.sections.map((section) => /* @__PURE__ */ jsx(
            "a",
            {
              href: "#" + section.id,
              className: "block text-sm text-white/45 hover:text-white leading-[1.45] transition-colors",
              children: section.heading
            },
            section.id
          )) })
        ] }),
        /* @__PURE__ */ jsx("article", { className: "p-6 sm:p-8 md:p-10 xl:p-12 space-y-7", children: document2.sections.map((section) => {
          var _a;
          return /* @__PURE__ */ jsxs("section", { id: section.id, className: "scroll-mt-28 rounded-[14px] border border-white/[0.06] bg-[#010102]/35 p-5 sm:p-6 md:p-7", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif font-bold text-white tracking-[-0.02em] mb-4", children: section.heading }),
            (_a = section.paragraphs) == null ? void 0 : _a.map((paragraph) => /* @__PURE__ */ jsx("p", { className: "text-base sm:text-[17px] lg:text-lg text-white/70 leading-[1.75] mb-4 last:mb-0", children: paragraph }, paragraph)),
            section.bullets && /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: section.bullets.map((bullet) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 rounded-[10px] border border-white/[0.06] bg-white/[0.015] p-3.5", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 w-1.5 h-1.5 rounded-full bg-[#5E6AD2] shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-base lg:text-[17px] text-white/70 leading-[1.65]", children: bullet })
            ] }, bullet)) })
          ] }, section.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3", children: companyDocuments.map((item) => /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/company-documentation/" + item.slug + "/",
        className: "rounded-[12px] border p-4 transition-colors " + (item.slug === document2.slug ? "border-[#5E6AD2]/35 bg-[#5E6AD2]/10 text-white" : "border-white/[0.08] bg-[#0F1011] text-white/55 hover:text-white hover:border-white/20"),
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium leading-[1.4]", children: item.title }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 inline-flex items-center gap-1 text-xs font-mono text-[#5E6AD2]", children: [
            "Read",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
          ] })
        ]
      },
      item.slug
    )) })
  ] }) }) }) });
}
const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);
const GENERIC_LOGIN_ERROR = "Unable to sign in right now. Please try again.";
const GENERIC_SESSION_ERROR = "We couldn't start your dashboard session. Please try again.";
const GENERIC_REDIRECT_ERROR = "We couldn't verify your dashboard destination. Please contact support.";
const DEFAULT_TRUSTED_DASHBOARD_URLS = [
  "https://client.indataflow.com",
  "https://internal.indataflow.com",
  "https://control.indataflow.com",
  "https://billing.indataflow.com",
  "https://manager.indataflow.com"
];
const INTERNAL_SESSION_STORAGE_KEY = "internal_session_id";
function getOrCreateInternalSessionId() {
  if (typeof window === "undefined") return crypto.randomUUID();
  const existing = window.sessionStorage.getItem(INTERNAL_SESSION_STORAGE_KEY);
  if (existing) return existing;
  const sessionId = crypto.randomUUID();
  window.sessionStorage.setItem(INTERNAL_SESSION_STORAGE_KEY, sessionId);
  return sessionId;
}
function allowedDashboardOrigins() {
  return [
    ENV.INTERNAL_DASHBOARD_URL,
    ENV.CLIENT_DASHBOARD_URL,
    ENV.BILLING_HUB_URL,
    ENV.CONTROL_HUB_URL,
    ENV.MANAGER_DASHBOARD_URL,
    ...DEFAULT_TRUSTED_DASHBOARD_URLS
  ].filter(Boolean).map((value) => {
    try {
      return new URL(value).origin;
    } catch {
      return null;
    }
  }).filter((value) => Boolean(value));
}
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    var _a, _b;
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!ENV.API_BASE_URL) ;
      const tenantHeader = ENV.MT_TENANT_SUBDOMAIN ? { "x-mt-tenant-subdomain": ENV.MT_TENANT_SUBDOMAIN } : {};
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      const { data } = await supabase.auth.getSession();
      const token = (_a = data.session) == null ? void 0 : _a.access_token;
      if (!token) throw new Error("Missing access token");
      let meRes = await fetch(`${ENV.API_BASE_URL}/me`, {
        headers: { authorization: `Bearer ${token}`, ...tenantHeader }
      });
      if (meRes.status === 401 || meRes.status === 403) {
        meRes = await fetch(`${ENV.API_BASE_URL}/client/me`, {
          headers: { authorization: `Bearer ${token}`, ...tenantHeader }
        });
      }
      if (!meRes.ok) {
        const detail = await meRes.text().catch(() => "");
        throw new Error(`Role lookup failed: ${meRes.status} ${detail}`);
      }
      const me = await meRes.json();
      let internalSessionId = null;
      if (me.role === "ops" || me.role === "admin") {
        internalSessionId = getOrCreateInternalSessionId();
        const claimRes = await fetch(`${ENV.API_BASE_URL}/ops/internal-session/claim`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
            ...tenantHeader
          },
          body: JSON.stringify({ session_id: internalSessionId })
        });
        if (claimRes.status === 409) {
          throw new Error("Session conflict: already signed in elsewhere.");
        }
        if (!claimRes.ok) {
          const detail = await claimRes.text().catch(() => "");
          throw new Error(`Failed to start internal session: ${claimRes.status} ${detail}`);
        }
      }
      const resolveRes = await fetch(`${ENV.API_BASE_URL}/auth/resolve-tenant`, {
        headers: { authorization: `Bearer ${token}`, ...tenantHeader }
      });
      if (!resolveRes.ok) {
        const detail = await resolveRes.text().catch(() => "");
        throw new Error(`Tenant resolve failed: ${resolveRes.status} ${detail}`);
      }
      const resolve = await resolveRes.json();
      const redirectUrl = resolve.redirect_url;
      if (!redirectUrl) {
        throw new Error("Tenant resolve missing redirect_url");
      }
      const target = new URL(redirectUrl);
      const allowedOrigins = allowedDashboardOrigins();
      if (!allowedOrigins.includes(target.origin)) {
        throw new Error(`Untrusted redirect origin: ${target.origin}`);
      }
      const basePath = target.pathname.replace(/\/+$/, "");
      target.pathname = `${basePath}/auth/callback`;
      target.hash = new URLSearchParams({
        access_token: token,
        refresh_token: ((_b = data.session) == null ? void 0 : _b.refresh_token) || "",
        ...internalSessionId ? { internal_session_id: internalSessionId } : {}
      }).toString();
      window.location.href = target.toString();
    } catch (err) {
      await supabase.auth.signOut();
      const message = String((err == null ? void 0 : err.message) ?? err);
      console.error("Login handoff failed:", message);
      if (message.includes("Session conflict")) {
        setError("You are already signed in elsewhere. Sign out from the other device or wait for the session to expire.");
      } else if (message.includes("Untrusted redirect origin") || message.includes("redirect_url")) {
        setError(GENERIC_REDIRECT_ERROR);
      } else if (message.includes("internal session") || message.includes("Tenant resolve")) {
        setError(GENERIC_SESSION_ERROR);
      } else {
        setError(GENERIC_LOGIN_ERROR);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleResetLogin = async () => {
    await supabase.auth.signOut().catch(() => void 0);
    setEmail("");
    setPassword("");
    setLoading(false);
    setError(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background flex home-theme", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden", style: { background: "var(--gradient-hero)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0", style: { background: "radial-gradient(circle at 30% 20%, hsl(var(--home-blue) / 0.18), transparent 55%)" } }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center", children: /* @__PURE__ */ jsx("img", { src: logoImage, alt: "InDataFlow", className: "h-14 w-auto brightness-0 invert home-logo" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold text-primary-foreground mb-4", children: [
          "Your cargo operations,",
          /* @__PURE__ */ jsx("br", {}),
          "under control."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-primary-foreground/80 text-lg", children: "The operating system for port-to-warehouse logistics." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-primary-foreground/60 text-sm", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " InDataFlow. All rights reserved."
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center p-8", style: { background: "var(--gradient-surface)" }, children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:hidden mb-10 text-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-flex items-center justify-center", children: /* @__PURE__ */ jsx("img", { src: logoImage, alt: "InDataFlow", className: "h-14 w-auto brightness-0 invert home-logo" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-foreground mb-2", children: "Welcome back" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Sign in to access your dashboard." })
      ] }),
      /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "you@company.com",
              className: "h-12",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "text-sm text-accent hover:underline", children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              placeholder: "••••••••",
              className: "h-12",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive text-center", children: error }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "w-full", onClick: handleResetLogin, children: "Reset login" })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", variant: "accent", size: "lg", className: "w-full", disabled: loading, children: loading ? "Signing in..." : "Sign in" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-sm text-muted-foreground hover:text-foreground", children: "← Back to home" }) })
    ] }) })
  ] });
}
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "home-theme flex min-h-screen items-center justify-center bg-background text-foreground", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-muted-foreground", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-primary underline hover:text-primary/90", children: "Return to Home" })
  ] }) });
};
function SolutionPage({
  eyebrow,
  title,
  description,
  highlights,
  painPoints,
  outcomes: outcomes2,
  featurePoints
}) {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-4", children: eyebrow }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto mb-8", children: description }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3", children: highlights.map((item) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70", children: item }, item)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding pt-0 bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx(ScrollAnimation, { children: /* @__PURE__ */ jsxs("div", { className: "rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif font-bold text-white mb-5", children: "Where operations break down" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: painPoints.map((point) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-4", children: [
          /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 rounded-full bg-white/35 shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-white/65 leading-[1.6]", children: point })
        ] }, point)) })
      ] }) }),
      /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: 120, children: /* @__PURE__ */ jsxs("div", { className: "rounded-[18px] border border-[#5E6AD2]/30 bg-[#0F1011] p-8 shadow-lg shadow-[#5E6AD2]/5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif font-bold text-white mb-5", children: "What changes with InDataFlow" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: outcomes2.map((outcome) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 rounded-[12px] border border-[#5E6AD2]/15 bg-[#5E6AD2]/[0.04] p-4", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-[#5E6AD2]" }),
          /* @__PURE__ */ jsx("span", { className: "text-white/78 leading-[1.6]", children: outcome })
        ] }, outcome)) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "One shipment record across the workflow" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white/70 max-w-2xl mx-auto", children: "InDataFlow keeps each document, milestone, approval and client update connected to the same cargo record." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2", children: featurePoints.map((point, index) => {
        const Icon = point.icon;
        return /* @__PURE__ */ jsx(ScrollAnimation, { animation: "fade-up", delay: index * 90, children: /* @__PURE__ */ jsxs("div", { className: "rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-7 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-5 flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 text-[#5E6AD2]", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: point.title }),
          /* @__PURE__ */ jsx("p", { className: "text-white/65 leading-[1.7]", children: point.description })
        ] }) }, point.title);
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl rounded-[18px] border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-transparent p-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "See the workflow in context" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-white/70 mb-8", children: "Explore the product and document workflow resources to see how cargo operations stay traceable from intake to client visibility." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/product/", children: "Explore the product" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxs(Link, { to: "/resources/", children: [
          "Read workflow resources",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] }) })
      ] })
    ] }) }) })
  ] });
}
function FreightForwarders() {
  return /* @__PURE__ */ jsx(
    SolutionPage,
    {
      eyebrow: "Solutions for freight forwarders",
      title: "Manage documents, milestones and client updates without fragmented shipment records.",
      description: "InDataFlow gives freight forwarding teams one traceable shipment record from document intake to validated cargo status, so daily operations move faster and clients stop chasing updates.",
      highlights: [
        "Shipment documents in one record",
        "Validation before status updates",
        "Client visibility without extra calls"
      ],
      painPoints: [
        "Bills of lading, invoices and packing lists arrive through different channels and have to be matched manually.",
        "Operations teams lose time checking whether each document is complete before moving cargo to the next step.",
        "Clients ask for updates before the team has verified what actually changed in the shipment."
      ],
      outcomes: [
        "Every shipment has one operational record with documents, milestones, approvals and updates connected.",
        "Validation happens inside the workflow before inaccurate cargo status reaches clients.",
        "Operations teams can answer questions from a shared timeline instead of chasing messages across tools."
      ],
      featurePoints: [
        {
          title: "Document intake that stays linked to the shipment",
          description: "Bills of lading, commercial invoices and packing lists are attached to the same cargo record as soon as they arrive from email, upload or WhatsApp.",
          icon: Boxes
        },
        {
          title: "Validation before the next operational step",
          description: "Teams review extracted fields, compare key shipment references and confirm readiness before milestones or client updates move forward.",
          icon: ScanSearch
        },
        {
          title: "Traceable client communication",
          description: "Shipment updates reflect the same validated record that operations uses internally, reducing back-and-forth calls and message confusion.",
          icon: MessageSquareShare
        },
        {
          title: "Milestones with operational context",
          description: "Port, customs, inland transport and warehouse events stay attached to supporting documents, review notes and approvals.",
          icon: Milestone
        },
        {
          title: "Document readiness at a glance",
          description: "Teams can quickly see what is missing, what is being checked and what has already been cleared for action.",
          icon: FileCheck2
        },
        {
          title: "Shared visibility for the whole forwarding team",
          description: "Ops leads, coordinators and customer-facing staff reference the same shipment timeline instead of rebuilding status from memory.",
          icon: Users
        }
      ]
    }
  );
}
function ClearingAgents() {
  return /* @__PURE__ */ jsx(
    SolutionPage,
    {
      eyebrow: "Solutions for clearing agents",
      title: "Keep shipment documents, approvals and cargo milestones connected across customs workflows.",
      description: "InDataFlow helps clearing teams keep document readiness, operational reviews and shipment visibility tied to the same cargo record from port arrival to warehouse release.",
      highlights: [
        "Document readiness before submission",
        "Approvals tied to shipment history",
        "Clear handoffs from port to warehouse"
      ],
      painPoints: [
        "Teams waste time confirming whether the latest invoice, packing list or bill of lading is the one used for the shipment.",
        "Approvals and review comments live in chat threads that are hard to reconstruct during client or customs follow-up.",
        "Port, clearance and warehouse handoffs happen without one shared operational history."
      ],
      outcomes: [
        "Shipment documents and validation steps stay attached to the same cargo record used across the clearance workflow.",
        "Approvals, status changes and follow-up notes become traceable instead of scattered across channels.",
        "Each operational handoff has the supporting context needed for faster, cleaner execution."
      ],
      featurePoints: [
        {
          title: "Document validation tied to customs readiness",
          description: "Commercial invoices, bills of lading and packing lists can be checked against one another before the team advances the shipment.",
          icon: FileSearch
        },
        {
          title: "Approvals that stay with the shipment record",
          description: "Review outcomes, operational notes and next actions remain attached to the same shipment instead of disappearing into chat history.",
          icon: BadgeCheck
        },
        {
          title: "Shared timeline from port to release",
          description: "Port arrival, customs handling, release status and warehouse delivery milestones live in one operational history.",
          icon: TimerReset
        },
        {
          title: "Operational accountability across teams",
          description: "Supervisors can see what was received, what was checked and what was approved without rebuilding the story manually.",
          icon: ShieldCheck
        },
        {
          title: "Customs and transport coordination in one place",
          description: "Clearing activities can stay connected to inland movement planning so downstream teams act on verified shipment data.",
          icon: Landmark
        },
        {
          title: "Warehouse handoff with full context",
          description: "Final release and delivery teams inherit the same validated record, documents and milestone history used earlier in the process.",
          icon: Warehouse
        }
      ]
    }
  );
}
const resources = [
  {
    title: "Bill of Lading workflow",
    description: "How freight teams validate a bill of lading against invoice and packing list before cargo status is shared.",
    href: "/resources/bill-of-lading-workflow/",
    icon: FileBox
  },
  {
    title: "Commercial invoice workflow",
    description: "How invoice data is checked, matched and tied back to one shipment record across operations.",
    href: "/resources/commercial-invoice-workflow/",
    icon: ScanText
  },
  {
    title: "Packing list workflow",
    description: "How packing list details support cargo validation, operations review and client visibility.",
    href: "/resources/packing-list-workflow/",
    icon: Files
  }
];
function Resources() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-4", children: "Resource hub" }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6", children: "Practical shipment-document workflows for freight operations." }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto", children: "These guides explain what happens after shipping documents arrive: how they are checked, connected to cargo records and used to keep operations and clients aligned." })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding pt-0 bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-3", children: resources.map((resource) => {
      const Icon = resource.icon;
      return /* @__PURE__ */ jsxs(Link, { to: resource.href, className: "rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5E6AD2]/35", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-5 flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 text-[#5E6AD2]", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif font-bold text-white mb-3 tracking-[-0.02em]", children: resource.title }),
        /* @__PURE__ */ jsx("p", { className: "text-white/65 leading-[1.7] mb-5", children: resource.description }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-sm font-medium text-[#5E6AD2]", children: [
          "Read resource",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }, resource.href);
    }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl rounded-[18px] border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-transparent p-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "See how the workflow fits your operation" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-white/70 mb-8", children: "Explore the product or book a walkthrough to see how InDataFlow turns document intake into a traceable shipment record." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/product/", children: "Explore the product" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/contact/", children: "Book a walkthrough" }) })
      ] })
    ] }) }) })
  ] });
}
function ResourceArticle({ eyebrow, title, description, steps: steps2, sections }) {
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("article", { children: [
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-4", children: eyebrow }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto", children: description })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding pt-0 bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl rounded-[18px] border border-[#5E6AD2]/25 bg-[#0F1011] p-8 shadow-lg shadow-[#5E6AD2]/5", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm uppercase tracking-[0.15em] font-mono text-[#5E6AD2] mb-5", children: "Operational flow" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-4", children: steps2.map((step) => /* @__PURE__ */ jsx("div", { className: "rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-4 text-white/78 leading-[1.6]", children: step }, step)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl space-y-5", children: sections.map((section) => /* @__PURE__ */ jsxs("section", { className: "rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-7 sm:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: section.title }),
      /* @__PURE__ */ jsx("p", { className: "text-white/68 leading-[1.8] text-[17px]", children: section.body })
    ] }, section.title)) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-padding bg-[#010102]", children: /* @__PURE__ */ jsx("div", { className: "container-wide", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl rounded-[18px] border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-transparent p-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif font-bold text-white mb-4 tracking-[-0.02em]", children: "Turn document intake into a traceable cargo record" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-white/70 mb-8", children: "InDataFlow connects shipment documents, validation, cargo events, approvals and client updates in one operational workflow." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/product/", children: "Explore the product" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxs(Link, { to: "/contact/", children: [
          "Book a walkthrough",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] }) })
      ] })
    ] }) }) })
  ] }) });
}
function BillOfLadingWorkflow() {
  return /* @__PURE__ */ jsx(
    ResourceArticle,
    {
      eyebrow: "Shipment document workflow",
      title: "How freight teams validate a bill of lading against invoice and packing list",
      description: "A bill of lading matters operationally when it is tied to the same shipment record as the commercial invoice, packing list and milestone history. This is how teams keep that process traceable.",
      steps: [
        "Bill of lading received",
        "Shipment references extracted",
        "Invoice and packing list matched",
        "Operations review completed"
      ],
      sections: [
        {
          title: "Start with one shipment record",
          body: "The bill of lading should not live as an isolated PDF in email. Freight teams move faster when the document is attached to the same shipment record that already holds the container reference, client, route and current milestone. That removes guesswork before validation even begins."
        },
        {
          title: "Check the references that drive operations",
          body: "Teams usually need to confirm core references first: shipper or consignee details, bill of lading number, container identifiers, ports and shipment dates. Those details are not useful on their own. They become useful when compared against the invoice and packing list already linked to the same record."
        },
        {
          title: "Match document sets before updating status",
          body: "A bill of lading can look complete while the commercial invoice or packing list still contains a mismatch. Good operations practice is to validate the full document set before the shipment is treated as cleared for the next step. That reduces client confusion and internal rework later in the process."
        },
        {
          title: "Keep the review outcome visible",
          body: "Once the bill of lading has been checked, the result should stay attached to the shipment: validated, needs follow-up or waiting on another document. That review outcome gives operations teams and client-facing staff one reliable version of the truth when they communicate the next cargo update."
        }
      ]
    }
  );
}
function CommercialInvoiceWorkflow() {
  return /* @__PURE__ */ jsx(
    ResourceArticle,
    {
      eyebrow: "Shipment document workflow",
      title: "How freight teams validate a commercial invoice inside shipment operations",
      description: "Commercial invoices shape how a shipment is understood operationally. The workflow becomes stronger when invoice data is checked against the rest of the shipment record instead of being processed in isolation.",
      steps: [
        "Invoice received",
        "Key fields extracted",
        "Shipment and cargo references matched",
        "Validation outcome recorded"
      ],
      sections: [
        {
          title: "Treat invoice data as part of the shipment history",
          body: "Commercial invoice details should enter the same operational record used for cargo status, document readiness and client updates. When invoice data sits outside that workflow, teams end up re-entering information or checking the same shipment twice."
        },
        {
          title: "Validate the fields that affect downstream work",
          body: "Amounts, parties, shipment references, ports and item descriptions matter because they influence how the shipment is reviewed and communicated. Teams should confirm those fields against the cargo record and supporting documents before they advance the shipment to the next operational step."
        },
        {
          title: "Use the invoice to cross-check the document set",
          body: "The invoice becomes more valuable when it is used to confirm the logic of the full shipment file. If references on the bill of lading, packing list and invoice do not align, the discrepancy should be resolved before client status or internal approvals change."
        },
        {
          title: "Make the decision traceable",
          body: "Operations teams benefit when each review produces an explicit result: validated, follow-up required or blocked pending another document. That decision needs to remain attached to the shipment record so later staff members do not repeat work or communicate uncertain information."
        }
      ]
    }
  );
}
function PackingListWorkflow() {
  return /* @__PURE__ */ jsx(
    ResourceArticle,
    {
      eyebrow: "Shipment document workflow",
      title: "How freight teams use packing lists to verify cargo records",
      description: "Packing lists help operations teams confirm what is moving, how it is grouped and whether the rest of the shipment file stays consistent. That value shows up when the packing list is connected to one shipment record and review workflow.",
      steps: [
        "Packing list received",
        "Shipment contents checked",
        "Invoice and bill of lading compared",
        "Client-ready status confirmed"
      ],
      sections: [
        {
          title: "Keep cargo detail connected to the shipment",
          body: "A packing list provides structure around what the cargo contains and how it is organized. Operations teams work more reliably when those details are stored against the same shipment record used for milestones, validation outcomes and document history."
        },
        {
          title: "Use the packing list to support consistency checks",
          body: "Teams can compare item-level or package-level details against the invoice and bill of lading to confirm the shipment file makes sense as a whole. This is often where document mismatches surface before they create bigger delays in the workflow."
        },
        {
          title: "Tie the review to operational readiness",
          body: "The review is not only about whether a packing list exists. It is about whether the information is complete enough for the next stage of handling, whether additional follow-up is needed and whether the client-facing status should move forward."
        },
        {
          title: "Preserve the outcome for later handoffs",
          body: "Once checked, the packing list should remain part of the traceable shipment record. That allows warehouse, transport or customer-facing teams to inherit the same validated context instead of reopening the document trail from scratch."
        }
      ]
    }
  );
}
function SiteRoutes() {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route$1, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/product", element: /* @__PURE__ */ jsx(Product, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/how-it-works", element: /* @__PURE__ */ jsx(HowItWorks, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/pricing", element: /* @__PURE__ */ jsx(Pricing, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/case-study", element: /* @__PURE__ */ jsx(CaseStudy, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/contact", element: /* @__PURE__ */ jsx(Contact, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/company-documentation", element: /* @__PURE__ */ jsx(CompanyDocumentation, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/company-documentation/:slug", element: /* @__PURE__ */ jsx(CompanyDocumentTranscript, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/solutions/freight-forwarders", element: /* @__PURE__ */ jsx(FreightForwarders, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/solutions/clearing-agents", element: /* @__PURE__ */ jsx(ClearingAgents, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/resources", element: /* @__PURE__ */ jsx(Resources, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/resources/bill-of-lading-workflow", element: /* @__PURE__ */ jsx(BillOfLadingWorkflow, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/resources/commercial-invoice-workflow", element: /* @__PURE__ */ jsx(CommercialInvoiceWorkflow, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/resources/packing-list-workflow", element: /* @__PURE__ */ jsx(PackingListWorkflow, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "/login", element: /* @__PURE__ */ jsx(Login, {}) }),
    /* @__PURE__ */ jsx(Route$1, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] });
}
const siteName = "InDataFlow";
const siteUrl = "https://indataflow.com";
const defaultImage = `${siteUrl}/favicon.png`;
const defaultTitle = "InDataFlow | Cargo Operations Platform for Freight & Logistics";
const defaultDescription = "Connect shipping documents, validation, cargo events, approvals and client updates in one traceable shipment record. Built for freight forwarders, clearing agents and logistics teams operating across East Africa.";
const canonicalStatement = "InDataFlow is a cargo operations platform that connects shipment documents, validation, events, approvals and client updates into one traceable shipment record.";
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  industry: "Logistics Technology",
  email: "hello@indataflow.com"
};
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl
};
function softwareApplicationSchema(pageName, description, path) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${siteName} ${pageName}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description,
    url: `${siteUrl}${path}`
  };
}
function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`
    }))
  };
}
function articleSchema(headline, description, path) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: `${siteUrl}${path}`,
    author: {
      "@type": "Organization",
      name: siteName
    },
    publisher: {
      "@type": "Organization",
      name: siteName
    }
  };
}
const staticPages = [
  {
    pattern: "/",
    config: {
      title: defaultTitle,
      description: defaultDescription,
      canonicalPath: "/",
      type: "website",
      jsonLd: [organizationSchema, websiteSchema, {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: siteName,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: canonicalStatement,
        url: siteUrl
      }]
    }
  },
  {
    pattern: "/product/",
    config: {
      title: "Product | InDataFlow",
      description: "See how InDataFlow connects shipment documents, validation, cargo events and client updates into one traceable shipment record for freight operations.",
      canonicalPath: "/product/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Product", canonicalStatement, "/product/")]
    }
  },
  {
    pattern: "/how-it-works/",
    config: {
      title: "How InDataFlow Works | InDataFlow",
      description: "Follow the shipment workflow from document intake to validation, cargo milestones, approvals and client visibility inside InDataFlow.",
      canonicalPath: "/how-it-works/",
      jsonLd: [organizationSchema, softwareApplicationSchema("How It Works", canonicalStatement, "/how-it-works/")]
    }
  },
  {
    pattern: "/pricing/",
    config: {
      title: "Pricing | InDataFlow",
      description: "Volume-based pricing for freight forwarders, clearing agents and logistics teams using InDataFlow to run cargo operations and document workflows.",
      canonicalPath: "/pricing/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Pricing", canonicalStatement, "/pricing/")]
    }
  },
  {
    pattern: "/case-study/",
    config: {
      title: "Case Study | InDataFlow",
      description: "See how a freight operation reduced manual follow-up, improved document control and gave clients clearer shipment visibility with InDataFlow.",
      canonicalPath: "/case-study/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Case Study", canonicalStatement, "/case-study/")]
    }
  },
  {
    pattern: "/contact/",
    config: {
      title: "Book a Walkthrough | InDataFlow",
      description: "Book a walkthrough to see how InDataFlow fits your cargo operation, document intake flow and client visibility requirements.",
      canonicalPath: "/contact/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Contact", canonicalStatement, "/contact/")]
    }
  },
  {
    pattern: "/company-documentation/",
    config: {
      title: "Company Documentation | InDataFlow",
      description: "Read public InDataFlow legal, privacy, contact and security documents in fully indexable website pages.",
      canonicalPath: "/company-documentation/",
      jsonLd: [organizationSchema, breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Company Documentation", path: "/company-documentation/" }
      ])]
    }
  },
  {
    pattern: "/solutions/freight-forwarders/",
    config: {
      title: "For Freight Forwarders | InDataFlow",
      description: "Centralize shipment documents, validation, milestones and client updates in one cargo record built for freight forwarding teams.",
      canonicalPath: "/solutions/freight-forwarders/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Freight Forwarders", canonicalStatement, "/solutions/freight-forwarders/"), breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions/freight-forwarders/" },
        { name: "Freight Forwarders", path: "/solutions/freight-forwarders/" }
      ])]
    }
  },
  {
    pattern: "/solutions/clearing-agents/",
    config: {
      title: "For Clearing Agents | InDataFlow",
      description: "Keep shipment documents, approvals, cargo milestones and operational accountability connected across customs and warehouse handoffs.",
      canonicalPath: "/solutions/clearing-agents/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Clearing Agents", canonicalStatement, "/solutions/clearing-agents/"), breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions/clearing-agents/" },
        { name: "Clearing Agents", path: "/solutions/clearing-agents/" }
      ])]
    }
  },
  {
    pattern: "/resources/",
    config: {
      title: "Resources | InDataFlow",
      description: "Operational guides for bills of lading, commercial invoices, packing lists and shipment document workflows in freight logistics.",
      canonicalPath: "/resources/",
      jsonLd: [organizationSchema, breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources/" }
      ])]
    }
  },
  {
    pattern: "/resources/bill-of-lading-workflow/",
    config: {
      title: "Bill of Lading Workflow | InDataFlow",
      description: "Learn how freight teams validate a bill of lading against a commercial invoice and packing list before cargo status is shared with clients.",
      canonicalPath: "/resources/bill-of-lading-workflow/",
      type: "article",
      jsonLd: [organizationSchema, articleSchema("How freight teams validate a bill of lading against invoice and packing list", "Operational bill of lading workflow for freight teams.", "/resources/bill-of-lading-workflow/"), breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources/" },
        { name: "Bill of Lading Workflow", path: "/resources/bill-of-lading-workflow/" }
      ])]
    }
  },
  {
    pattern: "/resources/commercial-invoice-workflow/",
    config: {
      title: "Commercial Invoice Workflow | InDataFlow",
      description: "See how freight teams check commercial invoice data, connect it to shipment records and keep approvals traceable across operations.",
      canonicalPath: "/resources/commercial-invoice-workflow/",
      type: "article",
      jsonLd: [organizationSchema, articleSchema("How freight teams validate a commercial invoice inside shipment operations", "Operational commercial invoice workflow for freight teams.", "/resources/commercial-invoice-workflow/"), breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources/" },
        { name: "Commercial Invoice Workflow", path: "/resources/commercial-invoice-workflow/" }
      ])]
    }
  },
  {
    pattern: "/resources/packing-list-workflow/",
    config: {
      title: "Packing List Workflow | InDataFlow",
      description: "Understand how packing list details support cargo validation, operational review and client visibility across freight teams.",
      canonicalPath: "/resources/packing-list-workflow/",
      type: "article",
      jsonLd: [organizationSchema, articleSchema("How freight teams use packing lists to verify cargo records", "Operational packing list workflow for freight teams.", "/resources/packing-list-workflow/"), breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources/" },
        { name: "Packing List Workflow", path: "/resources/packing-list-workflow/" }
      ])]
    }
  },
  {
    pattern: "/login/",
    config: {
      title: "Log In | InDataFlow",
      description: "Access InDataFlow client and operations portals.",
      canonicalPath: "/login/",
      robots: "noindex, nofollow",
      jsonLd: [organizationSchema]
    }
  }
];
const documentRoutes = companyDocuments.map((document2) => ({
  pattern: `/company-documentation/${document2.slug}/`,
  config: {
    title: `${document2.title} | InDataFlow`,
    description: document2.description,
    canonicalPath: `/company-documentation/${document2.slug}/`,
    jsonLd: [organizationSchema, articleSchema(document2.title, document2.description, `/company-documentation/${document2.slug}/`), breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Company Documentation", path: "/company-documentation/" },
      { name: document2.title, path: `/company-documentation/${document2.slug}/` }
    ])]
  }
}));
const prerenderRoutes = [
  "/",
  "/product/",
  "/how-it-works/",
  "/pricing/",
  "/case-study/",
  "/contact/",
  "/company-documentation/",
  ...companyDocuments.map((document2) => `/company-documentation/${document2.slug}/`),
  "/solutions/freight-forwarders/",
  "/solutions/clearing-agents/",
  "/resources/",
  "/resources/bill-of-lading-workflow/",
  "/resources/commercial-invoice-workflow/",
  "/resources/packing-list-workflow/",
  "/login/",
  "/404"
];
const sitemapRoutes = prerenderRoutes.filter((route) => route !== "/login/" && route !== "/404");
function resolveSeo(urlOrPath) {
  const pathname = getPathname(urlOrPath);
  const matched = [...staticPages, ...documentRoutes].find(
    (page) => Boolean(matchPath({ path: page.pattern, end: true }, pathname))
  );
  if (!matched) {
    return {
      title: "Page Not Found | InDataFlow",
      description: defaultDescription,
      canonicalPath: pathname,
      robots: "noindex, nofollow",
      jsonLd: [organizationSchema],
      type: "website",
      url: `${siteUrl}${normalizePath(pathname)}`
    };
  }
  return {
    type: matched.config.type ?? "website",
    robots: matched.config.robots ?? "index, follow",
    ...matched.config,
    url: `${siteUrl}${matched.config.canonicalPath}`
  };
}
function renderSeoHead(seo) {
  var _a;
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="author" content="${siteName}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots ?? "index, follow")}" />`,
    `<link rel="canonical" href="${escapeHtml(seo.url)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:type" content="${escapeHtml(seo.type ?? "website")}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.url)}" />`,
    `<meta property="og:site_name" content="${siteName}" />`,
    `<meta property="og:image" content="${escapeHtml(defaultImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(defaultImage)}" />`
  ];
  if ((_a = seo.jsonLd) == null ? void 0 : _a.length) {
    tags.push(`<script id="seo-structured-data" type="application/ld+json">${escapeJson(JSON.stringify(seo.jsonLd.length === 1 ? seo.jsonLd[0] : seo.jsonLd))}<\/script>`);
  }
  return tags.join("\n    ");
}
function getPathname(urlOrPath) {
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
    return normalizePath(new URL(urlOrPath).pathname);
  }
  return normalizePath(urlOrPath.split("?")[0] || "/");
}
function normalizePath(pathname) {
  if (!pathname || pathname === "") return "/";
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
function escapeJson(value) {
  return value.replaceAll("<", "\\u003c");
}
function render(url) {
  const queryClient = new QueryClient();
  const seo = resolveSeo(url);
  const appHtml = renderToString(
    /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(SiteRoutes, {}) }) }) })
  );
  return {
    appHtml,
    headHtml: renderSeoHead(seo)
  };
}
export {
  prerenderRoutes,
  render,
  sitemapRoutes
};
