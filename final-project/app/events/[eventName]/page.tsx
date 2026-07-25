import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import EventDetailHero from "@/components/events/EventDetailHero";
import EventDetailInfo from "@/components/events/EventDetailInfo";
import EventForumPreview, {
  type EventDiscussionMessage,
} from "@/components/events/EventForumPreview";
import DesignChallengeForm from "@/components/events/DesignChallengeForm";
import OurEventModel from "@/db/models/ourEventModel";
import UserDesignModel from "@/db/models/userDesignModel";
import ForumModel from "@/db/models/forumModel";
import serializeEvent from "@/app/helpers/serializeEvent";
import serializeRoom from "@/app/helpers/serializeRoom";
import serializeUserDesign from "@/app/helpers/serializeUserDesign";
import type { GetRoom } from "@/app/types";

export const dynamic = "force-dynamic";

interface EventDetailPageProps {
  params: Promise<{ eventName: string }>;
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { eventName: slug } = await params;

  let doc;
  try {
    doc = await OurEventModel.getEventBySlug(slug);
  } catch {
    doc = null;
  }

  if (!doc) notFound();

  const event = serializeEvent(doc);
  const cookieStore = await cookies();
  const contestEntries =
    event.eventType === "internal_contest"
      ? (await UserDesignModel.getByEventId(event._id)).map((entry) =>
          serializeUserDesign(entry as Record<string, unknown>),
        )
      : [];

  let forum: GetRoom | null = null;
  let initialMessages: EventDiscussionMessage[] = [];
  let currentUser = "";
  if (event.forumId) {
    try {
      const forumDoc = await ForumModel.getForumById(event.forumId);
      forum = forumDoc ? serializeRoom(forumDoc) : null;

      if (forum?._id) {
        try {
          const chatRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${forum._id}`,
            {
              headers: {
                Cookie: cookieStore.toString(),
              },
              cache: "no-store",
            },
          );

          if (chatRes.ok) {
            const chatData = await chatRes.json();
            initialMessages = Array.isArray(chatData?.message)
              ? chatData.message
              : [];
            currentUser = chatData?.username || "";
          }
        } catch {
          initialMessages = [];
          currentUser = "";
        }
      }
    } catch {
      forum = null;
    }
  }

  return (
    <main className="page-container space-y-10">
      <EventDetailHero event={event} />
      <EventDetailInfo event={event} />
      {event.eventType === "internal_contest" ? (
        <DesignChallengeForm
          eventId={event._id}
          entryCount={contestEntries.length}
          maxEntries={event.maxEntries}
          contestEntries={contestEntries}
        />
      ) : null}
      <EventForumPreview
        forum={forum}
        initialMessages={initialMessages}
        currentUser={currentUser}
      />
    </main>
  );
}
