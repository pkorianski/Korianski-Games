import { PALACE_UPDATE_STEP, PALACE_SETUP_GAME } from "../../../types";

// Private methods
const createGameDeck = () => async dispatch => {};

// Export Methods
export const updateStep = step => async dispatch => {
  dispatch({
    type: PALACE_UPDATE_STEP,
    payload: step
  });
};

export const setupGame = (username, numberOfOpponents) => async dispatch => {
  dispatch({
    type: PALACE_SETUP_GAME,
    payload: {
      username,
      numberOfOpponents
    }
  });
};
