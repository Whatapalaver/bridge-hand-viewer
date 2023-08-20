import Hand from "../../components/hand";
import useHand from "../../hooks/useHand";
import { useRouter } from "next/router";

import BoardStyles from "../../styles/board.module.scss";
import PageStyles from "../../styles/pagecontainer.module.scss";

import cx from "classnames";

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
    <>
      <div className={cx(BoardStyles.header)}>
        <div className={cx(BoardStyles.title)}>Bridge Hand Viewer</div>
        <div>Game: {gameId}</div>
      </div>
      <div className={cx(PageStyles.container, PageStyles.fullwidth1024)}>
        <div className={BoardStyles.cardTable}>
          <div className={BoardStyles.options}>
            <label
              className={BoardStyles.option}
              key="N"
              data-selected={cardinal === "N"}
            >
              <input
                type="radio"
                value="N"
                name="North"
                onChange={selectDir}
                checked={cardinal === "N"}
              />
              <div>North</div>
            </label>
            <label
              className={BoardStyles.option}
              key="E"
              data-selected={cardinal === "E"}
            >
              <input
                type="radio"
                value="E"
                name="East"
                onChange={selectDir}
                checked={cardinal === "E"}
              />
              <div>East</div>
            </label>
            <label
              className={BoardStyles.option}
              key="S"
              data-selected={cardinal === "S"}
            >
              <input
                type="radio"
                value="S"
                name="South"
                onChange={selectDir}
                checked={cardinal === "S"}
              />
              <div>South</div>
            </label>
            <label
              className={BoardStyles.option}
              key="W"
              data-selected={cardinal === "W"}
            >
              <input
                type="radio"
                value="W"
                name="West"
                onChange={selectDir}
                checked={cardinal === "W"}
              />
              <div>West</div>
            </label>
          </div>
          <div>
            {!isLoading && cardinal && (
              <Hand cards={hand[cardinal]["desc_hand"]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
