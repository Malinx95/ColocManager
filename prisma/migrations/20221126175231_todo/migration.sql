-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "colocId" TEXT,
    CONSTRAINT "Todo_colocId_fkey" FOREIGN KEY ("colocId") REFERENCES "Coloc" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
