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

  console.log("user id", userId);
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

type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = await authenticatedAndRedirect();
  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { position: { contains: search } },
          { company: { contains: search } },
        ],
      };
    }

    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }
    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export const deleteJobAction = async (id: string): Promise<JobType | null> => {
  const userId = await authenticatedAndRedirect();

  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    return null;
  }
};

export const getSingleJobAction = async (
  id: string
): Promise<JobType | null> => {
  let job: JobType | null = null;

  const userId = await authenticatedAndRedirect();

  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    job = null;
  }

  if (!job) redirect("/jobs");

  return job;
};

export const updateJobAction = async (
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  const userId = await authenticatedAndRedirect();
  try {
    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return job;
  } catch (error) {
    return null;
  }
};
