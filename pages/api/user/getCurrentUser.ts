import { Coloc, PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { type } from "os";
import { UserWithColocs } from "../../../types/prisma-extend";

type Data = UserWithColocs;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  const userId = req.body.userId;
  let userWithColocs: UserWithColocs = null;
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Coloc: true,
    },
  });
  if (result) {
    userWithColocs = {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      username: result.username,
      Coloc: result.Coloc,
    };
  }
  prisma.$disconnect();
  console.log(userWithColocs);
  res.status(200).json(userWithColocs);
}
