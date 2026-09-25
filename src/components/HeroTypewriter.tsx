"use client";

import { useEffect, useState } from "react";
import { profile } from "@/src/data/profile";

const PHRASES = [
  profile.name,
  "an aspiring software engineer",
  "a Master of Information Technology student at UNSW",
];

const HOLD_MS = 5000;
const TYPE_MS = 45;
const DELETE_MS = 28;

export function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setText(PHRASES[0]);
      return;
    }

    const target = PHRASES[phraseIndex];

    if (!deleting && text === target) {
      const hold = window.setTimeout(() => setDeleting(true), HOLD_MS);
      return () => window.clearTimeout(hold);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
      return;
    }

    const tick = window.setTimeout(
      () => {
        if (deleting) {
          setText(target.slice(0, text.length - 1));
        } else {
          setText(target.slice(0, text.length + 1));
        }
      },
      deleting ? DELETE_MS : TYPE_MS,
    );

    return () => window.clearTimeout(tick);
  }, [text, deleting, phraseIndex, reduceMotion]);

  return (
    <h1 className="mt-6 min-h-[1.2em] font-display text-3xl font-light tracking-tight text-ink sm:min-h-[1.15em] sm:text-5xl lg:text-6xl">
      <span className="sr-only">
        Hi, I am {profile.name}. {PHRASES.join(". ")}
      </span>
      <span aria-hidden className="text-mute">
        Hi, I am{" "}
      </span>
      <span aria-hidden className="text-ink">
        {text}
      </span>
      {!reduceMotion ? (
        <span
          aria-hidden
          className="ml-0.5 inline-block w-[3px] animate-pulse bg-accent align-middle motion-reduce:animate-none"
          style={{ height: "0.85em" }}
        />
      ) : null}
    </h1>
  );
}
