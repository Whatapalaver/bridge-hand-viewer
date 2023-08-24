import Image from "next/image";

import HandStyles from "../styles/hand.module.scss";
import cx from "classnames";

type Props = {
  cards: string[];
  hand: string;
  visible: boolean;
  cardinal: string;
  hcp: string;
  simple?: boolean;
};

// const SuitLogo = { 0: "spade", 1: "heart", 2: "diamond", 3: "club" };
const SuitLogo = ["spade", "heart", "diamond", "club"];

export default function Hand({
  cards,
  hand,
  visible,
  cardinal,
  hcp,
  simple = false,
}: Props) {
  if (cards === undefined) return null;

  console.log("SIMPS: ", simple);

  return (
    <div className={HandStyles.playerHand}>
      {visible && (
        <div className={cx(HandStyles.points, "shadow-xl")}>
          High Card Points: {hcp}
        </div>
      )}
      {!simple && (
        <div className={cx(HandStyles.fannedCards)}>
          {cards.map((card) => {
            return (
              <div className={HandStyles.card} key={`${cardinal}${card}`}>
                <Image
                  src={
                    visible
                      ? `/images/cardsvg/${card}.svg`
                      : "/images/cardsvg/b.svg"
                  }
                  alt="card"
                  fill
                />
              </div>
            );
          })}
        </div>
      )}
      {simple && (
        <div className={HandStyles.simple}>
          {hand.split(".").map((suit, idx) => {
            return (
              <div className={HandStyles.suitRow} key={idx}>
                <div className="p-3">
                  <Image
                    src={`/images/icons/${SuitLogo[idx]}.svg`}
                    alt="suit"
                    width={35}
                    height={35}
                  />
                </div>
                {visible &&
                  suit.split("").map((value, idx) => {
                    return (
                      <div className={HandStyles.value} key={idx}>
                        {value}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
