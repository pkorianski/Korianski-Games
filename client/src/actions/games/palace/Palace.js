/*

    General Palace functions used in both Solo & Online

*/
import { v4 as uuidv4 } from "uuid";

export default class Palace {
  constructor(player1, player2) {
    this.table_cards = [];
    this.current_deck = [];
    this.player_queue = [];
    this.player1 = {
      id: uuidv4(),
      player_name: player1.name,
      img: player1.img,
      isRobot: false,
      face_down_cards: [],
      top_three_cards: [],
      current_hand: [],
    };
    this.player_queue.push(this.player1);
    this.player2 = {
      id: uuidv4(),
      player_name: player2.name,
      img: player2.img,
      isRobot: true,
      face_down_cards: [],
      top_three_cards: [],
      current_hand: [],
    };
    this.player_queue.push(this.player2);
    this.startingCardsQueue = [];
    this.playerTurn = null;
    this.deck_definition = {
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
  }

  set_deck() {
    if (this.current_deck.length === 0) {
      let length_of_deck = Object.keys(this.deck_definition).length;
      let deck = Array(length_of_deck);
      let current_indexes = [...Array(length_of_deck).keys()];
      Object.keys(this.deck_definition).forEach((card) => {
        let index = Math.floor(Math.random() * current_indexes.length);
        let chosen = current_indexes[index];
        current_indexes.splice(index, 1);
        deck[chosen] = card;
      });

      this.current_deck = deck;
    } else {
      console.log("Already fucking shuffled");
    }
  }

  players() {
    console.log(
      `player1 -> ${JSON.stringify(this.player1)}\nplayer2 -> ${JSON.stringify(
        this.player2
      )}`
    );
  }

  deal_cards() {
    let card_number = 0;
    let total_cards_dealt = 9;
    console.log(total_cards_dealt);

    while (card_number < total_cards_dealt) {
      // Deal to player 1
      if (this.player1.face_down_cards.length < 3) {
        this.player1.face_down_cards.push(this.current_deck[0]);
        this.current_deck.splice(0, 1);
      } else if (this.player1.current_hand.length < 6) {
        this.player1.current_hand.push(this.current_deck[0]);
        this.current_deck.splice(0, 1);
      }
      // Deal to player 2
      if (this.player2.face_down_cards.length < 3) {
        this.player2.face_down_cards.push(this.current_deck[0]);
        this.current_deck.splice(0, 1);
      } else if (this.player2.current_hand.length < 6) {
        this.player2.current_hand.push(this.current_deck[0]);
        this.current_deck.splice(0, 1);
      }
      card_number += 2;
    }
  }

  pick_top_three() {
    for (let player of this.player_queue) {
      let current_hand_converted = player.current_hand.map(
        (c) => this.deck_definition[c]
      );
      while (true) {
        if (player.top_three_cards.length < 3) {
          if (current_hand_converted.includes("go_again")) {
            for (let card in player.current_hand) {
              if (
                this.deck_definition[player.current_hand[card]] === "go_again"
              ) {
                player.top_three_cards.push(player.current_hand[card]);
                player.current_hand.splice(card, 1);
              }
            }
            current_hand_converted = current_hand_converted.filter(
              (c) => c !== "go_again"
            );
          } else if (current_hand_converted.includes("clear_deck")) {
            for (let card in player.current_hand) {
              if (
                this.deck_definition[player.current_hand[card]] === "clear_deck"
              ) {
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
                this.deck_definition[player.current_hand[card]] ===
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
    }
    this.players();
  }

  addStartingCard(data) {
    this.startingCardsQueue.push(data);
  }

  determineRobotStartingCard() {
    let selected_card = this.player2.current_hand[0],
      player_hand = [];

    for (let card of this.player2.current_hand) {
      if (
        !["2C", "2H", "2D", "2S", "10C", "10H", "10D", "10S"].includes(card)
      ) {
        player_hand.push({ sortable_card: this.deck_definition[card], card });
      }
    }

    player_hand.sort((a, b) => a.sortable_card - b.sortable_card);

    if (player_hand.length) {
      selected_card = player_hand[0].card;
    }

    this.addStartingCard({
      player_id: this.player2.id,
      card: selected_card,
    });
  }

  setCardOnTable = (card) => {
    this.table_cards.unshift(card);
  };

  determineStartingTurn() {
    let minIndex = null,
      min = null,
      card = null;
    console.log(this.startingCardsQueue);
    for (let i in this.startingCardsQueue) {
      let converted_card = this.deck_definition[
        this.startingCardsQueue[i].card
      ];
      if (min === null) {
        min = converted_card;
        minIndex = i;
        card = this.startingCardsQueue[i].card;
      } else if (isNaN(Number(min)) && isNaN(Number(converted_card))) {
        break;
      } else if (isNaN(Number(min)) && !isNaN(Number(converted_card))) {
        min = converted_card;
        minIndex = i;
        card = this.startingCardsQueue[i].card;
        break;
      } else if (min > converted_card) {
        min = converted_card;
        minIndex = i;
        card = this.startingCardsQueue[i].card;
        break;
      }
    }

    if (this.player1.id === this.startingCardsQueue[minIndex].player_id) {
      this.setCardOnTable(card);

      // Filter out selected card for now
      this.player1.current_hand = this.player1.current_hand.filter(
        (filteredCard) => {
          return filteredCard !== card;
        }
      );
      console.log(`Player 1 dropped card ${card} on table`);
      console.log(`Player 1 picks up card ${this.current_deck[0]}`);
      this.player1.current_hand.push(this.current_deck[0]);
      console.log(`Player 2's turn`);
      this.playerTurn = this.player2.player_name;
      return this.player2.player_name;
    }

    this.setCardOnTable(card);

    // Filter out selected card for now
    this.player2.current_hand = this.player2.current_hand.filter(
      (filteredCard) => {
        return filteredCard !== card;
      }
    );
    console.log(`Player 2 dropped card ${card} on table`);
    console.log(`Player 2 picks up card ${this.current_deck[0]}`);
    this.player2.current_hand.push(this.current_deck[0]);
    console.log(`Player 1's turn`);
    this.playerTurn = this.player1.player_name;
    return this.player1.player_name;
  }

  robotTurn() {
    console.log("Robot turn");
  }
}
