import useSWR from "swr";
import Debug from "../../components/debug";
import styles from "../../styles/board.module.scss";
import { useState } from "react";

const url =
  "https://raw.githubusercontent.com/Whatapalaver/bridge-hand-actions/main/data/bridge-hands-skewed.json";
const fetcher = async () => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error();
  }

  return await res.json();
};

function useHands() {
  const { data, error } = useSWR(url, fetcher);
  return {
    hands: data?.deals,
    isError: error,
    isLoading: !data && !error,
  };
}

const DIRECTIONS = ["N", "E", "S", "W"];

export default function Game() {
  const { hands, isLoading, isError } = useHands();
  const [direction, setDirection] = useState("N");
  console.log(hands);

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirection(event.target.value);
  };

  return (
    <div className={styles.cardTable}>
      {DIRECTIONS.map((dir) => {
        return (
          <div className={styles.option} data-selected={dir === direction}>
            <input
              type="radio"
              value={dir}
              id={dir}
              onChange={handleSelection}
              checked={dir === direction}
            />
            <div>{dir}</div>
          </div>
        );
      })}

      <div className={styles.playerHand}>
        {!isLoading && <Debug data={hands[0][direction]} />}
      </div>
    </div>
  );
}
