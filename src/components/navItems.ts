import { FolderIcon, CodeIcon, UserIcon, MailIcon } from "./icons";
import type { InkTone } from "./sketchContext";

/**
 * One list, two renderings. The header and the dock showed different menus
 * before — and since the header hides its links below `md`, the dock was the
 * only navigation on a phone while also being the one missing Contact.
 *
 * Contact is a modal rather than a route, so it has no `path`; an item
 * without one is never marked current.
 */
export interface NavItem {
  label: string;
  view: string;
  path?: string;
  icon: typeof FolderIcon;
  /** The pen that marks this item when it is the current one. */
  tone: InkTone;
}

export const navItems: NavItem[] = [
  {
    label: "Builds",
    view: "builds",
    path: "/builds",
    icon: FolderIcon,
    tone: "violet",
  },
  { label: "Writing", view: "blog", path: "/blog", icon: CodeIcon, tone: "rose" },
  { label: "About", view: "about", path: "/about", icon: UserIcon, tone: "teal" },
  { label: "Contact", view: "contact", icon: MailIcon, tone: "blue" },
];
