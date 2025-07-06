// components/BackgroundSlideshow.tsx
import { useEffect, useState } from "react";

const images = [
  "/images/summer.jpg",
  "/images/fall.jpg",
  "/images/winter.jpg",
  "/images/spring.jpg",
];

export default function BackgroundSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
            current === i ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Optional overlay for darkening */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
    </div>
  );
}
