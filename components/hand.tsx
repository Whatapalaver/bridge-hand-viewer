import Image from "next/image";
import { useState } from "react";
import BtnStyles from "../styles/button.module.scss";
import HandStyles from "../styles/hand.module.scss";
import cx from "classnames";

type Props = {
  cards: string[];
};

export default function Hand({ cards }: Props) {
  const [reveal, setReveal] = useState(false);
  if (cards === undefined) return null;
  const toggleReveal = () => setReveal((value) => !value);

  return (
    <div className={HandStyles.container}>
      <button
        className={cx(BtnStyles.primary, HandStyles.btn)}
        onClick={(e) => {
          toggleReveal();
        }}
      >
        {" "}
        {reveal ? "Hide" : "Reveal"}
      </button>
      <div className={cx(HandStyles.hand)}>
        {cards.map((card) => {
          return (
            <Image
              src={
                reveal ? `/images/cardsvg/${card}.svg` : "/images/cardsvg/b.svg"
              }
              alt="card"
              width={158}
              height={238}
              key={card}
            />
          );
        })}
      </div>
    </div>
  );
}