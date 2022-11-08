// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Coloc, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  hasColoc: boolean;
  colocs: Coloc[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  let userId = parseInt(req.body.userId);
  let result = await prisma.coloc.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
  prisma.$disconnect();
  res.status(200).json({ hasColoc: result.length > 0, colocs: result });
}
