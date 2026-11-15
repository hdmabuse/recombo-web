-- CreateEnum
CREATE TYPE "ArtworkType" AS ENUM ('audio', 'video', 'image', 'text', 'installation', 'performance', 'website', 'software');

-- CreateEnum
CREATE TYPE "ArtworkStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('public', 'private', 'restricted');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('festival', 'exposição', 'performance', 'workshop', 'lançamento', 'meetup');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('thumbnail', 'original', 'derivative', 'documentation', 'source');

-- CreateEnum
CREATE TYPE "RelationType" AS ENUM ('inspired_by', 'remix_of', 'collab_with', 'reference_to', 'continuation_of', 'responds_to', 'part_of', 'derivative_of');

-- CreateEnum
CREATE TYPE "TagCategory" AS ENUM ('theme', 'technique', 'location', 'period', 'project');

-- CreateEnum
CREATE TYPE "TranscriptStatus" AS ENUM ('pending', 'in_progress', 'done');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'editor', 'viewer');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('text', 'textarea', 'number', 'date', 'datetime', 'boolean', 'select', 'multiselect', 'url', 'email');

-- CreateEnum
CREATE TYPE "CaptureStatus" AS ENUM ('inbox', 'selected', 'published', 'rejected');

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pseudonym" TEXT,
    "bio" TEXT,
    "bioShort" TEXT,
    "photo" TEXT,
    "email" TEXT,
    "website" TEXT,
    "social" JSONB,
    "roles" TEXT[],
    "period" TEXT,
    "birthDate" TIMESTAMP(3),
    "birthPlace" TEXT,
    "customFields" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "shortDescription" TEXT,
    "type" "ArtworkType" NOT NULL,
    "medium" TEXT,
    "genres" TEXT[],
    "year" INTEGER,
    "yearStart" INTEGER,
    "yearEnd" INTEGER,
    "thumbnail" TEXT,
    "fileUrl" TEXT,
    "fileType" TEXT,
    "fileSize" INTEGER,
    "duration" INTEGER,
    "resolution" TEXT,
    "codec" TEXT,
    "dimensions" TEXT,
    "colors" TEXT,
    "bitDepth" INTEGER,
    "sampleRate" INTEGER,
    "bitrate" INTEGER,
    "channels" TEXT,
    "locationCreated" TEXT,
    "locationCurrent" TEXT,
    "license" TEXT NOT NULL DEFAULT 'LUCR',
    "accessLevel" "AccessLevel" NOT NULL DEFAULT 'public',
    "lyrics" TEXT,
    "director" TEXT,
    "producer" TEXT,
    "cast" JSONB,
    "camera" TEXT,
    "lens" TEXT,
    "aperture" TEXT,
    "shutterSpeed" TEXT,
    "iso" INTEGER,
    "components" JSONB,
    "sensors" TEXT[],
    "performers" TEXT[],
    "iteration" TEXT,
    "status" "ArtworkStatus" NOT NULL DEFAULT 'draft',
    "tags" TEXT[],
    "customFields" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtworkArtist" (
    "id" TEXT NOT NULL,
    "artworkId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "ArtworkArtist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtworkRelation" (
    "id" TEXT NOT NULL,
    "artworkId" TEXT NOT NULL,
    "relatedId" TEXT NOT NULL,
    "type" "RelationType" NOT NULL,

    CONSTRAINT "ArtworkRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtworkFile" (
    "id" TEXT NOT NULL,
    "artworkId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "type" "FileType" NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "duration" INTEGER,
    "bitrate" INTEGER,
    "checksum" TEXT,

    CONSTRAINT "ArtworkFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "program" TEXT,
    "type" "EventType" NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3),
    "venue" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "coordinates" JSONB,
    "photos" TEXT[],
    "videos" TEXT[],
    "press" TEXT[],
    "customFields" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventArtwork" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "artworkId" TEXT NOT NULL,
    "order" INTEGER,

    CONSTRAINT "EventArtwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventParticipant" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "EventParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioUrl" TEXT,
    "videoUrl" TEXT,
    "transcript" TEXT,
    "transcriptStatus" "TranscriptStatus" NOT NULL DEFAULT 'pending',
    "summary" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "interviewer" TEXT,
    "location" TEXT,
    "keywords" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewSubject" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "InterviewSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "TagCategory",
    "color" TEXT,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'editor',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldDefinition" (
    "id" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "options" JSONB,
    "defaultValue" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capture" (
    "id" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "note" TEXT,
    "tags" TEXT[],
    "capturedAt" TIMESTAMP(3),
    "status" "CaptureStatus" NOT NULL DEFAULT 'inbox',
    "accessLevel" "AccessLevel" NOT NULL DEFAULT 'restricted',
    "license" TEXT NOT NULL DEFAULT 'LUCR',
    "highlight" BOOLEAN NOT NULL DEFAULT false,
    "artworkId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Capture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_slug_key" ON "Artist"("slug");

-- CreateIndex
CREATE INDEX "Artist_slug_idx" ON "Artist"("slug");

-- CreateIndex
CREATE INDEX "Artist_name_idx" ON "Artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_slug_key" ON "Artwork"("slug");

-- CreateIndex
CREATE INDEX "Artwork_slug_idx" ON "Artwork"("slug");

-- CreateIndex
CREATE INDEX "Artwork_type_idx" ON "Artwork"("type");

-- CreateIndex
CREATE INDEX "Artwork_year_idx" ON "Artwork"("year");

-- CreateIndex
CREATE INDEX "Artwork_status_idx" ON "Artwork"("status");

-- CreateIndex
CREATE INDEX "Artwork_tags_idx" ON "Artwork"("tags");

-- CreateIndex
CREATE UNIQUE INDEX "ArtworkArtist_artworkId_artistId_key" ON "ArtworkArtist"("artworkId", "artistId");

-- CreateIndex
CREATE UNIQUE INDEX "ArtworkRelation_artworkId_relatedId_key" ON "ArtworkRelation"("artworkId", "relatedId");

-- CreateIndex
CREATE INDEX "ArtworkFile_artworkId_idx" ON "ArtworkFile"("artworkId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_slug_idx" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_dateStart_idx" ON "Event"("dateStart");

-- CreateIndex
CREATE INDEX "Event_type_idx" ON "Event"("type");

-- CreateIndex
CREATE UNIQUE INDEX "EventArtwork_eventId_artworkId_key" ON "EventArtwork"("eventId", "artworkId");

-- CreateIndex
CREATE UNIQUE INDEX "EventParticipant_eventId_artistId_key" ON "EventParticipant"("eventId", "artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Interview_slug_key" ON "Interview"("slug");

-- CreateIndex
CREATE INDEX "Interview_slug_idx" ON "Interview"("slug");

-- CreateIndex
CREATE INDEX "Interview_date_idx" ON "Interview"("date");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewSubject_interviewId_artistId_key" ON "InterviewSubject"("interviewId", "artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE INDEX "Tag_slug_idx" ON "Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "FieldDefinition_entity_idx" ON "FieldDefinition"("entity");

-- CreateIndex
CREATE UNIQUE INDEX "FieldDefinition_entity_name_key" ON "FieldDefinition"("entity", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Capture_snapshotId_key" ON "Capture"("snapshotId");

-- CreateIndex
CREATE INDEX "Capture_status_idx" ON "Capture"("status");

-- CreateIndex
CREATE INDEX "Capture_accessLevel_idx" ON "Capture"("accessLevel");

-- CreateIndex
CREATE INDEX "Capture_artworkId_idx" ON "Capture"("artworkId");

-- AddForeignKey
ALTER TABLE "ArtworkArtist" ADD CONSTRAINT "ArtworkArtist_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtworkArtist" ADD CONSTRAINT "ArtworkArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtworkRelation" ADD CONSTRAINT "ArtworkRelation_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtworkRelation" ADD CONSTRAINT "ArtworkRelation_relatedId_fkey" FOREIGN KEY ("relatedId") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtworkFile" ADD CONSTRAINT "ArtworkFile_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventArtwork" ADD CONSTRAINT "EventArtwork_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventArtwork" ADD CONSTRAINT "EventArtwork_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipant" ADD CONSTRAINT "EventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipant" ADD CONSTRAINT "EventParticipant_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSubject" ADD CONSTRAINT "InterviewSubject_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSubject" ADD CONSTRAINT "InterviewSubject_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capture" ADD CONSTRAINT "Capture_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE SET NULL ON UPDATE CASCADE;

