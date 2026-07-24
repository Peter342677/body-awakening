import Reveal from "@/components/Reveal";
import type { Service } from "@/lib/services";

export default function PricingStub({ items }: { items: Service[] }) {
  return (
    <Reveal>
      <div className="rounded-[20px] border border-[color:var(--line)] overflow-hidden">
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
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.slug} className="border-t border-[color:var(--line)]">
                <td className="py-4 px-6 text-ink">{s.name}</td>
                <td className="py-4 px-6 text-[color:var(--ink-soft)]">
                  {s.duration}
                </td>
                <td className="py-4 px-6 text-[color:var(--ink-soft)]">
                  {s.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
