import {
  PALACE_UPDATE_STEP,
  PALACE_SETUP_GAME,
  ADD_SELECTED_CARD,
  REMOVE_SELECTED_CARD,
  SET_TOP_CARDS,
} from "../../../types";
// import { createGameDeck } from "../Palace";

// Export Methods
export const updateStep = (step) => async (dispatch) => {
  dispatch({
    type: PALACE_UPDATE_STEP,
    payload: step,
  });
};

export const setupGame = (username, numberOfOpponents) => async (dispatch) => {
  dispatch({
    type: PALACE_SETUP_GAME,
    payload: {
      username,
      numberOfOpponents,
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

export const setTopCards = (cards) => async (dispatch) => {
  dispatch({
    type: SET_TOP_CARDS,
    payload: cards,
  });
};
