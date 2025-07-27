import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AlignLeft } from "lucide-react";
import { Button } from "./ui/button";
import { links } from "../utils/links";
import Link from "next/link";

const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='lg:hidden'>
        <Button variant='outline' className='cursor-pointer' size='icon'>
          <AlignLeft />
          <span className='sr-only'>Toggle links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-52 lg:hidden '
        align='start'
        sideOffset={25}
      >
        {links.map((item, i) => (
          <Link key={i} href={item.href}>
            <DropdownMenuItem className='w-full flex items-center gap-x-2 cursor-pointer'>
              {item.icon} <span className='capitalize'>{item.label}</span>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;
