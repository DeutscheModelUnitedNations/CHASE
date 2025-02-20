import { useEffect, useState } from "react";

export function useFaGlobe() {
  const [icon, setIcon] = useState<string>("earth-oceania");

  useEffect(() => {
    // random out of this list
    const icons = [
      "earth-oceania",
      "earth-asia",
      "earth-africa",
      "earth-americas",
      "earth-europe",
    ];

    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    setIcon(randomIcon);
  }, []);

  return icon;
}
