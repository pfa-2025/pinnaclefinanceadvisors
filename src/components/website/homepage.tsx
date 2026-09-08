import Image from "next/image";
import Link from "next/link";

import { getObject, getString, getStringArray } from "@/lib/public-content";
import { cn } from "@/lib/utils";
import type { Advisor, GalleryItem, Insight, Service, Stat } from "@/types";

import {
  FadeIn,
  FadeUp,
  ImageReveal,
  MagneticButton,
  ScaleReveal,
  StaggerContainer,
  StaggerItem,
  TextReveal,
} from "@/components/animations/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { AdvisorCard } from "@/components/website/advisor-card";
import { AnimatedNumber } from "@/components/website/animated-number";
import { GallerySection } from "@/components/website/gallery-section";
import { InsightCard } from "@/components/website/insight-card";
import { LineGraph } from "@/components/website/line-graph";
import { ServiceShowcase } from "@/components/website/service-showcase";
import { TrustMarquee } from "@/components/website/trust-marquee";

export function Homepage({
  advisors,
  galleryItems,
  homepageStats,
  insights,
  page,
  services,
}: {
  advisors: Advisor[];
  galleryItems: GalleryItem[];
  homepageStats: Stat[];
  insights: Insight[];
  page?: Record<string, unknown>;
  services: Service[];
}) {
  const hero = getObject(page?.hero);
  const marquee = getObject(page?.marquee);
  const introduction = getObject(page?.introduction);
  const about = getObject(page?.about);
  const servicesContent = getObject(page?.services);
  const philosophy = getObject(page?.philosophy);
  const whyPinnacle = getObject(page?.whyPinnacle);
  const advisorsContent = getObject(page?.advisors);
  const journey = getObject(page?.journey);
  const galleryContent = getObject(page?.gallery);
  const insightsContent = getObject(page?.insights);
  const finalCta = getObject(page?.finalCta);

  return (
    <>
      <HeroSection hero={hero} />
      <TrustMarquee marquee={marquee} />
      <IntroductionSection introduction={introduction} />
      <AboutExperienceSection about={about} />
      <ServicesSection services={services} servicesContent={servicesContent} />
      <PhilosophySection philosophy={philosophy} />
      <StatisticsSection homepageStats={homepageStats} />
      <WhyPinnacleSection whyPinnacle={whyPinnacle} />
      <AdvisorsSection advisors={advisors} advisorsContent={advisorsContent} />
      <JourneySection journey={journey} />
      <GallerySection items={galleryItems} content={galleryContent} />
      <InsightsSection insights={insights} insightsContent={insightsContent} />
      <FinalCtaSection finalCta={finalCta} />
    </>
  );
}

function HeroSection({ hero }: { hero: Record<string, unknown> }) {
  return (
    <section
      style={{ paddingTop: "calc(8.5rem + var(--announcement-h, 0px))" }}
      className="relative overflow-hidden bg-primary px-4 pb-18 text-white sm:px-6 lg:px-10"
    >
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="absolute inset-0 bg-grid bg-[size:74px_74px] opacity-[0.07]" />
      <div className="container-shell relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="max-w-3xl">
          <FadeUp>
            <p className="eyebrow">
              {getString(hero.eyebrow, "PRIVATE WEALTH • FINANCIAL CLARITY • LASTING CONFIDENCE")}
            </p>
          </FadeUp>
          <div className="mt-7">
            <h1 className="display-title font-display font-semibold text-balance">
              <TextReveal text={getString(hero.title, "Your Ambition. Our Strategy. A Future Without Limits.")} />
            </h1>
          </div>
          <FadeUp className="mt-6 max-w-xl text-[1rem] leading-7 text-white/70">
            {getString(
              hero.description,
              "Personalized financial guidance designed to transform complex decisions into clear strategies for your future.",
            )}
          </FadeUp>
          <StaggerContainer className="mt-8 flex flex-wrap gap-3">
            <StaggerItem>
              <MagneticButton>
                <ButtonLink href={getString(hero.primaryCtaHref, "/schedule")}>
                  {getString(hero.primaryCtaLabel, "Start Your Financial Journey")}
                </ButtonLink>
              </MagneticButton>
            </StaggerItem>
            <StaggerItem>
              <ButtonLink href={getString(hero.secondaryCtaHref, "/expertise")} variant="secondary">
                {getString(hero.secondaryCtaLabel, "Explore Our Expertise")}
              </ButtonLink>
            </StaggerItem>
          </StaggerContainer>
        </div>

        <div className="relative">
          <ImageReveal className="ml-auto max-w-[560px] rounded-[2.5rem]">
            <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] border border-white/10 sm:h-[560px]">
              <Image
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
                alt="Pinnacle Finance advisors in discussion"
                fill
                priority
                className="object-cover"
              />
            </div>
          </ImageReveal>

          <ScaleReveal className="glass-panel absolute -left-1 top-4 w-40 rounded-[1.9rem] p-4 shadow-premium sm:-left-2 sm:top-6 sm:w-52 sm:p-5 lg:-left-16">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary/72">PORTFOLIO OUTLOOK</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="font-display text-4xl tracking-[-0.06em] text-primary">+18.4%</p>
                <p className="mt-2 text-xs text-muted">Long-Term Growth Strategy</p>
              </div>
              <div className="h-16 w-16">
                <LineGraph />
              </div>
            </div>
          </ScaleReveal>

          <ScaleReveal className="absolute -bottom-6 right-0 w-[210px] rounded-[1.9rem] border border-white/10 bg-white/12 p-4 backdrop-blur-xl sm:-bottom-8 sm:right-3 sm:w-[250px] sm:p-5 lg:right-[-1.5rem]">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-accent-soft">PERSONALIZED STRATEGY</p>
            <p className="mt-3 font-display text-2xl tracking-[-0.04em] text-white">
              Designed around your goals.
            </p>
            <div className="mt-4 h-20">
              <LineGraph dark />
            </div>
          </ScaleReveal>

          <FadeIn className="absolute bottom-28 left-8 h-24 w-24 rounded-full bg-accent/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

function IntroductionSection({ introduction }: { introduction: Record<string, unknown> }) {
  return (
    <section className="section-space px-4 sm:px-6 lg:px-10">
      <div className="container-shell">
        <FadeUp className="max-w-5xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-accent">
            {getString(introduction.eyebrow, "BEYOND FINANCIAL ADVICE")}
          </p>
          <h2 className="mt-5 section-title max-w-5xl text-balance text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[1.02] text-primary">
            {getString(
              introduction.title,
              "We believe wealth is more than numbers. It's the freedom to live with confidence, protect what matters, and build the future you envision.",
            )}
          </h2>
        </FadeUp>
      </div>
    </section>
  );
}

function AboutExperienceSection({ about }: { about: Record<string, unknown> }) {
  const pillars = [
    "Long-term planning relationships",
    "Clear guidance through complexity",
    "Strategies tailored to real life",
  ];

  return (
    <section className="section-space px-4 sm:px-6 lg:px-10">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative min-h-[520px] lg:min-h-[620px] lg:pr-10">
          <div className="absolute left-4 top-8 z-0 text-[9rem] font-display leading-none tracking-[-0.08em] text-primary/[0.06]">
            15
          </div>
          <ImageReveal className="relative z-10 overflow-hidden rounded-5xl shadow-premium">
            <div className="relative min-h-[440px] rounded-5xl border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(233,243,245,0.9))] p-6 sm:min-h-[540px] sm:p-8">
              <div className="dark-panel flex min-h-[390px] flex-col justify-between rounded-[2rem] p-7 sm:min-h-[474px] sm:p-8">
                <div>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-accent-soft">
                    RELATIONSHIP-FIRST ADVISORY
                  </p>
                  <h3 className="mt-5 max-w-[10ch] font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] tracking-[-0.05em] text-white">
                    Built on clarity, discipline, and trust.
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/68">
                    We bring structure to major financial decisions so clients can move with more confidence and less noise.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
                    <p className="font-display text-4xl tracking-[-0.06em] text-white">500+</p>
                    <p className="mt-2 text-sm text-white/66">Financial journeys guided with a tailored planning process.</p>
                  </div>
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
                    <p className="font-display text-4xl tracking-[-0.06em] text-accent-soft">98%</p>
                    <p className="mt-2 text-sm text-white/66">Client satisfaction shaped by consistency, trust, and follow-through.</p>
                  </div>
                </div>
              </div>
            </div>
          </ImageReveal>
          <ScaleReveal className="glass-panel absolute -bottom-6 right-0 z-20 w-full max-w-[340px] rounded-[2rem] p-6 shadow-soft">
            <p className="font-display text-4xl tracking-[-0.05em] text-primary">15+</p>
            <p className="mt-2 text-sm font-medium text-muted">Years of trusted guidance</p>
            <div className="mt-5 space-y-3">
              {pillars.map((pillar) => (
                <div key={pillar} className="flex items-start gap-3 text-sm leading-6 text-primary/76">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </ScaleReveal>
        </div>
        <div>
          <SectionHeading
            eyebrow={getString(about.eyebrow, "ABOUT THE EXPERIENCE")}
            title={getString(about.title, "Financial Guidance Built Around Your Life.")}
            description={getString(
              about.description,
              "Every financial journey is different. We combine personalized strategies, experienced guidance, and long-term relationships to help our clients move forward with confidence.",
            )}
          />
          <ButtonLink href={getString(about.ctaHref, "/about")} className="mt-8">
            {getString(about.ctaLabel, "Discover Our Story")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({
  services,
  servicesContent,
}: {
  services: Service[];
  servicesContent: Record<string, unknown>;
}) {
  return (
    <section className="section-space bg-primary-deep px-4 sm:px-6 lg:px-10">
      <div className="container-shell">
        <SectionHeading
          eyebrow={getString(servicesContent.eyebrow, "OUR EXPERTISE")}
          title={getString(servicesContent.title, "Strategies Designed for Every Chapter of Your Life.")}
          description={getString(
            servicesContent.description,
            "A planning platform that evolves with transitions, opportunities, and long-range ambitions.",
          )}
          inverted
        />
        <div className="mt-12">
          <ServiceShowcase services={services} />
        </div>
      </div>
    </section>
  );
}

function PhilosophySection({ philosophy }: { philosophy: Record<string, unknown> }) {
  const principles = [
    ["01", "UNDERSTAND", "We begin by understanding your goals, priorities, and vision."],
    ["02", "DESIGN", "We create strategies tailored specifically to your financial life."],
    ["03", "EVOLVE", "We continuously adapt your strategy as your life and goals change."],
  ];

  return (
    <section className="section-space px-4 sm:px-6 lg:px-10">
      <div className="container-shell">
        <SectionHeading
          eyebrow={getString(philosophy.eyebrow, "FINANCIAL PHILOSOPHY")}
          title={getString(philosophy.title, "Clarity Today. Confidence Tomorrow.")}
          description={getString(
            philosophy.description,
            "Our process is deliberate, collaborative, and designed to keep strategy aligned with real life.",
          )}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {principles.map(([index, title, text]) => (
            <FadeUp key={title} className="relative rounded-5xl border border-line bg-white/70 p-8 shadow-soft">
              <div className="absolute left-8 right-8 top-0 h-px -translate-y-1/2 bg-accent/50 animate-pulse-line" />
              <p className="text-sm uppercase tracking-[0.26em] text-accent">{index}</p>
              <h3 className="mt-6 font-display text-3xl tracking-[-0.05em] text-primary">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{text}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatisticsSection({ homepageStats }: { homepageStats: Stat[] }) {
  return (
    <section className="section-space px-4 sm:px-6 lg:px-10">
      <div className="container-shell rounded-[2.8rem] bg-primary px-6 py-10 text-white shadow-premium sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-4">
          {homepageStats.map((stat) => {
            const number = Number.parseInt(stat.value.replace(/\D/g, ""), 10) || 0;
            const suffix = stat.value.replace(/[0-9]/g, "");

            return (
              <FadeUp key={stat.label}>
                <div className="text-[3.25rem] font-display tracking-[-0.07em] text-accent-soft">
                  <AnimatedNumber value={number} suffix={suffix} />
                </div>
                <h3 className="mt-3 max-w-[14ch] text-lg font-semibold text-white">{stat.label}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{stat.detail}</p>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyPinnacleSection({ whyPinnacle }: { whyPinnacle: Record<string, unknown> }) {
  const benefits =
    getStringArray(whyPinnacle.benefits).length > 0
      ? getStringArray(whyPinnacle.benefits)
      : [
          "Personalized Guidance",
          "Transparent Communication",
          "Long-Term Relationships",
          "Strategic Thinking",
          "Comprehensive Planning",
        ];

  return (
    <section className="section-space px-4 sm:px-6 lg:px-10">
      <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow={getString(whyPinnacle.eyebrow, "WHY PINNACLE")}
            title={getString(whyPinnacle.title, "Financial Advice Should Feel Personal.")}
            description={getString(
              whyPinnacle.description,
              "We help clients feel informed, heard, and ready to move forward with decisions that match the lives they are building.",
            )}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <FadeUp
                key={benefit}
                className="rounded-full border border-line bg-white/70 px-5 py-4 text-sm font-medium text-primary shadow-soft"
              >
                {benefit}
              </FadeUp>
            ))}
          </div>
        </div>
        <div className="relative">
          <ImageReveal className="rounded-[2.8rem]">
            <div className="relative h-[420px] overflow-hidden rounded-[2.8rem] sm:h-[620px]">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="Clients in a thoughtful planning meeting"
                fill
                className="object-cover"
              />
            </div>
          </ImageReveal>
          <ScaleReveal className="glass-panel absolute -bottom-8 left-6 rounded-4xl p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.24em] text-accent">Client Confidence</p>
            <p className="mt-2 font-display text-3xl tracking-[-0.05em] text-primary">Relationship-first advisory.</p>
          </ScaleReveal>
        </div>
      </div>
    </section>
  );
}

function AdvisorsSection({
  advisors,
  advisorsContent,
}: {
  advisors: Advisor[];
  advisorsContent: Record<string, unknown>;
}) {
  return (
    <section className="section-space px-4 sm:px-6 lg:px-10">
      <div className="container-shell">
        <SectionHeading
          eyebrow={getString(advisorsContent.eyebrow, "ADVISORS")}
          title={getString(advisorsContent.title, "Expertise You Can Trust. Relationships You Can Count On.")}
          description={getString(
            advisorsContent.description,
            "A boutique advisory team built for thoughtful strategy, calm decision-making, and long-term alignment.",
          )}
        />
        <div
          className={cn(
            "mt-12 grid gap-8",
            advisors.length === 1 ? "mx-auto max-w-[34rem]" : "lg:grid-cols-3",
          )}
        >
          {advisors.map((advisor) => (
            <AdvisorCard key={advisor.slug} advisor={advisor} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneySection({ journey }: { journey: Record<string, unknown> }) {
  const steps = [
    ["01", "Discover", "We listen deeply to understand context, concerns, and ambition."],
    ["02", "Define", "Together we clarify priorities and build a decision framework."],
    ["03", "Design", "We shape a plan across investments, protection, tax, and legacy."],
    ["04", "Implement", "Recommendations become coordinated action with measured pacing."],
    ["05", "Evolve", "The strategy is reviewed continuously as life changes."],
  ];

  return (
    <section className="section-space bg-white/55 px-4 sm:px-6 lg:px-10">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow={getString(journey.eyebrow, "CLIENT JOURNEY")}
            title={getString(journey.title, "Your Path to Financial Confidence.")}
            description={getString(journey.description, "A steady process designed to turn complexity into momentum.")}
          />
        </div>
        <div className="space-y-4">
          {steps.map(([index, title, text]) => (
            <FadeUp key={title} className="rounded-5xl border border-line bg-white p-8 shadow-soft">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-5">
                  <span className="font-display text-3xl tracking-[-0.06em] text-accent">{index}</span>
                  <h3 className="font-display text-3xl tracking-[-0.05em] text-primary">{title}</h3>
                </div>
                <div className="max-w-xl text-sm leading-7 text-muted">{text}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightsSection({
  insights,
  insightsContent,
}: {
  insights: Insight[];
  insightsContent: Record<string, unknown>;
}) {
  const featuredInsight = insights[0];

  return (
    <section className="section-space px-4 sm:px-6 lg:px-10">
      <div className="container-shell">
        <SectionHeading
          eyebrow={getString(insightsContent.eyebrow, "INSIGHTS")}
          title={getString(insightsContent.title, "Perspective for What's Next.")}
          description={getString(
            insightsContent.description,
            "Editorial thinking for major decisions, market perspective, and life-stage planning.",
          )}
        />
        {featuredInsight ? (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <InsightCard insight={featuredInsight} featured />
            <div className="grid gap-8">
              {insights.slice(1).map((insight) => (
                <InsightCard key={insight.slug} insight={insight} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FinalCtaSection({ finalCta }: { finalCta: Record<string, unknown> }) {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-10">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[2.8rem] bg-primary px-6 py-14 text-white shadow-premium sm:px-8 lg:px-14">
          <div className="absolute inset-0 bg-hero-radial opacity-80" />
          <div className="absolute inset-x-0 bottom-0 h-40 opacity-70">
            <LineGraph dark />
          </div>
          <div className="relative max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-accent-soft">
              {getString(finalCta.eyebrow, "START THE CONVERSATION")}
            </p>
            <h2 className="mt-6 section-title text-white">
              {getString(finalCta.title, "The Future You're Planning For Starts With a Conversation.")}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
              {getString(
                finalCta.description,
                "Let's create a financial strategy designed around your goals, your life, and your future.",
              )}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={getString(finalCta.primaryCtaHref, "/schedule")}>
                {getString(finalCta.primaryCtaLabel, "Schedule a Consultation")}
              </ButtonLink>
              <ButtonLink href={getString(finalCta.secondaryCtaHref, "/contact")} variant="secondary">
                {getString(finalCta.secondaryCtaLabel, "Contact Our Team")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
