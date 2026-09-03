import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/services";

function ColorDivider() {
  return (
    <div className="flex h-[3px] w-28 overflow-hidden" aria-hidden>
      <span className="w-1/3 bg-ink-red" />
      <span className="w-1/3 bg-[#79c146]" />
      <span className="w-1/3 bg-ink-blue" />
    </div>
  );
}

export default function OtherServicesSection({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const otherServices = SERVICES.filter((service) => service.slug !== currentSlug);

  if (!otherServices.length) return null;

  return (
    <section
      aria-label="Other services"
      className="relative z-10 py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 text-center md:mb-14">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-ink-gray">
            Keep Exploring
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] text-ink-dark md:text-4xl">
            Other Services
          </h2>
          <div className="mx-auto mt-5 w-fit">
            <ColorDivider />
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {otherServices.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[22px] rounded-tr-none border border-black/[0.08] bg-white shadow-[0_14px_32px_rgba(20,20,20,0.08)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(20,20,20,0.14)]"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-[#202020]">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ backgroundColor: service.accent }}
                  />
                </span>
                <span className="flex flex-1 items-center px-5 py-5 md:px-6 md:py-6">
                  <span className="font-display text-lg font-bold leading-snug tracking-[-0.02em] text-ink-dark md:text-xl">
                    {service.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
