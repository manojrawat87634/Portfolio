export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isCallButton?: boolean; // Added to distinguish high-priority phone call action
}

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "Call Me: +91 7078177495", href: "tel:+1234567890", isCallButton: true },
  // { label: "Resume", href: "/resume.pdf", isExternal: true },
];