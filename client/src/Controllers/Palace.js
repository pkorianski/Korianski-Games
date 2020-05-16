import { v4 as uuidv4 } from "uuid";
import cloneDeep from "lodash/cloneDeep";

let deck_definition = {
  "2C": "go_again",
  "2H": "go_again",
  "2D": "go_again",
  "2S": "go_again",
  "3C": 3,
  "3H": 3,
  "3D": 3,
  "3S": 3,
  "4C": 4,
  "4H": 4,
  "4D": 4,
  "4S": 4,
  "5C": 5,
  "5H": 5,
  "5D": 5,
  "5S": 5,
  "6C": 6,
  "6H": 6,
  "6D": 6,
  "6S": 6,
  "7C": 7,
  "7H": 7,
  "7D": 7,
  "7S": 7,
  "8C": 8,
  "8H": 8,
  "8D": 8,
  "8S": 8,
  "9C": 9,
  "9H": 9,
  "9D": 9,
  "9S": 9,
  "10C": "clear_deck",
  "10H": "clear_deck",
  "10D": "clear_deck",
  "10S": "clear_deck",
  JC: 11,
  JH: 11,
  JD: 11,
  JS: 11,
  QC: 12,
  QH: 12,
  QD: 12,
  QS: 12,
  KC: 13,
  KH: 13,
  KD: 13,
  KS: 13,
  AC: 14,
  AH: 14,
  AD: 14,
  AS: 14,
};

export const create_player = (player, robot) => {
  return {
    id: uuidv4(),
    player_name: player.name,
    img: player.img,
    isRobot: robot,
    face_down_cards: [],
    top_three_cards: [],
    current_hand: [],
  };
};

export const set_current_deck = () => {
  let length_of_deck = Object.keys(deck_definition).length;
  let deck = Array(length_of_deck);
  let current_indexes = [...Array(length_of_deck).keys()];
  Object.keys(deck_definition).forEach((card) => {
    let index = Math.floor(Math.random() * current_indexes.length);
    let chosen = current_indexes[index];
    current_indexes.splice(index, 1);
    deck[chosen] = card;
  });

  return deck;
};

export const deal_cards = (current_deck, player1, player2) => {
  for (let card_number = 0; card_number < 9; card_number++) {
    // Deal to player 1
    if (player1.face_down_cards.length < 3) {
      player1.face_down_cards.push(current_deck[0]);
      current_deck.splice(0, 1);
    } else if (player1.current_hand.length < 6) {
      player1.current_hand.push(current_deck[0]);
      current_deck.splice(0, 1);
    }
    // Deal to player 2
    if (player2.face_down_cards.length < 3) {
      player2.face_down_cards.push(current_deck[0]);
      current_deck.splice(0, 1);
    } else if (player2.current_hand.length < 6) {
      player2.current_hand.push(current_deck[0]);
      current_deck.splice(0, 1);
    }
  }

  return {
    current_deck,
    player1_face_down_cards: player1.face_down_cards,
    player1_current_hand: player1.current_hand,
    player2_face_down_cards: player2.face_down_cards,
    player2_current_hand: player2.current_hand,
  };
};

export const robot_top_three_cards = (player) => {
  let current_hand_converted = player.current_hand.map(
    (c) => deck_definition[c]
  );
  while (true) {
    if (player.top_three_cards.length < 3) {
      if (current_hand_converted.includes("go_again")) {
        for (let card in player.current_hand) {
          if (deck_definition[player.current_hand[card]] === "go_again") {
            player.top_three_cards.push(player.current_hand[card]);
            player.current_hand.splice(card, 1);
          }
        }
        current_hand_converted = current_hand_converted.filter(
          (c) => c !== "go_again"
        );
      } else if (current_hand_converted.includes("clear_deck")) {
        for (let card in player.current_hand) {
          if (deck_definition[player.current_hand[card]] === "clear_deck") {
            player.top_three_cards.push(player.current_hand[card]);
            player.current_hand.splice(card, 1);
          }
        }
        current_hand_converted = current_hand_converted.filter(
          (c) => c !== "clear_deck"
        );
      } else {
        current_hand_converted.sort((a, b) => b - a);
        for (let card in player.current_hand) {
          if (
            deck_definition[player.current_hand[card]] ===
            current_hand_converted[0]
          ) {
            player.top_three_cards.push(player.current_hand[card]);
            player.current_hand.splice(card, 1);
            current_hand_converted.splice(0, 1);
            break;
          }
        }
      }
    } else {
      break;
    }
  }
};

export const determineStartingCard = (player) => {
  let p = cloneDeep(player);

  let selected_card = [...p.current_hand[0]],
    player_hand = [];

  for (let card of p.current_hand) {
    if (!["2C", "2H", "2D", "2S", "10C", "10H", "10D", "10S"].includes(card)) {
      player_hand.push({ sortable_card: deck_definition[card], card });
    }
  }

  player_hand.sort((a, b) => a.sortable_card - b.sortable_card);

  if (player_hand.length) {
    selected_card = player_hand[0].card;
  }

  return selected_card;
};

export const startingTurn = (startingCardsQueue, current_deck, p1, p2) => {
  console.log("What u doin");
  let minIndex = null,
    min = null,
    card = null;

  for (let i in startingCardsQueue) {
    let converted_card = deck_definition[startingCardsQueue[i].card];
    if (min === null) {
      min = converted_card;
      minIndex = i;
      card = startingCardsQueue[i].card;
    } else if (isNaN(Number(min)) && isNaN(Number(converted_card))) {
      break;
    } else if (isNaN(Number(min)) && !isNaN(Number(converted_card))) {
      min = converted_card;
      minIndex = i;
      card = startingCardsQueue[i].card;
      break;
    } else if (min > converted_card) {
      min = converted_card;
      minIndex = i;
      card = startingCardsQueue[i].card;
      break;
    }
  }

  if (p1.id === startingCardsQueue[minIndex].player_id) {
    p1.current_hand = p1.current_hand.filter((filteredCard) => {
      return filteredCard !== card;
    });
    p1.current_hand.push(current_deck.shift());
    return {
      name: p2.player_name,
      card,
    };
  }

  p2.current_hand = p2.current_hand.filter((filteredCard) => {
    return filteredCard !== card;
  });
  p2.current_hand.push(current_deck.shift());
  return {
    name: p1.player_name,
    card,
  };
};

export const canPlayCards = (your_turn, user_cards, table_cards) => {
  if (your_turn) {
    let userCards = user_cards.slice();
    let firstCard = deck_definition[userCards];

    if (!table_cards.length) {
      return true;
    }

    let topCard = deck_definition[table_cards[0]];

    // Wild card case
    if (topCard === "go_again") {
      return true;
    }

    // Check if first card is less than top table card
    if (topCard && firstCard < topCard) {
      return false;
    }

    // Check if all user cards are the same
    for (let card of userCards.slice(1)) {
      console.log(`what is card ${card}`);
      if (deck_definition[card] !== firstCard) {
        return false;
      }
    }

    // Passed all cases
    return true;
  }

  if (!table_cards.length) {
    return false;
  }

  let topCard = deck_definition[table_cards[0]];

  if (topCard === "go_again") {
    return false;
  }

  for (let card of user_cards.slice()) {
    if (deck_definition[card] !== topCard) {
      return false;
    }
  }

  return true;
};
