"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** wie stark der Button dem Cursor folgt (0–1) */
  strength?: number;
  external?: boolean;
};

/**
 * "Magnetischer" CTA-Button: bewegt sich leicht in Richtung Mauszeiger.
 * Nur Maus, bei prefers-reduced-motion deaktiviert. Bewegung via transform.
 */
export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.3,
  external = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  const extraProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link
      href={href}
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      {...extraProps}
    >
      {children}
    </Link>
  );
}
