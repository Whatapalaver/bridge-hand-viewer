import Image from "next/image";

import HandStyles from "../styles/hand.module.scss";
import cx from "classnames";

type Props = {
  cards: string[];
  visible: boolean;
  cardinal: string;
  hcp: string;
};

export default function Hand({ cards, visible, cardinal, hcp }: Props) {
  if (cards === undefined) return null;

  return (
    <div className={HandStyles.playerHand}>
      {visible && <div className={HandStyles.points}>{hcp}</div>}
      <div className={cx(HandStyles.cards)}>
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
    </div>
  );
}
