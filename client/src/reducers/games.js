import {
  PALACE_UPDATE_STEP,
  PALACE_SETUP_GAME,
  ADD_SELECTED_CARD,
  REMOVE_SELECTED_CARD,
  REMOVE_ALL_SELECTED_CARDS,
  UPDATE_PLAYER_TURN,
  PALACE_ADD_STARTING_CARD,
  PALACE_STARTING_TURN,
  PLAYER_PICKUP_CARDS,
  PLAYER_PLAYS_CARDS,
} from "../actions/types";

const initialState = {
  palace: {
    play_type: null,
    step: 1,
    playerTurn: null,
    who_am_i: null,
    cards_selected: [],
    game: {
      starting_card_queue: [],
      table_cards: [],
      current_deck: [],
      player1: {},
      player2: {},
    },
    game_results: {
      game_won: false,
      game_winner_username: null,
    },
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PALACE_SETUP_GAME:
      return {
        ...state,
        palace: {
          ...state.palace,
          play_type: payload.play_type,
          who_am_i: payload.player1.player_name,
          cards_selected: [],
          game: {
            ...state.palace.game,
            current_deck: payload.current_deck,
            player1: payload.player1,
            player2: payload.player2,
          },
        },
      };
    case PALACE_ADD_STARTING_CARD:
      return {
        ...state,
        palace: {
          ...state.palace,
          game: {
            ...state.palace.game,
            starting_card_queue: [
              payload,
              ...state.palace.game.starting_card_queue,
            ],
          },
        },
      };
    case PALACE_STARTING_TURN:
      return {
        ...state,
        palace: {
          ...state.palace,
          step: state.palace.step + 1,
          playerTurn: payload.name,
          cards_selected: [],
          game: {
            ...state.palace.game,
            table_cards: [payload.card, ...state.palace.game.table_cards],
          },
        },
      };
    case PLAYER_PLAYS_CARDS:
      return {
        ...state,
        palace: {
          ...state.palace,
          cards_selected: [],
          playerTurn:
            payload.player_name === state.palace.playerTurn
              ? payload.player_name === state.palace.game.player1.player_name
                ? state.palace.game.player2.player_name
                : state.palace.game.player1.player_name
              : state.palace.playerTurn,
          game: {
            ...state.palace.game,
            table_cards: [...payload.cards, ...state.palace.game.table_cards],
            player1: {
              ...state.palace.game.player1,
              current_hand:
                payload.player_name === state.palace.game.player1.player_name
                  ? state.palace.game.player1.current_hand.filter(
                      (c) => !payload.cards.includes(c)
                    )
                  : state.palace.game.player1.current_hand,
              top_three_cards: state.palace.game.player1.player_name
                ? state.palace.game.player1.top_three_cards.filter(
                    (c) => !payload.cards.includes(c)
                  )
                : state.palace.game.player1.top_three_cards,
            },
            player2: {
              ...state.palace.game.player2,
              current_hand:
                payload.player_name === state.palace.game.player2.player_name
                  ? state.palace.game.player2.current_hand.filter(
                      (c) => !payload.cards.includes(c)
                    )
                  : state.palace.game.player2.current_hand,
              top_three_cards: state.palace.game.player2.player_name
                ? state.palace.game.player2.top_three_cards.filter(
                    (c) => !payload.cards.includes(c)
                  )
                : state.palace.game.player2.top_three_cards,
            },
          },
        },
      };
    case PLAYER_PICKUP_CARDS:
      return {
        ...state,
        palace: {
          ...state.palace,
          cards_selected: [],
          playerTurn:
            payload === state.palace.game.player1.player_name
              ? state.palace.game.player2.player_name
              : state.palace.game.player1.player_name,
          game: {
            ...state.palace.game,
            player1: {
              ...state.palace.game.player1,
              current_hand:
                payload === state.palace.game.player1.player_name
                  ? [
                      ...state.palace.game.player1.current_hand,
                      ...state.palace.game.table_cards,
                    ]
                  : state.palace.game.player1.current_hand,
            },
            player2: {
              ...state.palace.game.player2,
              current_hand:
                payload === state.palace.game.player2.player_name
                  ? [
                      ...state.palace.game.player2.current_hand,
                      ...state.palace.game.table_cards,
                    ]
                  : state.palace.game.player2.current_hand,
            },
            table_cards: [],
          },
        },
      };
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
