import useSWR from "swr";
const url =
  "https://raw.githubusercontent.com/Whatapalaver/bridge-hand-actions/main/data/bridge-hands-skewed.json";
const fetcher = async () => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error();
  }
  return await res.json();
};

// Hand: Spades, Hearts, Diamonds, Clubs

const suit_mapping = {
  A: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  T: "10",
  J: "j",
  Q: "q",
  K: "k",
};

function getDescriptiveSuit(hand: string) {
  // returns list like ["Ks","9s","6s","Kh","2h","Ad","6d","5d","2d","Tc","7c","4c","2c"]
  let suit_list: string[] = [];
  let hand_list = [];
  if (hand) {
    hand_list = hand.split(".");
    let spades = hand_list[0].split("");
    let hearts = hand_list[1].split("");
    let diamonds = hand_list[2].split("");
    let clubs = hand_list[3].split("");

    suit_list = suit_list.concat(spades.map((c) => `${c}s`));
    suit_list = suit_list.concat(hearts.map((c) => `${c}h`));
    suit_list = suit_list.concat(clubs.map((c) => `${c}c`));
    suit_list = suit_list.concat(diamonds.map((c) => `${c}d`));
  }

  return suit_list;
}

export default function useHand(gameId: number) {
  const { data, error } = useSWR(url, fetcher);
  const hand_data = data?.deals[gameId];
  if (hand_data) {
    hand_data.N.desc_hand = getDescriptiveSuit(hand_data.N.hand);
    hand_data.E.desc_hand = getDescriptiveSuit(hand_data.E.hand);
    hand_data.S.desc_hand = getDescriptiveSuit(hand_data.S.hand);
    hand_data.W.desc_hand = getDescriptiveSuit(hand_data.W.hand);
  }

  return {
    hand: hand_data,
    isError: error,
    isLoading: !data && !error,
  };
}
