"use client";
import { Input } from "./ui/input";
import { JobStatus } from "@/utils/types";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;

    const params = new URLSearchParams();
    params.set("search", search);
    params.set("jobStatus", jobStatus);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <form
      className='bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg'
      onSubmit={handleSubmit}
    >
      <Input
        type='text'
        placeholder='Search Jobs'
        name='search'
        defaultValue={search}
      />

      <Select name='jobStatus' defaultValue={jobStatus}>
        <SelectTrigger className='w-full'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='SelectContent'>
          {["all", ...Object.values(JobStatus)].map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type='submit'>Search</Button>
    </form>
  );
};

export default SearchForm;
