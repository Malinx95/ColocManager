// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Coloc, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  spendings:
    | {
        name: string;
        username: string;
        amount: number;
        date: string;
      }[]
    | any;
  balance:
    | {
        user: string;
        balance: number;
      }
    | any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  let colocId = req.body.colocId;
  let spendingsResult = await prisma.coloc.findUnique({
    where: {
      id: colocId,
    },
    include: {
      users: true,
      Spending: true,
    },
  });
  prisma.$disconnect();

  // CALCULATE THE BALANCE PER USER
  let amountPerUser = spendingsResult?.users.map((user) => {
    return {
      user: user.username,
      amount: () => {
        let total = 0;
        spendingsResult?.Spending.filter(
          (spending) => spending.userId === user.id
        ).forEach((spend) => {
          total += spend.amount;
        });
        return total;
      },
    };
  });

  let totalAmount = 0;
  amountPerUser?.forEach((a) => {
    totalAmount += a.amount();
  });

  let balancePeruser = amountPerUser?.map((user) => {
    return {
      user: user.user,
      balance: totalAmount / amountPerUser?.length - user.amount(),
    };
  });

  const results = {
    spendings: spendingsResult?.Spending.map((spending) => {
      return {
        username: spendingsResult?.users.find((user) => {
          return user.id === spending.userId;
        })?.username,
        name: spending.name,
        amount: spending.amount,
        date: spending.date,
      };
    }),
    balance: balancePeruser,
  };

  res.status(200).json(results);
}
