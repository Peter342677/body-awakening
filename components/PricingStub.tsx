import Link from "next/link";
import Reveal from "@/components/Reveal";
import { formatDuration, formatPrice, type Service } from "@/lib/services";

export default function PricingStub({ items }: { items: Service[] }) {
  return (
    <Reveal>
      <div className="rounded-[20px] border border-[color:var(--line)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[color:var(--sand)]">
                <th className="py-4 px-6 text-sm uppercase tracking-wide text-[color:var(--ink-soft)]">
                  Session
                </th>
                <th className="py-4 px-6 text-sm uppercase tracking-wide text-[color:var(--ink-soft)]">
                  Duration
                </th>
                <th className="py-4 px-6 text-sm uppercase tracking-wide text-[color:var(--ink-soft)]">
                  Price
                </th>
                <th className="py-4 px-6" />
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.slug} className="border-t border-[color:var(--line)]">
                  <td className="py-4 px-6 text-ink whitespace-nowrap">{s.name}</td>
                  <td className="py-4 px-6 text-[color:var(--ink-soft)] whitespace-nowrap">
                    {formatDuration(s)}
                  </td>
                  <td className="py-4 px-6 text-[color:var(--ink-soft)] whitespace-nowrap">
                    {formatPrice(s)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/book?service=${s.slug}`}
                      className="inline-block rounded-full px-5 py-2 text-xs uppercase tracking-wide text-cream whitespace-nowrap"
                      style={{ backgroundImage: "var(--grad-brand)" }}
                    >
                      Book a Session
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}
