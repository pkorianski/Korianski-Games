import {
  PALACE_UPDATE_STEP,
  PALACE_SETUP_GAME,
  ADD_SELECTED_CARD,
  REMOVE_SELECTED_CARD,
  SET_TOP_CARDS,
} from "../actions/types";

const initialState = {
  palace: {
    step: 1,
    number_of_players: null,
    table_cards: [],
    current_deck: [],
    player_list: [
      {
        id: 1,
        username: null,
        robot: null,
        active: null,
        progress: {
          current_hand: [],
          top_3_cards: [],
          bottom_3_cards: [],
        },
      },
      {
        id: 2,
        username: null,
        robot: null,
        active: null,
        progress: {
          current_hand: [],
          top_3_cards: [],
          bottom_3_cards: [],
        },
      },
      {
        id: 3,
        username: null,
        robot: null,
        active: null,
        progress: {
          current_hand: [],
          top_3_cards: [],
          bottom_3_cards: [],
        },
      },
      {
        id: 4,
        username: null,
        robot: null,
        active: null,
        progress: {
          current_hand: [],
          top_3_cards: [],
          bottom_3_cards: [],
        },
      },
    ],
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
          number_of_players: Number(payload.numberOfOpponents),
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
    case SET_TOP_CARDS:
      return {
        ...state,
        palace: {
          ...state.palace,
          player_list: {
            ...state.palace.player_list,
            ...state.palace.player_list,
          },
        },
      };

    default:
      return state;
  }
}
