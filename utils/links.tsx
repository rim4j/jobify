import { AppWindow, AreaChart, Layers } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export const links: NavLink[] = [
  {
    href: "/add-job",
    label: "Add Job",
    icon: <Layers />,
  },
  {
    href: "/jobs",
    label: "Jobs",
    icon: <AppWindow />,
  },
  {
    href: "/stats",
    label: "Stats",
    icon: <AreaChart />,
  },
];
