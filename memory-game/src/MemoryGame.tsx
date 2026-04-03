import _ from "lodash";
import { useState } from "react";
import "./MemoryGame.css";

export default function MemoryGame({ images }: { images: string[] }) {
  function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  const duplicated = [...images, ...images];
  const [shuffledArray] = useState(() => _.shuffle(duplicated));

  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.includes(index) ||
      matchedIndices.includes(index) ||
      flippedIndices.length === 2
    ) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (shuffledArray[first] === shuffledArray[second]) {
        setMatchedIndices([...matchedIndices, first, second]);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const groupedArray = chunkArray(shuffledArray, 4);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>MEMORY GAME</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {groupedArray.map((group, groupIndex) => (
          <div key={groupIndex} style={{ display: "flex" }}>
            {group.map((img, imgIndex) => {
              const cardIndex = groupIndex * 4 + imgIndex;
              const isFlipped =
                flippedIndices.includes(cardIndex) ||
                matchedIndices.includes(cardIndex);

              return (
                <div
                  key={cardIndex}
                  className={`card ${isFlipped ? "is-flipped" : ""}`}
                  onClick={() => handleCardClick(cardIndex)}
                >
                  <div className="card-inner">
                    <div className="card-front"></div>
                    <div className="card-back">
                      <img src={img} width={200} height={200} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
