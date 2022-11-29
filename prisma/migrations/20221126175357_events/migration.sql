-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "colocId" TEXT,
    CONSTRAINT "Event_colocId_fkey" FOREIGN KEY ("colocId") REFERENCES "Coloc" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
