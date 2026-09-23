import { Download } from "lucide-react";
import { RESUME_DOWNLOAD_PATH } from "@/src/lib/resume-path";

type Variant = "primary" | "secondary";

const styles: Record<Variant, string> = {
  primary:
    "inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  secondary:
    "inline-flex items-center gap-2 rounded-full bg-panel px-4 py-2 text-sm text-ink ring-1 ring-line transition-colors hover:ring-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
};

export function ResumeDownloadLink({
  variant = "primary",
  label = "Download resume",
}: {
  variant?: Variant;
  label?: string;
}) {
  return (
    <a
      href={RESUME_DOWNLOAD_PATH}
      download
      className={styles[variant]}
    >
      <Download className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}
