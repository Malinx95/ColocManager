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
  let userId = req.body.userId;
  console.log("🚀 ~ file: getUserColoc.ts ~ line 16 ~ userId", userId);
  let result = await prisma.coloc.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
  console.log("🚀 ~ file: getUserColoc.ts ~ line 23 ~ result", result);
  prisma.$disconnect();
  res.status(200).json({ hasColoc: result.length > 0, colocs: result });
}
