"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Logo from "/SKILLIA_RECURSOS/LOGOTIP_ISOTIP/LOGOTIP/SVG/PER FONS BLANC.svg";
import { motion } from "framer-motion";
import type { Navbar01NavLink, Navbar01Props } from "./types";

// Hamburger icon component
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// Default navigation links
const defaultNavigationLinks: Navbar01NavLink[] = [
  { href: "#inicio", label: "Inicio", active: true },
  { href: "#casos-de-exito", label: "Casos de Éxito" },
  { href: "#about-me", label: "Mi Experiencia" },
  { href: "#productos", label: "Recursos Formativos" },
  { href: "#contacto", label: "Contacto" },
];

export const Navbar01 = React.forwardRef<HTMLElement, Navbar01Props>(
  (
    {
      className,
      logo = <img src={Logo} className="w-10 h-10" alt="Skillia" />,
      navigationLinks = defaultNavigationLinks,
      signInText = "Iniciar Sesión",
      signInHref = "/under-improvement",
      ctaText = "Regístrate",
      ctaHref = "/under-improvement",
      onSignInClick,
      onCtaClick,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active route
    const isPersonalRoute = location.pathname.startsWith("/personal");
    const isEntitiesRoute = location.pathname.startsWith("/entities");

    // Smooth scrolling navigation handler
    const handleNavClick = async (
      e: React.MouseEvent<HTMLButtonElement>,
      href: string
    ) => {
      e.preventDefault();

      // Close mobile menu if open
      setIsMobileMenuOpen(false);

      // Special handling for booking/contact
      if (href === "#contacto") {
        window.open(
          "mailto:info@skill-ia.com",
          "_blank"
        );
        return;
      }

      // Extract the target ID from href (remove the #)
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Calculate offset for fixed navbar (96px = h-24)
        const navbarHeight = 64;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        // Custom smooth scrolling with adjustable speed
        // The native 'smooth' behavior doesn't allow speed control
        // So we implement our own smooth scrolling animation
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 500; // Adjust this value to control speed (ms)
        let startTime: number | null = null;

        function animation(currentTime: number) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);

          // Easing function for smooth animation (ease-in-out)
          const ease =
            progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          window.scrollTo(0, startPosition + distance * ease);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }

        requestAnimationFrame(animation);
      }
    };

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 1024); // 1024px is lg breakpoint
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    // Prevent body scroll when mobile menu is open (Safari-compatible)
    useEffect(() => {
      if (isMobileMenuOpen && isMobile) {
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';

        return () => {
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          document.body.style.overflow = '';
          window.scrollTo(0, scrollY);
        };
      }
    }, [isMobileMenuOpen, isMobile]);

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <header
        ref={combinedRef}
        className={cn(
          "fixed top-0 z-50 w-full px-4 md:px-6 [&_*]:no-underline max-lg:bg-background",
          className
        )}
        {...props}>
        <motion.div
          initial={{
            opacity: 0,
            y: -50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.25, 0.4, 0.25, 1],
          }}>
          {/* Persona/Entidad selector */}
          <div className="flex items-center justify-center gap-2 mt-3 max-lg:mb-2">
            <Button
              variant={isPersonalRoute ? "default-selected" : "default"}
              onClick={() => navigate("/personal/")}>
              Persona
            </Button>
            <Button
              variant={isEntitiesRoute ? "default-selected" : "default"}
              onClick={() => navigate("/entities/")}>
              Entidad
            </Button>
          </div>
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between lg:px-[clamp(1rem,3vw,1.5rem)] gap-2 lg:gap-0 lg:pt-0 relative">
            {/* Mobile: Logo left, Sign Up + Hamburger right (Holded style) */}
            {isMobile ? (
              <div className="w-full flex items-center justify-between py-[clamp(0.5rem,1vw,0.75rem)] px-0.5 overflow-hidden">
                {/* Logo - left */}
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => (window.location.href = "/")}
                  style={{ transition: "all 0.3s ease" }}>
                  <img src={Logo} className="w-auto h-10" alt="Skillia" />
                </div>

                {/* Right side: Sign Up button + Hamburger menu */}
                <div className="flex items-center gap-3">
                  {/* Sign Up button - only visible on Personal route */}
                  {isPersonalRoute && (
                    <Button
                      onClick={() => navigate(ctaHref)}
                      variant="outline"
                      className="h-9 px-4 text-sm">
                      {ctaText}
                    </Button>
                  )}

                  {/* Hamburger menu trigger */}
                  <Popover
                    open={isMobileMenuOpen}
                    onOpenChange={setIsMobileMenuOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        className="group h-10 w-10 p-0"
                        variant="subtle">
                        <HamburgerIcon className="w-6 h-6" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      side="bottom"
                      sideOffset={8}
                      className="w-screen h-[100dvh] p-4 !bg-[var(--background)] border-none shadow-none text-primary flex flex-col items-start justify-start">
                      <div className="w-full flex flex-col">
                        <NavigationMenu className="w-auto">
                          <NavigationMenuList className="flex-col items-start gap-2">
                            {navigationLinks.map((link, index) => (
                              <NavigationMenuItem key={index} className="w-auto">
                                <Button
                                  onClick={(e) => handleNavClick(e, link.href)}
                                  variant="subtle"
                                  className="justify-start text-left w-auto h-auto py-3 px-4">
                                  {link.label}
                                </Button>
                              </NavigationMenuItem>
                            ))}
                          </NavigationMenuList>
                        </NavigationMenu>

                        {/* CTA Buttons - only visible on Personal route */}
                        {isPersonalRoute && (
                          <div className="flex flex-col gap-3 mt-6 w-full">
                            <Button
                              onClick={() => navigate(ctaHref)}
                              variant="navbar-signup"
                              className="w-full">
                              Regístrate
                            </Button>
                            <Button
                              onClick={() => navigate(signInHref)}
                              variant="navbar-login"
                              className="w-full">
                              Inicia Sesión
                            </Button>
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ) : (
              /* Desktop: Original layout */
              <>
                {/* Left side - Logo */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center py-[clamp(0.5rem,1vw,0.75rem)] px-[clamp(1rem,1.5vw,1rem)] bg-background/80 supports-[backdrop-filter]:bg-transparent supports-[backdrop-filter]:backdrop-blur-sm lg:rounded-full overflow-hidden">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => (window.location.href = "/")}
                      style={{ transition: "all 0.3s ease" }}>
                      <img src={Logo} className="w-auto h-12" alt="Skillia" />
                    </div>
                  </div>
                </div>

                {/* Center - Navigation menu with CTA Buttons */}
                <div className="py-[clamp(0.25rem,1vw,0.5rem)] px-[clamp(0.75rem,2vw,1rem)] items-end bg-background/80 supports-[backdrop-filter]:bg-transparent supports-[backdrop-filter]:backdrop-blur-sm lg:rounded-full overflow-hidden z-150">
                  <NavigationMenu className="flex">
                    <NavigationMenuList className="gap-[clamp(0.25rem,0.5vw,0.5rem)]">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index}>
                          <Button
                            onClick={(e) => handleNavClick(e, link.href)}
                            variant="subtle"
                            className="whitespace-nowrap">
                            {link.label}
                          </Button>
                        </NavigationMenuItem>
                      ))}
                      {/* CTA Buttons inline (only on Personal route) */}
                      {isPersonalRoute && (
                        <>
                          <NavigationMenuItem>
                            <Button
                              onClick={() => navigate(signInHref)}
                              variant="navbar-login"
                              className="whitespace-nowrap">
                              Inicia Sesión
                            </Button>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <Button
                              onClick={() => navigate(ctaHref)}
                              variant="navbar-signup"
                              className="whitespace-nowrap">
                              Regístrate
                            </Button>
                          </NavigationMenuItem>
                        </>
                      )}
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </header>
    );
  }
);

Navbar01.displayName = "Navbar01";

export { Logo, HamburgerIcon };
