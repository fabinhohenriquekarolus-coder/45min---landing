import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ClipboardList,
  Lock,
  Play,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedBackground } from "@/components/landing/AnimatedBackground";
import { goToCheckout, track, SITE_URL } from "@/lib/tracking";
import heroMockup from "@/assets/hero-mockup.webp";
import ogImage from "@/assets/og-image.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Do Zero ao Primeiro Produto com IA — R$37" },
      {
        name: "description",
        content:
          "Crie seu primeiro produto digital em 45 minutos usando IA, mesmo sem experiência, sem conhecimento técnico e sem ter uma ideia pronta.",
      },
      { property: "og:title", content: "Do Zero ao Primeiro Produto com IA — R$37" },
      {
        property: "og:description",
        content:
          "Método Produto em 45 Minutos: use IA para encontrar uma oportunidade e estruturar sua primeira oferta.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}${ogImage}` },
      { property: "og:image:width", content: "1024" },
      { property: "og:image:height", content: "1024" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}${ogImage}` },
    ],
  }),
  component: Landing,
});

function CTA({
  origem,
  final = false,
  className = "",
}: {
  origem: string;
  final?: boolean;
  className?: string;
}) {
  const label = final
    ? "SIM, QUERO COMEÇAR — R$37"
    : "QUERO CRIAR MEU PRODUTO — R$37";
  return (
    <button
      type="button"
      onClick={() => goToCheckout(origem)}
      className={`inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-7 py-4 text-sm font-bold tracking-wide text-primary-foreground transition-transform duration-200 glow-gold hover:scale-[1.02] active:scale-[0.99] sm:text-base ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4 shrink-0" />
    </button>
  );
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

const dores = [
  {
    title: "\"Não sei o que vender.\"",
    text: "Você tem vontade de começar, mas não consegue escolher uma direção.",
  },
  {
    title: "\"Já tentei outras coisas.\"",
    text: "Mais um conteúdo, mais uma promessa, mais um projeto abandonado.",
  },
  {
    title: "\"Não tenho experiência.\"",
    text: "Você acredita que precisa ser especialista para criar alguma coisa.",
  },
  {
    title: "\"Não tenho tempo.\"",
    text: "A ideia de passar meses construindo algo antes de saber se funciona desanima.",
  },
];

const transformacoes = [
  "Você não é fracassado. Você só estava usando o método errado.",
  "Você não precisa estar pronto. Você precisa começar HOJE e aprender amanhã.",
  "Você cansou de vídeos motivacionais. Aqui você sai com um PLANO real.",
  "Você vai continuar cansado. Mas pode ficar cansado ganhando dinheiro.",
];

const etapas = [
  ["01", "OPORTUNIDADE", "Descubra o que pode valer a pena criar."],
  ["02", "PÚBLICO", "Defina para quem vender."],
  ["03", "PROBLEMA", "Encontre o problema que sua solução resolve."],
  ["04", "PRODUTO", "Estruture sua primeira solução."],
  ["05", "OFERTA", "Defina promessa, preço e apresentação."],
  ["06", "VALIDAÇÃO", "Prepare o próximo passo para testar no mercado."],
];

const entregaveis = [
  { icon: Play, title: "CURSO GRAVADO", text: "Acompanhe o processo passo a passo." },
  { icon: Sparkles, title: "PROMPTS DE IA", text: "Use comandos prontos para acelerar a criação." },
  {
    icon: ClipboardList,
    title: "TEMPLATES",
    text: "Comece com estruturas prontas em vez de criar tudo do zero.",
  },
  { icon: Rocket, title: "PLANO DE EXECUÇÃO", text: "Saiba o que fazer depois de criar seu produto." },
];

// Fundadores da LADE Academy. Sem foto ainda — usamos as iniciais como avatar
// por enquanto. Quando as fotos estiverem prontas, adicione um campo `foto`
// (ex.: importe o asset e coloque a URL aqui) e troque o bloco de iniciais
// pela tag <img> no JSX da seção "AUTORIDADE" abaixo.
const fundadores = [
  {
    nome: "Fabio",
    cargo: "Cofundador da LADE Academy",
    bio: "4 anos gerenciando equipe e conduzindo negociações comerciais. Hoje à frente da estratégia e do relacionamento com quem compra.",
    iniciais: "FA",
  },
  {
    nome: "Leonardo",
    cargo: "Cofundador da LADE Academy",
    bio: "Programador e instrutor de programação. Especialista em transformar tecnologia complexa em processos simples de seguir.",
    iniciais: "LE",
  },
];

const faq = [
  [
    "Como sei que isso não é só mais uma promessa vazia?",
    "Porque em vez de teoria, você sai com um produto estruturado e pronto pra testar — e tem garantia de 7 dias com reembolso 100%, sem perguntas, se não fizer sentido pra você.",
  ],
  [
    "E se eu não tiver tempo?",
    "45 minutos é menos tempo do que você passa hoje nas redes sociais. Pode assistir à noite, no seu ritmo.",
  ],
  [
    "Já tentei outros cursos antes e não deu certo. Por que esse seria diferente?",
    "Porque aqui não é só conteúdo pra assistir — é um método com passo a passo claro, pensado pra você sair com algo pronto ao final, não só mais informação.",
  ],
  [
    "Vou ganhar dinheiro em 45 minutos?",
    "Não. Você sai com um produto pronto para testar no mercado. O retorno financeiro vem depois, quando você valida a oferta (geralmente entre 7 e 30 dias).",
  ],
  [
    "Preciso investir em anúncios?",
    "Não para criar e validar seu produto — isso dá pra fazer de forma orgânica. Tráfego pago é uma etapa opcional e posterior, pra quem já validou e quer escalar.",
  ],
];

function Landing() {
  // A barra fixa mobile só aparece depois que o usuário passa pelo CTA do
  // bloco Método — antes disso, mostrar o CTA de compra reduz conversão em
  // público frio/cético (ver AGENTS.md, decisão de CRO já validada).
  const [showStickyBar, setShowStickyBar] = useState(false);
  const stickyBarTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // PageView já é disparado no <head> (src/routes/__root.tsx), no snippet
    // padrão do Meta Pixel — não repetir aqui pra não contar em dobro.
    track("ViewContent", {
      content_name: "Do Zero ao Primeiro Produto com IA",
      value: 37,
      currency: "BRL",
    });
  }, []);

  useEffect(() => {
    const trigger = stickyBarTriggerRef.current;
    if (!trigger) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top <= 0) {
          setShowStickyBar(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen pb-24 md:pb-0">
      <AnimatedBackground />

      {/* HERO */}
      <Section className="pt-14 sm:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-rise text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              COMECE DO ZERO COM IA
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Crie seu primeiro produto digital em{" "}
              <span className="text-gold">45 minutos</span>.
            </h1>

            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              Mesmo sem experiência, sem conhecimento técnico e sem ter uma ideia pronta do que
              vender.
            </p>

            <p className="mt-4 border-l-2 border-primary/40 pl-4 text-left text-sm leading-relaxed text-muted-foreground sm:text-base">
              Pare de passar meses procurando o que fazer. Use IA para encontrar uma oportunidade e
              transformar essa ideia em algo que você pode colocar no mercado.
            </p>

            <div className="mt-8 flex flex-col items-center gap-2 md:items-start">
              <a
                href="#dor"
                onClick={() => track("ClickCTA", { origem: "hero_scroll" })}
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-accent-foreground"
              >
                Veja como funciona
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="absolute inset-6 rounded-full bg-primary/15 blur-3xl" />
            <img
              src={heroMockup}
              alt="Mockup do curso Do Zero ao Primeiro Produto com IA, com selo de 45 minutos e checklist do método"
              width={900}
              height={900}
              fetchPriority="high"
              className="relative mx-auto w-full max-w-md drop-shadow-2xl"
            />
          </div>
        </div>
      </Section>

      {/* DOR */}
      <Section id="dor">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
          Você não precisa de mais um curso para assistir.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {dores.map((d) => (
            <div key={d.title} className="rounded-2xl panel-gold p-6">
              <h3 className="font-bold text-accent-foreground">{d.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TRANSFORMAÇÃO - NOVO */}
      <Section>
        <div className="rounded-3xl bg-gradient-to-br from-primary/8 to-primary/4 border border-primary/20 p-8">
          <h2 className="text-2xl font-bold sm:text-3xl text-center mb-8">
            A Verdade Que Ninguém Conta
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {transformacoes.map((t, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="text-gold text-2xl font-bold mt-0.5 flex-shrink-0">→</div>
                <p className="text-sm sm:text-base leading-relaxed font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* JORNADA */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            E se você não precisasse nem ter uma ideia?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Com IA, você pode partir do zero, encontrar oportunidades, escolher um problema e
            transformar a solução em um produto digital.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-xs flex-col items-center gap-2">
          {["ZERO", "IA", "OPORTUNIDADE", "PRODUTO", "OFERTA"].map((step, i) => (
            <div key={step} className="flex w-full flex-col items-center gap-2">
              <div
                className={`w-full rounded-xl border px-4 py-3 text-center text-sm font-bold tracking-[0.14em] ${
                  i === 4
                    ? "border-primary/50 bg-primary/12 text-accent-foreground"
                    : "border-border bg-surface text-foreground"
                }`}
              >
                {step}
              </div>
              {i < 4 && <ArrowDown className="h-4 w-4 text-primary" />}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xl font-semibold sm:text-2xl">
          Você não precisa saber tudo antes de começar.
        </p>
      </Section>

      {/* MÉTODO */}
      <Section>
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
          45 minutos. Uma ideia. Uma primeira oferta.
        </h2>
        <ol className="mt-10 space-y-3">
          {etapas.map(([n, title, text]) => (
            <li key={n} className="flex gap-4 rounded-2xl panel-gold p-5">
              <span className="text-sm font-black text-gold">{n}</span>
              <div className="min-w-0">
                <h3 className="text-sm font-bold tracking-[0.12em]">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-12 rounded-2xl border border-primary/30 bg-primary/8 p-7 text-center text-xl font-bold leading-snug sm:text-3xl">
          45 minutos para estruturar.
          <br />
          <span className="text-gold">O mercado decide se vale continuar.</span>
        </p>
        <div ref={stickyBarTriggerRef} className="mt-8 flex flex-col items-center gap-3">
          <CTA origem="metodo" />
          <p className="text-xs text-muted-foreground">
            Acesso imediato • Curso gravado • Ferramentas práticas
          </p>
        </div>
      </Section>

      {/* O QUE VOCÊ RECEBE */}
      <Section className="bg-surface/60">
        <h2 className="text-3xl font-bold sm:text-4xl">O que você recebe</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {entregaveis.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl panel-gold p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-accent-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold tracking-[0.12em]">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TRANSFORMAÇÃO (ANTES E DEPOIS) */}
      <Section>
        <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl border border-border bg-surface p-7">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              VOCÊ ENTRA ASSIM:
            </p>
            <p className="mt-4 space-y-1 text-sm sm:text-lg font-medium leading-relaxed text-muted-foreground">
              Não sei o que vender.
              <br />
              Não tenho produto.
              <br />
              Não sei por onde começar.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <ArrowRight className="hidden h-10 w-10 text-primary md:block" />
            <ArrowDown className="h-10 w-10 text-primary md:hidden" />
            <span className="rounded-full bg-[image:var(--gradient-gold)] px-5 py-2 text-sm font-black text-primary-foreground">
              45 MINUTOS
            </span>
          </div>

          <div className="rounded-2xl panel-gold p-7">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent-foreground">
              VOCÊ SAI ASSIM:
            </p>
            <p className="mt-4 text-sm sm:text-lg font-semibold leading-relaxed">
              Produto definido.
              <br />
              Oferta estruturada.
              <br />
              Próximo passo claro.
            </p>
          </div>
        </div>
      </Section>

      {/* AUTORIDADE */}
      <Section>
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
          Quem está por trás disso
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Trabalhamos juntos há 4 anos. Fabio sempre na ponta comercial, entendendo o que as
          pessoas realmente precisam. Leonardo, programador e instrutor, traduzindo tecnologia
          complexa em algo simples de aplicar. Depois do boom da IA, decidimos abrir nosso
          próprio caminho: fundamos a LADE Group e hoje desenvolvemos a LADE Academy — porque
          percebemos que as funcionalidades que realmente geram retorno financeiro com IA estão
          escondidas no meio de uma quantidade absurda de informação. Esse curso é a gente
          filtrando isso pra você.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {fundadores.map((f) => (
            <div key={f.nome} className="rounded-2xl panel-gold p-6">
              <div className="flex items-center gap-3">
                {/*
                  TODO: quando a foto estiver disponível, substitua o div de
                  iniciais abaixo por:
                  <img src={f.foto} alt={`Foto de ${f.nome}`} width={56} height={56}
                    className="h-14 w-14 rounded-full object-cover flex-shrink-0" />
                */}
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-sm font-bold text-accent-foreground">
                  {f.iniciais}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{f.nome}</p>
                  <p className="text-xs text-muted-foreground">{f.cargo}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OFERTA */}
      <Section className="bg-surface/60">
        <div className="rounded-3xl panel-gold p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Comece hoje por <span className="text-gold">R$37</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
            Você não precisa investir meses para descobrir se consegue criar algo. Comece pequeno,
            crie sua primeira oferta e coloque-a para teste.
          </p>

          <div className="mx-auto mt-8 max-w-sm text-left">
            <p className="mb-3 text-center text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              VOCÊ LEVA:
            </p>
            <ul className="space-y-2">
              {entregaveis.map(({ title }) => (
                <li key={title} className="flex items-center gap-2 text-sm sm:text-base">
                  <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                  {title.charAt(0) + title.slice(1).toLowerCase()}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              TUDO ISSO POR
            </p>
            <p className="text-6xl font-black tracking-tight sm:text-7xl">
              <span className="text-gold">R$37</span>
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <CTA origem="oferta" className="animate-pulse-gold" />
            <p className="text-xs text-muted-foreground">Acesso imediato • Pagamento seguro</p>
          </div>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-bold tracking-[0.14em] text-accent-foreground">
            <ShieldCheck className="h-4 w-4" />
            GARANTIA DE 7 DIAS
          </span>

          <div className="mt-8 grid gap-3 text-xs sm:text-sm text-muted-foreground sm:grid-cols-3">
            <span className="inline-flex items-center justify-center gap-2">
              <Lock className="h-4 w-4 text-primary" /> Pagamento seguro
            </span>
            <span className="inline-flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> Acesso imediato
            </span>
            <span className="inline-flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 text-primary" /> Garantia de 7 dias
            </span>
          </div>
        </div>
      </Section>

      {/* FAQ - MELHORADO COM RESPOSTAS VISÍVEIS */}
      <Section>
        <h2 className="text-3xl font-bold sm:text-4xl mb-8">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faq.map(([q, a]) => (
            <AccordionItem
              key={q}
              value={q as string}
              className="border-0 rounded-xl panel-gold p-4 sm:p-6"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:text-gold">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm leading-relaxed text-muted-foreground pt-3 border-t border-primary/10 mt-3">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* CTA FINAL */}
      <Section className="text-center">
        <div className="rounded-3xl bg-gradient-to-br from-primary/8 to-primary/4 border border-primary/20 p-8 sm:p-12">
          <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
            Uma Última Coisa
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Você já pensou em começar antes e não começou. Tudo bem. Mas dessa vez, o primeiro
            passo leva só <span className="text-gold">45 minutos</span>. R$ 37.
          </p>
          <p className="mx-auto mt-4 text-base sm:text-lg font-semibold text-foreground">
            Essa decisão você toma <span className="text-gold">AGORA</span>.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <CTA origem="cta_final" final />
            <p className="text-xs text-muted-foreground">Acesso imediato • Garantia de 7 dias</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Check className="h-3.5 w-3.5 text-primary" />
          Do Zero ao Primeiro Produto com IA • Método Produto em 45 Minutos
        </div>
      </Section>

      {/* BARRA FIXA MOBILE */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-primary/20 bg-background/90 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          type="button"
          onClick={() => goToCheckout("barra_mobile")}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3.5 text-sm font-bold text-primary-foreground"
        >
          QUERO CRIAR MEU PRODUTO — R$37 <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}
