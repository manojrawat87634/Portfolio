// data/servicesData.ts
import { IconType } from "react-icons";
import {
  FaCode,
  FaServer,
  FaCreditCard,
  FaBuilding,
  FaGraduationCap,
  FaUsers,
  FaNetworkWired,
  FaPlug,
} from "react-icons/fa";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  icon: IconType;
}

export const servicesData: ServiceItem[] = [
  {
    id: "full-stack-dev",
    title: "Full Stack & Web Development",
    description:
      "End-to-end web application development with responsive frontends, fast server rendering, and robust database architectures.",
    highlights: ["React / Next.js", "TypeScript", "Responsive UI", "SEO Optimized"],
    icon: FaCode,
  },
  {
    id: "backend-api",
    title: "Backend & API Architecture",
    description:
      "Building scalable RESTful APIs, business logic, microservices, and database schemas with security and optimization at scale.",
    highlights: ["Node.js / Express", "Database Schemas", "Authentication", "Fast APIs"],
    icon: FaServer,
  },
  {
    id: "system-design",
    title: "System Design & Architecture",
    description:
      "Architecting reliable web systems designed to handle complex business flows, concurrent users, and growing data needs.",
    highlights: ["Scalable Systems", "Database Design", "Performance", "Clean Architecture"],
    icon: FaNetworkWired,
  },
  {
    id: "payment-gateways",
    title: "Payment Gateway Integration",
    description:
      "Seamless and secure integration of third-party payment providers, webhooks, checkout flows, and automated subscription setups.",
    highlights: ["Stripe / Razorpay", "Webhook Handling", "Secure Checkout", "Billing Systems"],
    icon: FaCreditCard,
  },
  {
    id: "crm-institute-portals",
    title: "CRM & Management Systems",
    description:
      "Custom enterprise solutions like CRM platforms, Institute Management Systems, Intern Portals, and Notes Sharing Platforms.",
    highlights: ["Role-Based Access", "Data Analytics", "Student/Lead Tracking", "Content Portals"],
    icon: FaUsers,
  },
  {
    id: "business-websites",
    title: "Real Estate & Business Websites",
    description:
      "High-converting static and dynamic websites for real estate agencies and businesses, featuring working contact forms and inquiry pipelines.",
    highlights: ["Fast Loading", "Working Contact Forms", "Lead Generation", "Custom Branding"],
    icon: FaBuilding,
  },
];