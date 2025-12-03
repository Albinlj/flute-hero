import type { Route } from "./+types/fingerings";
import { Flute } from "../../flute";
import { fingerings, getPreferredFingering, type Key } from "../../fingering";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Flute Fingerings" },
    { name: "description", content: "Complete flute fingering chart" },
  ];
}

export default function Fingerings() {
  // Group fingerings by octave
  const fingeringsByOctave = fingerings.reduce((acc, fingering) => {
    if (!acc[fingering.octave]) {
      acc[fingering.octave] = [];
    }
    acc[fingering.octave].push(fingering);
    return acc;
  }, {} as Record<number, typeof fingerings>);

  // Sort octaves
  const octaves = Object.keys(fingeringsByOctave)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="fingerings-page" style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "2rem", fontSize: "2rem", fontWeight: "bold" }}>
        Flute Fingerings Chart
      </h1>

      {octaves.map((octave) => {
        const octaveFingerings = fingeringsByOctave[octave];
        
        return (
          <div key={octave} style={{ marginBottom: "3rem" }}>
            <h2 style={{ 
              fontSize: "1.5rem", 
              fontWeight: "bold", 
              marginBottom: "1.5rem",
              paddingBottom: "0.5rem",
              borderBottom: "2px solid #e0e0e0"
            }}>
              Octave {octave}
            </h2>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}>
              {octaveFingerings.map((fingering) => {
                const preferredFingering = getPreferredFingering(fingering.note, fingering.octave);
                
                return (
                  <div
                    key={`${fingering.note}-${fingering.octave}`}
                    style={{
                      backgroundColor: "white",
                      padding: "1.5rem",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <h3 style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#333",
                      minWidth: "80px",
                    }}>
                      {fingering.note}
                      <sub style={{ fontSize: "0.75em", marginLeft: "0.25rem" }}>
                        {fingering.octave}
                      </sub>
                    </h3>
                    {preferredFingering ? (
                      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                        <Flute keys={preferredFingering.keys} />
                      </div>
                    ) : (
                      <div style={{ flex: 1, padding: "1rem", color: "#666", textAlign: "center" }}>
                        No fingering available
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

