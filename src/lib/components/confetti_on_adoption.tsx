import React, { useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import Marquee from "react-fast-marquee";

/**
 * This Component is used whenever a section or widget has no data to display.
 * It displays a ban icon and a (custom) title.
 */

export default function ConfettiOnAdoption({
  adoptionDate,
  title = "Unbekannt",
  committee = "Unbekannt",
  durationSeconds = 60,
}: {
  adoptionDate?: Date | null;
  title?: string;
  committee?: string;
  durationSeconds?: number;
}) {
  const [timeDifference, setTimeDifference] = useState<number>();

  useEffect(() => {
    if (adoptionDate) {
      const interval = setInterval(() => {
        setTimeDifference(
          new Date().getTime() - new Date(adoptionDate).getTime(),
        );
      }, 500);
      return () => clearInterval(interval);
    }
  }, [adoptionDate, timeDifference]);

  if (!adoptionDate || !timeDifference) return null;
  if (timeDifference > durationSeconds * 1000) return null;
  return (
    <div className="pointer-events-none fixed top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center">
      <Realistic autorun={{ speed: 0.7 }} />
      <div className="fixed top-2/3 right-0 left-0 flex h-32 items-center justify-center bg-primary-200 font-mono text-3xl font-bold text-white">
        <Marquee autoFill speed={120}>
          <span className="mx-18">+++</span>Resolution zum Thema
          <span className="mx-4 italic">"{title}"</span>im Gremium{" "}
          <span className="mx-4 italic">{committee}</span> verabschiedet
        </Marquee>
      </div>
    </div>
  );
}
