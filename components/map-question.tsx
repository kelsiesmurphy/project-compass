"use client";
import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

interface MapQuestionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
  onAnswer: (regionName: string) => void;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function MapQuestion({ question, onAnswer }: MapQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (name: string) => {
    setSelected(name);
    onAnswer(name);
  };

  return (
    <div className="space-y-4">
      <p className="text-xl">{question.text}</p>

      <ComposableMap projectionConfig={{ scale: 120 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const isSelected = selected === countryName;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleSelect(countryName)}
                  style={{
                    default: {
                      fill: isSelected ? "#3b82f6" : "#E5E7EB", // blue vs gray
                      outline: "none",
                    },
                    hover: {
                      fill: "#93c5fd", // lighter blue
                      outline: "none",
                    },
                    pressed: {
                      fill: "#2563eb", // darker blue
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
