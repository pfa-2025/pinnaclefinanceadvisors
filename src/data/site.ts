import type { Advisor, Insight, Service, Stat } from "@/types";

export const services: Service[] = [
  {
    slug: "retirement-planning",
    index: "01",
    title: "Retirement Planning",
    description:
      "Income sequencing, lifestyle planning, and risk calibration for the years your work begins serving your life.",
    benefits: ["Income distribution mapping", "Social security timing", "Tax-aware withdrawal design"],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    metric: "+22% retirement readiness uplift",
  },
  {
    slug: "wealth-management",
    index: "02",
    title: "Wealth Management",
    description:
      "Holistic advisory that connects portfolio management, planning conversations, and family priorities into one clear strategy.",
    benefits: ["Portfolio stewardship", "Liquidity planning", "Family governance support"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    metric: "$250M+ aligned assets guided",
  },
  {
    slug: "investment-strategy",
    index: "03",
    title: "Investment Strategy",
    description:
      "Disciplined investment frameworks that balance growth ambition with risk, tax impact, and time horizon.",
    benefits: ["Strategic allocation reviews", "Risk-tolerance alignment", "Scenario planning"],
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    metric: "Quarterly strategy rebalancing",
  },
  {
    slug: "estate-planning",
    index: "04",
    title: "Estate Planning",
    description:
      "Legacy planning that brings clarity to asset transfer, philanthropy, and family continuity conversations.",
    benefits: ["Legacy structures", "Beneficiary coordination", "Family communication planning"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    metric: "3-generation planning frameworks",
  },
  {
    slug: "tax-strategy",
    index: "05",
    title: "Tax Strategy",
    description:
      "Ongoing tax-aware planning that helps decisions work harder across income, investments, and long-term goals.",
    benefits: ["Tax-efficient portfolio moves", "Charitable giving coordination", "Forward-looking planning"],
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    metric: "Integrated annual planning cadence",
  },
  {
    slug: "insurance-solutions",
    index: "06",
    title: "Insurance Solutions",
    description:
      "Protection planning built to support continuity, preserve optionality, and reduce exposure to life’s surprises.",
    benefits: ["Coverage gap analysis", "Business owner continuity", "Protection layering"],
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
    metric: "98% plan personalization score",
  },
];

export const advisors: Advisor[] = [
  {
    slug: "amelia-grant",
    name: "Amelia Grant",
    role: "Founder & Senior Wealth Advisor",
    bio: "Amelia leads with a calm strategic lens, helping founders, families, and executives align wealth with the life they are building.",
    specializations: ["Long-term wealth strategy", "Executive planning", "Legacy conversations"],
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    email: "amelia@pinnaclefinanceadvisors.com",
    phone: "(908) 555-0141",
  },
  {
    slug: "noah-bennett",
    name: "Noah Bennett",
    role: "Director of Investment Strategy",
    bio: "Noah translates complex markets into practical decisions, building allocation strategies that remain disciplined through change.",
    specializations: ["Portfolio construction", "Risk strategy", "Tax-aware investing"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    email: "noah@pinnaclefinanceadvisors.com",
    phone: "(908) 555-0168",
  },
  {
    slug: "sophia-lin",
    name: "Sophia Lin",
    role: "Family Planning Advisor",
    bio: "Sophia helps clients coordinate estate, education, and life-stage planning with empathy and meticulous attention to detail.",
    specializations: ["Family strategy", "Estate planning", "Education funding"],
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80",
    email: "sophia@pinnaclefinanceadvisors.com",
    phone: "(908) 555-0129",
  },
];

export const insights: Insight[] = [
  {
    slug: "designing-income-for-retirement-with-flexibility",
    category: "Retirement",
    date: "June 12, 2026",
    title: "Designing Retirement Income With Flexibility, Not Guesswork",
    description:
      "How thoughtful sequencing decisions can protect confidence and create more room to adapt as life changes.",
    image:
      "https://images.unsplash.com/photo-1518186233392-c232efbf2373?auto=format&fit=crop&w=1200&q=80",
    body: [
      "The strongest retirement plans rarely rely on a single assumption. Instead, they layer flexibility into spending, timing, and tax strategy.",
      "When households understand which assets can support which goals, market volatility becomes easier to navigate without reactive decisions.",
      "That clarity matters most when transitions happen: a business sale, a relocation, a health event, or a shift in family priorities.",
    ],
  },
  {
    slug: "why-tax-aware-planning-creates-better-decisions",
    category: "Tax Strategy",
    date: "May 27, 2026",
    title: "Why Tax-Aware Planning Often Leads to Better Investment Decisions",
    description:
      "A practical look at how taxes influence portfolio moves, cash flow planning, and long-term wealth outcomes.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Performance is only part of the story. The after-tax result often tells a more useful truth about how effective a strategy really is.",
      "Integrating tax planning into investment conversations helps clients avoid siloed decisions that look smart in isolation but costly together.",
      "A strong advisory relationship turns those details into an ongoing planning rhythm instead of a year-end scramble.",
    ],
  },
  {
    slug: "legacy-conversations-modern-families-need-earlier",
    category: "Legacy Planning",
    date: "April 09, 2026",
    title: "Legacy Conversations Modern Families Need to Start Earlier",
    description:
      "Why clarity, documentation, and communication are often the most valuable legacy assets a family can leave behind.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Families often postpone legacy conversations until urgency forces them. Starting earlier creates better decisions and less friction later.",
      "Good planning includes documents, but it also includes expectations, values, and the practical handoff of responsibilities.",
      "When those pieces are aligned, wealth can serve continuity rather than confusion.",
    ],
  },
];

export const homepageStats: Stat[] = [
  { label: "Years of Financial Experience", value: "15+", detail: "Trusted guidance across changing markets and life stages." },
  { label: "Financial Journeys Guided", value: "500+", detail: "Deeply personal advisory relationships built for the long term." },
  { label: "Commitment to Client Satisfaction", value: "98%", detail: "Measured through retention, referrals, and review sentiment." },
  { label: "Personalized Strategy", value: "100%", detail: "Every plan is built around goals, constraints, and life context." },
];

export const trafficData = [
  { name: "Jan", traffic: 3100, enquiries: 36, consultations: 18 },
  { name: "Feb", traffic: 3600, enquiries: 44, consultations: 20 },
  { name: "Mar", traffic: 4020, enquiries: 48, consultations: 27 },
  { name: "Apr", traffic: 4540, enquiries: 53, consultations: 29 },
  { name: "May", traffic: 4960, enquiries: 62, consultations: 34 },
  { name: "Jun", traffic: 5480, enquiries: 71, consultations: 39 },
];

export const recentEnquiries = [
  { name: "Olivia Carter", focus: "Retirement Planning", status: "New", date: "Today" },
  { name: "Marcus Hill", focus: "Estate Planning", status: "Review", date: "Yesterday" },
  { name: "Lena Ford", focus: "Wealth Management", status: "Qualified", date: "Jul 07" },
  { name: "Daniel Reed", focus: "Tax Strategy", status: "New", date: "Jul 06" },
];

export const upcomingConsultations = [
  { client: "Harper Holdings", advisor: "Amelia Grant", time: "10:00 AM", date: "Jul 12" },
  { client: "Maya Thompson", advisor: "Sophia Lin", time: "1:30 PM", date: "Jul 12" },
  { client: "Westbridge Family Office", advisor: "Noah Bennett", time: "4:00 PM", date: "Jul 13" },
];
