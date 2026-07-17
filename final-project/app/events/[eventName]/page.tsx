import { notFound } from "next/navigation";
import EventDetailHero from "@/components/events/EventDetailHero";
import EventDetailInfo from "@/components/events/EventDetailInfo";
import EventForumPreview from "@/components/events/EventForumPreview";
import DesignChallengeForm from "@/components/events/DesignChallengeForm";
import OurEventModel from "@/app/db/models/ourEventModel";
import ForumModel from "@/app/db/models/forumModel";
import serializeEvent from "@/app/helpers/serializeEvent";
import serializeRoom from "@/app/helpers/serializeRoom";
import type { GetRoom } from "@/app/types";

export const dynamic = "force-dynamic";

interface EventDetailPageProps {
  params: Promise<{ eventName: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { eventName } = await params;

  let doc;
  try {
    doc = await OurEventModel.getEventById(eventName);
  } catch {
    doc = null;
  }

  if (!doc) notFound();

  const event = serializeEvent(doc);

  let forum: GetRoom | null = null;
  if (event.forumId) {
    try {
      const forumDoc = await ForumModel.getForumById(event.forumId);
      forum = forumDoc ? serializeRoom(forumDoc) : null;
    } catch {
      forum = null;
    }
  }

  return (
    <main className="page-container space-y-10">
      <EventDetailHero event={event} />
      <EventDetailInfo event={event} />
      {event.category === "Fashion Design" ? <DesignChallengeForm /> : null}
      <EventForumPreview forum={forum} />
    </main>
  );
}
