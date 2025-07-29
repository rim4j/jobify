"use server";

import prisma from "./db";
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export const authenticatedAndRedirect = async (): Promise<string> => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
};

export const createJobAction = async (
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  const userId = await authenticatedAndRedirect();

  try {
    createAndEditJobSchema.parse(values);

    const job: JobType = await prisma.job.create({
      data: { ...values, clerkId: userId },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
};
