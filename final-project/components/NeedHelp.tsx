import {
  Headset,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

export default function NeedHelp() {
  return (
    <section className="mt-20">

      <div className="rounded-4xl border border-(--border) bg-white p-8 shadow-sm">

        <div className="grid gap-8 lg:grid-cols-4">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-[#FFF3EF] p-3">

              <Headset
                className="text-(--primary)"
              />

            </div>

            <div>

              <h3 className="font-semibold">
                Need Help?
              </h3>

              <p className="text-sm text-gray-500">
                Our support team is here for you.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-[#FFF3EF] p-3">

              <Headset
                className="text-(--primary)"
              />

            </div>

            <div>

              <h3 className="font-semibold">
                24/7 Support
              </h3>

              <p className="text-sm text-gray-500">
                Fast response anytime.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-[#FFF3EF] p-3">

              <ShieldCheck
                className="text-(--primary)"
              />

            </div>

            <div>

              <h3 className="font-semibold">
                Secure Transactions
              </h3>

              <p className="text-sm text-gray-500">
                Protected payments.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-[#FFF3EF] p-3">

              <BadgeCheck
                className="text-(--primary)"
              />

            </div>

            <div>

              <h3 className="font-semibold">
                Trusted by Cosplayers
              </h3>

              <p className="text-sm text-gray-500">
                Thousands of happy users.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}