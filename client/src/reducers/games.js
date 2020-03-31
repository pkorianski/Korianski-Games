import { PALACE_UPDATE_STEP, PALACE_SETUP_GAME } from "../actions/types";

const initialState = {
  palace: {
    step: 1,
    number_of_players: null,
    player_list: {
      player1: {
        id: 1,
        username: null,
        robot: null,
        active: null,
        progress: {
          current_hand: [],
          top_3_cards: [],
          bottom_3_cards: []
        }
      },
      player2: {
        id: 2,
        username: null,
        robot: null,
        active: null,
        progress: {
          current_hand: [],
          top_3_cards: [],
          bottom_3_cards: []
        }
      },
      player3: {
        id: 3,
        username: null,
        robot: null,
        active: null,
        progress: {
          current_hand: [],
          top_3_cards: [],
          bottom_3_cards: []
        }
      },
      player4: {
        id: 4,
        username: null,
        robot: null,
        active: null,
        progress: {
          current_hand: [],
          top_3_cards: [],
          bottom_3_cards: []
        }
      }
    },
    who_am_i: null,
    on_table_deck: [],
    game_results: {
      game_won: false,
      game_winner_username: null
    }
  }
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PALACE_UPDATE_STEP:
      return {
        ...state,
        palace: {
          ...state.palace,
          step: payload + 1
        }
      };
    case PALACE_SETUP_GAME:
      return {
        ...state,
        palace: {
          ...state.palace,
          number_of_players: Number(payload.numberOfOpponents),
          who_am_i: payload.username
        }
      };
    default:
      return state;
  }
}
