import { useRouter } from "next/router";
import { useState } from "react";
import Hand from "../../components/hand";
import useHand from "../../hooks/useHand";

import BoardStyles from "../../styles/board.module.scss";
import BtnStyles from "../../styles/button.module.scss";
import PageStyles from "../../styles/page.module.scss";
import HandStyles from "../../styles/hand.module.scss";

import cx from "classnames";

type Cardinality = "N" | "E" | "S" | "W";

export default function GamePage() {
  const router = useRouter();
  const gameId = router.query.id as string | undefined;
  const cardinal = router.query.dir as Cardinality | undefined;
  const view = router.query.view as string | undefined;
  const { hand, isLoading } = useHand(Number(gameId) - 1);
  const [reveal, setReveal] = useState(false);

  const toggleReveal = () => setReveal((value) => !value);

  function updateQueryParams(query: string, value: any) {
    const url = new URL(window.location.href);
    url.searchParams.set(query, value);
    router.push(url.toString());
  }

  // When new page selected in pagination, we take current path and query params.
  // Then add or modify page param and then navigate to the new route.
  function paginationHandler(forward: boolean) {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    const increment = forward ? 1 : -1;
    const newGameId = Number(gameId) + increment;
    if (newGameId <= 0 || newGameId > 500) {
      return;
    }
    currentQuery.id = String(newGameId);

    router.push(
      {
        pathname: currentPath,
        query: currentQuery,
      },
      undefined,
      { scroll: false }
    );
  }

  function toggleCardView() {
    const newView = view === "simple" ? "card" : "simple";
    updateQueryParams("view", newView);
  }

  return (
    <>
      <div className={cx(BoardStyles.header)}>
        <div className={cx(BoardStyles.title)}>Bridge Hand Viewer</div>
      </div>
      <div className={cx(PageStyles.container)}>
        <div className={cx(PageStyles.controls)}>
          <div className={cx(PageStyles.game)}>Game: {gameId}</div>
          <div className={PageStyles.navigation}>
            <button
              className={cx(BtnStyles.primary, HandStyles.btn)}
              onClick={(e) => {
                paginationHandler(false);
              }}
            >
              Prev
            </button>
            <button
              className={cx(BtnStyles.primary, HandStyles.btn)}
              onClick={(e) => {
                paginationHandler(true);
              }}
            >
              Next
            </button>
          </div>
        </div>

        <div className={BoardStyles.cardTable}>
          <div className={BoardStyles.options}>
            <div className={BoardStyles.partnership}>
              {["N", "S"].map((dir) => (
                <button
                  className={cx(BtnStyles.secondary, HandStyles.btn)}
                  key={dir}
                  data-selected={cardinal === (dir as Cardinality)}
                  onClick={() => updateQueryParams("dir", dir)}
                >
                  {dir}
                </button>
              ))}
            </div>
            <div className={BoardStyles.partnership}>
              {["W", "E"].map((dir) => (
                <button
                  className={cx(BtnStyles.secondary, HandStyles.btn)}
                  key={dir}
                  data-selected={cardinal === (dir as Cardinality)}
                  onClick={() => updateQueryParams("dir", dir)}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>
          {cardinal ? (
            <div className={cx(BoardStyles.displayControls)}>
              <button
                className={cx(BtnStyles.primary, HandStyles.btn)}
                onClick={(e) => {
                  toggleReveal();
                }}
                disabled={!cardinal}
              >
                {" "}
                {reveal ? "Hide" : "Reveal"}
              </button>
              <button
                className={cx(BtnStyles.primary, HandStyles.btn)}
                onClick={(e) => {
                  toggleCardView();
                }}
              >
                {view !== "simple" ? "List View" : "Card View"}
              </button>
            </div>
          ) : (
            <div className={HandStyles.warning}>
              Select your position to reveal your hand
            </div>
          )}

          <div>
            {!isLoading && cardinal && (
              <Hand
                cards={hand[cardinal]["desc_hand"]}
                hand={hand[cardinal]["hand"]}
                visible={reveal}
                cardinal={cardinal}
                hcp={hand[cardinal]["hcp"]}
                simple={view === "simple"}
              />
            )}
          </div>
        </div>
        {!isLoading && <div></div>}
      </div>
    </>
  );
}
