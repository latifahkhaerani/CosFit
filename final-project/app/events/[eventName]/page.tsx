import EventDetailHero from "@/components/events/EventDetailHero";
import EventDetailInfo from "@/components/events/EventDetailInfo";
import type { GetOurEvent } from "@/app/types";

interface EventDetailPageProps {
  params: Promise<{ eventName: string }>;
}

async function getEventByName(eventName: string): Promise<GetOurEvent> {
  return {
    _id: eventName,
    eventName: "",
    category: "",
    imgUrl: "",
    forumId: "",
    description: "",
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { eventName } = await params;
  const event = await getEventByName(eventName);

  return (
    <main className="page-container space-y-10">
      <EventDetailHero event={event} />
      <EventDetailInfo event={event} />
    </main>
  );
}
