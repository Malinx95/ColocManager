import { Coloc, Spending, User } from "@prisma/client";

export type CurrentUser =
  | (Omit<User, "password"> & {
      Coloc: Coloc[];
      Spending: Spending[];
    })
  | null;
