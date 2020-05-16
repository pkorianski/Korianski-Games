import {
  PALACE_UPDATE_STEP,
  PALACE_SETUP_GAME,
  ADD_SELECTED_CARD,
  REMOVE_SELECTED_CARD,
  REMOVE_ALL_SELECTED_CARDS,
  UPDATE_PLAYER_TURN,
  PALACE_ROBOT_TOP_THREE_CARDS,
  PALACE_ADD_STARTING_CARD,
  PALACE_STARTING_TURN,
  PLAYER_PICKUP_CARDS,
  PLAYER_PLAYS_CARDS,
} from "../types";

import {
  set_current_deck,
  deal_cards,
  create_player,
  robot_top_three_cards,
  determineStartingCard,
  startingTurn,
} from "../../Controllers/Palace";

// @desc Set Palace Game
export const setupGame = (data) => async (dispatch) => {
  // Set Deck
  let currentDeck = set_current_deck();

  let player1 = create_player(data.player1, false);
  let player2 = create_player(data.player2, true);

  const {
    current_deck,
    player1_face_down_cards,
    player1_current_hand,
    player2_face_down_cards,
    player2_current_hand,
  } = deal_cards(currentDeck, player1, player2);

  data.current_deck = current_deck;
  player1.face_down_cards = player1_face_down_cards;
  player1.current_hand = player1_current_hand;
  player2.face_down_cards = player2_face_down_cards;
  player2.current_hand = player2_current_hand;
  data.player1 = player1;
  data.player2 = player2;

  dispatch({
    type: PALACE_SETUP_GAME,
    payload: data,
  });
};

export const pickTopThree = (player) => async (dispatch) => {
  robot_top_three_cards(player);

  dispatch({
    type: PALACE_ROBOT_TOP_THREE_CARDS,
  });
};

export const addStartingCards = (p1, p2, card_selected, current_deck) => async (
  dispatch
) => {
  if (p2 && p2.isRobot) {
    const p2_card = determineStartingCard(p2);
    const queue = [
      {
        player_id: p1.id,
        card: card_selected,
      },
      {
        player_id: p2.id,
        card: p2_card,
      },
    ];
    const { name, card } = startingTurn(queue, current_deck, p1, p2);

    dispatch({
      type: PALACE_STARTING_TURN,
      payload: {
        name,
        card,
      },
    });
  }
};

export const pickupCards = (player_name) => async (dispatch) => {
  dispatch({
    type: PLAYER_PICKUP_CARDS,
    payload: player_name,
  });
};

export const playCards = (player_name, cards) => async (dispatch) => {
  dispatch({
    type: PLAYER_PLAYS_CARDS,
    payload: {
      player_name,
      cards,
    },
  });
};

export const updatePlayerTurn = (playerName) => async (dispatch) => {
  dispatch({
    type: UPDATE_PLAYER_TURN,
    payload: playerName,
  });
};

export const updateStep = (step) => async (dispatch) => {
  dispatch({
    type: PALACE_UPDATE_STEP,
    payload: step,
  });
};

export const addSelectedCard = (card) => async (dispatch) => {
  dispatch({
    type: ADD_SELECTED_CARD,
    payload: card,
  });
};

export const removeSelectedCard = (card) => async (dispatch) => {
  dispatch({
    type: REMOVE_SELECTED_CARD,
    payload: card,
  });
};

export const removeAllSelectedCards = () => async (dispatch) => {
  dispatch({
    type: REMOVE_ALL_SELECTED_CARDS,
  });
};
