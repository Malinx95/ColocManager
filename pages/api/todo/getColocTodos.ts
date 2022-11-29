// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Coloc, PrismaClient, Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Todo[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  let colocId = req.body.colocId;
  let result = await prisma.todo.findMany({
    where: {
      colocId: colocId,
    },
  });
  prisma.$disconnect();
  res.status(200).json(result);
}
