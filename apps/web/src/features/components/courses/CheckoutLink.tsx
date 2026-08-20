"use client";

import * as React from "react";

import { mergeQueryParamsPreservingDestination } from "@/lib/marketing/merge-params";

type Props = Omit<React.ComponentProps<"a">, "href"> & {
  href: string;
};

/**
 * Link de checkout que repassa os parâmetros de tráfego da URL atual
 * (utm_*, fbclid, gclid) para o destino na Kiwify.
 *
 * Sem isso o cliente não consegue saber qual anúncio ou canal gerou cada venda,
 * o que inviabiliza medir a própria reformulação comercial.
 *
 * O href é reescrito depois da montagem, e não durante a renderização, por dois
 * motivos: o HTML servido já sai com a URL válida (funciona sem JavaScript e é
 * indexável), e não há divergência entre servidor e cliente na hidratação.
 */
export function CheckoutLink({ href, children, ...props }: Props) {
  const anchorRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    anchor.href = mergeQueryParamsPreservingDestination(href, window.location.href);
  }, [href]);

  return (
    <a
      ref={anchorRef}
      href={href}
      target="_blank"
      // Apenas noopener: é ele que fecha o vetor de segurança do target="_blank".
      // noreferrer removeria o Referer e cegaria a atribuição de venda na Kiwify.
      rel="noopener"
      data-allow-interaction="true"
      {...props}
    >
      {children}
    </a>
  );
}
