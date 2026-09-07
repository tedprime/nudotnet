import {
  Code2,
  Cloud,
  ShieldCheck,
  Landmark,
  ServerCog,
  Database,
  Globe,
  Lock,
  Zap,
  Users,
  type LucideIcon,
} from 'lucide-react';

// A curated allow-list of icons the Capability admin form can pick from —
// a database can't store a React component, so we store a key here and
// look the component up at render time on both the admin and public side.
export const ICON_REGISTRY: Record<string, LucideIcon> = {
  Code2,
  Cloud,
  ShieldCheck,
  Landmark,
  ServerCog,
  Database,
  Globe,
  Lock,
  Zap,
  Users,
};

export type IconKey = keyof typeof ICON_REGISTRY;

export const ICON_KEYS = Object.keys(ICON_REGISTRY) as IconKey[];

export function getIcon(key: string): LucideIcon {
  return ICON_REGISTRY[key] ?? Code2;
}
