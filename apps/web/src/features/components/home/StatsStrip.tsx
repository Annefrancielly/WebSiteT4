import { PROVAS_SOCIAIS } from "@/constants/site-data";
import { Counter } from "@/features/components/shared/Counter";
import { Reveal } from "@/features/components/shared/Reveal";

/**
 * Faixa de prova social, logo abaixo do Hero.
 *
 * Posição escolhida a dedo: o Hero acabou de fazer uma promessa grande — três
 * meses no lugar de três anos. A primeira reação de qualquer visitante a uma
 * promessa grande é desconfiar. A faixa responde antes de a dúvida virar
 * abandono, e é por isso que ela precisa ser a PRIMEIRA coisa depois do Hero,
 * e não uma seção qualquer no meio da página.
 *
 * É uma faixa fina de propósito. Números merecem destaque, não uma seção
 * inteira — quem chegou até aqui quer continuar descendo, não parar para ler.
 *
 * Server Component. Os contadores dentro dela é que são client, e cada um pesa
 * quase nada.
 */
export function StatsStrip() {
  return (
    <section
      aria-label="Números da T4 Surf"
      className="border-y border-white/10 bg-brand-ink-soft py-8 md:py-9"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 md:gap-5">
          {PROVAS_SOCIAIS.map((prova, indice) => (
            <Reveal key={prova.rotulo} index={indice}>
              <p className="font-display text-4xl uppercase leading-none tracking-tight text-white md:text-5xl">
                <Counter
                  to={prova.valor}
                  decimals={prova.casasDecimais}
                  /*
                    O sufixo vai por prop, e não como texto ao lado, para que ele
                    entre no rótulo lido pelo leitor de tela junto com o número.
                    "500" e "500+" não significam a mesma coisa.
                  */
                  suffix={prova.sufixo}
                />
              </p>

              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.13em] text-brand-ink-muted">
                {prova.rotulo}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
