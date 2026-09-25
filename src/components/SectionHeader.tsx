import type { ReactNode } from "react";

export function SectionHeader({
  id,
  title,
  description,
  action,
}: {
  id?: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2
          id={id}
          className="text-sm font-medium tracking-[0.18em] text-accent-dim uppercase"
        >
          {title}
        </h2>
        {description ? (
          <div className="mt-3 max-w-2xl text-base leading-relaxed text-mute">
            {description}
          </div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
