import {
  PALACE_UPDATE_STEP,
  PALACE_SETUP_GAME,
  ADD_SELECTED_CARD,
  REMOVE_SELECTED_CARD,
  REMOVE_ALL_SELECTED_CARDS,
  UPDATE_PLAYER_TURN,
} from "../../../types";
// import { createGameDeck } from "../Palace";

// Export Methods
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

export const setupGame = (username) => async (dispatch) => {
  dispatch({
    type: PALACE_SETUP_GAME,
    payload: {
      username,
      current_deck: [],
    },
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
