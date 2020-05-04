import {
  PALACE_UPDATE_STEP,
  PALACE_SETUP_GAME,
  ADD_SELECTED_CARD,
  REMOVE_SELECTED_CARD,
  REMOVE_ALL_SELECTED_CARDS,
  UPDATE_PLAYER_TURN,
} from "../actions/types";

const initialState = {
  palace: {
    step: 1,
    playerTurn: null,
    who_am_i: null,
    cards_selected: [],
    game_results: {
      game_won: false,
      game_winner_username: null,
    },
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PLAYER_TURN:
      return {
        ...state,
        palace: {
          ...state.palace,
          playerTurn: payload,
        },
      };
    case PALACE_UPDATE_STEP:
      return {
        ...state,
        palace: {
          ...state.palace,
          step: payload + 1,
        },
      };
    case PALACE_SETUP_GAME:
      return {
        ...state,
        palace: {
          ...state.palace,
          current_deck: payload.current_deck,
          who_am_i: payload.username,
        },
      };
    case ADD_SELECTED_CARD:
      return {
        ...state,
        palace: {
          ...state.palace,
          cards_selected: [payload, ...state.palace.cards_selected],
        },
      };
    case REMOVE_SELECTED_CARD:
      return {
        ...state,
        palace: {
          ...state.palace,
          cards_selected: state.palace.cards_selected.filter(
            (card) => card !== payload
          ),
        },
      };
    case REMOVE_ALL_SELECTED_CARDS:
      return {
        ...state,
        palace: {
          ...state.palace,
          cards_selected: [],
        },
      };

    default:
      return state;
  }
}
