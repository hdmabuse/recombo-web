-- Lápide de capturas descartadas
CREATE TABLE "CaptureDismissal" (
    "snapshotId" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaptureDismissal_pkey" PRIMARY KEY ("snapshotId")
);
