"use client";
import { links } from "@/utils/links";
import Logo from "../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className='py-4 px-8 h-full bg-muted'>
      <Image src={Logo} alt='logo' className='mx-auto' />
      <div className='flex flex-col mt-20 gap-y-4'>
        {links.map((item, i) => (
          <Button
            key={i}
            asChild
            variant={pathname === item.href ? "default" : "link"}
          >
            <Link className='capitalize' href={item.href}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
