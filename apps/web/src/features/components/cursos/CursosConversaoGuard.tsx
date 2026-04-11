"use client";

import * as React from "react";
import { CURSOS_CONVERSAO_KIWIFY_URL } from "@/constants/site-data";

type Props = {
  href?: string;
  children: React.ReactNode;
};

export function CursosConversaoGuard({ href, children }: Props) {
  const finalHref = href ?? CURSOS_CONVERSAO_KIWIFY_URL;

  const targetUrl = React.useCallback(() => {
    try {
      const destination = new URL(finalHref);
      const current = new URL(window.location.href);

      current.searchParams.forEach((value, key) => {
        if (!destination.searchParams.has(key)) {
          destination.searchParams.set(key, value);
        }
      });

      return destination.toString();
    } catch {
      return finalHref;
    }
  }, [finalHref]);

  const redirect = React.useCallback(() => {
    window.location.assign(targetUrl());
  }, [targetUrl]);

  const onClickCapture = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;

      const target = e.target as HTMLElement | null;

      if (target?.closest?.('[data-allow-interaction="true"]')) return;

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      e.stopPropagation();
      redirect();
    },
    [redirect]
  );

  const onKeyDownCapture = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;

      const target = e.target as HTMLElement | null;
      if (target?.closest?.('[data-allow-interaction="true"]')) return;

      e.preventDefault();
      e.stopPropagation();
      redirect();
    },
    [redirect]
  );

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Ir para a página de compra do curso"
      className="cursor-pointer"
      onClickCapture={onClickCapture}
      onKeyDownCapture={onKeyDownCapture}
    >
      {children}
    </div>
  );
}
