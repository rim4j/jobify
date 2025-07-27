import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "./../assets/logo.svg";
import LandingImg from "./../assets/main.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className='max-w-6xl mx-auto px-4 sm:px-8 py-6'>
        <Image src={Logo} alt='logo' />
      </header>
      <section
        className='max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 
       items-center grid lg:grid-cols-[1fr_400px]'
      >
        <div>
          <h1 className='capitalize text-4xl md:text-7xl font-bold'>
            job
            <span className='text-primary'> Tracking</span> app
          </h1>
          <p className='leading-loose max-w-md mt-4 '>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            perspiciatis nulla sint saepe ex necessitatibus amet eveniet
            deserunt maiores. Ipsa placeat incidunt voluptate molestiae qui sed
            nam vitae ullam pariatur.
          </p>
          <Button asChild className='mt-4 '>
            <Link href='/add-job'>Get Started</Link>
          </Button>
        </div>
        <Image
          src={LandingImg}
          alt='landing image'
          className='hidden lg:block'
        />
      </section>
    </main>
  );
}
