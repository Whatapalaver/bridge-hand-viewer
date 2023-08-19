import Debug from "../../components/debug";
import Hand from "../../components/hand";
import useHand from "../../hooks/useHand";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

import BoardStyles from "../../styles/board.module.scss";

type Cardinality = "N" | "E" | "S" | "W";

export default function GamePage() {
  const router = useRouter();
  const gameId = router.query.id as string | undefined;
  const cardinal = router.query.dir as Cardinality | undefined;
  const { hand, isLoading } = useHand(Number(gameId));

  function selectDir(event: React.ChangeEvent<HTMLInputElement>) {
    router.push(`/games/${gameId}?dir=${event.target.value}`);
  }

  return (
    <div className={BoardStyles.cardTable}>
      <p>Game: {gameId}</p>
      <div>
        <input
          type="radio"
          value="N"
          name="North"
          onChange={selectDir}
          checked={cardinal === "N"}
        />{" "}
        North
        <input
          type="radio"
          value="E"
          name="East"
          onChange={selectDir}
          checked={cardinal === "E"}
        />{" "}
        East
        <input
          type="radio"
          value="S"
          name="South"
          onChange={selectDir}
          checked={cardinal === "S"}
        />{" "}
        South
        <input
          type="radio"
          value="W"
          name="West"
          onChange={selectDir}
          checked={cardinal === "W"}
        />{" "}
        West
      </div>
      <div className={BoardStyles.playerHand}>
        {!isLoading && cardinal && <Hand cards={hand[cardinal]["desc_hand"]} />}
      </div>
    </div>
  );
}
