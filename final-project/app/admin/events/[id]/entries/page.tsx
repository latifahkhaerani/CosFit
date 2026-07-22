import { GetOurEvent } from "@/app/types";

type Props = { params: { id: string } };

async function getEvent(id: string): Promise<GetOurEvent | null> {
  const res = await fetch(`http://localhost:3000/api/admin/events/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function Page({ params }: Props) {
  const id = params.id;
  const event = await getEvent(id);

  if (!event)
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Event not found.
      </div>
    );
  const isContest = (event.category || "").toLowerCase().includes("contest");
  if (!isContest)
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Not a contest event.
      </div>
    );

  const entries = (event as any).entries || [];

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Contest entries</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              {event.eventName}
            </h1>
          </div>
          <p className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            {entries.length} submission{entries.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {entries.length === 0 ? (
          <div className="text-slate-600">No entries yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {entries.map((en: any) => (
              <div
                key={en._id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
              >
                {en.entryImage && (
                  <img
                    src={en.entryImage}
                    alt={en.entryTitle}
                    className="mb-4 h-48 w-full rounded-3xl object-cover"
                  />
                )}
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {en.entryTitle}
                </h3>
                <p className="mb-1 text-sm text-slate-600">By: {en.userId}</p>
                <p className="text-sm font-medium text-slate-700">
                  Votes: {en.voteCount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
