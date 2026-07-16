import Footer from "@/components/Footer";
import CategoryCard from "@/components/events/CategoryCard";
import CommunityGallery from "@/components/events/CommunityGallery";
import EventNewsletter from "@/components/events/EventNewsletter";
import FeaturedEventCard from "@/components/events/FeaturedEventCard";
import FeaturedWinnerCard from "@/components/events/FeaturedWinnerCard";

import HeroEvent from "@/components/events/HeroEvent";
import PastEventCard from "@/components/events/PastEventCard";
import EventsClient from "@/components/events/EventsClient";
import { Trophy, Shirt, Scissors, Camera, Ticket, Users } from "lucide-react";

export default function EventsPage() {
  return (
    <>
      <main className="page-container space-y-14">
        <HeroEvent />

        <FeaturedEventCard />

        {/* upcoming events (join event flow) */}
        <EventsClient />

        {/* category */}
        <section>
          <div className="mb-8">
            <h2 className="card-title">Explore by Category</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-6">
            <CategoryCard
              title="Contest"
              color="#D95D4F"
              icon={<Trophy size={34} />}
            />

            <CategoryCard
              title="Fashion"
              color="#EC4899"
              icon={<Shirt size={34} />}
            />

            <CategoryCard
              title="Workshop"
              color="#F59E0B"
              icon={<Scissors size={34} />}
            />

            <CategoryCard
              title="Photoshoot"
              color="#3B82F6"
              icon={<Camera size={34} />}
            />

            <CategoryCard
              title="Convention"
              color="#10B981"
              icon={<Ticket size={34} />}
            />

            <CategoryCard
              title="Gathering"
              color="#8B5CF6"
              icon={<Users size={34} />}
            />
          </div>
        </section>

        {/* past event */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="card-title">Past Events</h2>

            <button className="secondary-btn">View All</button>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            <PastEventCard
              image="/images/events/past1.jpg"
              title="CosFit Winter Gathering"
              participants="680+"
            />

            <PastEventCard
              image="/images/events/past2.jpg"
              title="Prop Making Contest"
              participants="450+"
            />

            <PastEventCard
              image="/images/events/past3.jpg"
              title="CosFit Easter Parade"
              participants="1,100+"
            />

            <PastEventCard
              image="/images/events/past4.jpg"
              title="Photography Contest"
              participants="780+"
            />
          </div>
        </section>
{/* Featured Winners */}

<section>

  <div className="mb-8">

    <h2 className="card-title">

      Hall of Fame

    </h2>

  </div>

  <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">

    <FeaturedWinnerCard
      image="/images/winner1.jpg"
      name="Akira"
      character="Raiden Shogun"
      likes={1240}
    />

    <FeaturedWinnerCard
      image="/images/winner2.jpg"
      name="Luna"
      character="2B"
      likes={987}
    />

    <FeaturedWinnerCard
      image="/images/winner3.jpg"
      name="Niko"
      character="Gojo"
      likes={1634}
    />

    <FeaturedWinnerCard
      image="/images/winner4.jpg"
      name="Rin"
      character="Makima"
      likes={1498}
    />

  </div>

</section>

<CommunityGallery />

<EventNewsletter />
      </main>
    </>
  );
}
