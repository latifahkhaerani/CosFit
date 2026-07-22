import EventForm from "@/components/admin/EventForm";

export const metadata = {
  title: "Create Event | Admin",
};

export default function CreateEventPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <EventForm />
    </section>
  );
}
