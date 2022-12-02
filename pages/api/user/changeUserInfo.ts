import { Coloc, PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { CurrentUser } from "../../../types/prisma-extend";

type Data = boolean;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  const userId = req.body.userId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  let userWithColocs: CurrentUser = null;
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
    },
  });
  prisma.$disconnect();
  console.log(userWithColocs);
  res.status(200).json(result ? true : false);
}
