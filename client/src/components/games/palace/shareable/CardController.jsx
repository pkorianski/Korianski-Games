import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import VisualCard from "../Board/VisualCard";
import {
  updatePlayerTurn,
  pickupCards,
  playCards,
} from "../../../../actions/games/game";
import { canPlayCards } from "../../../../Controllers/Palace";

const CardController = ({
  current_hand,
  playerTurn,
  who_am_i,
  player1,
  player2,
  updatePlayerTurn,
  table_cards,
  cards_selected,
  pickupCards,
  playCards,
}) => {
  let [play, setPlay] = useState(false);

  const onPlay = () => {
    if (playerTurn === who_am_i) {
      let cards = cards_selected.slice();
      playCards(who_am_i, cards);
    } else {
      let cards = cards_selected.slice();
      playCards(who_am_i, cards);
    }
  };

  const onPickup = () => {
    pickupCards(who_am_i);
  };

  const handlePlay = () => {
    if (cards_selected.length) {
      let res = !canPlayCards(
        playerTurn === who_am_i,
        cards_selected,
        table_cards
      );
      setPlay(res);
    } else {
      setPlay(true);
    }
  };

  useEffect(() => {
    handlePlay();
  }, [cards_selected]);

  return (
    <div
      className="user-controller"
      style={{
        backgroundColor: "lightgray",
        width: "34em",
        height: "6.5em",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1em",
        borderRadius: "25px",
        border: "2px solid black",
        boxShadow: "1px 2px",
        position: "relative",
      }}
    >
      <div
        style={{
          paddingTop: "0.5em",
          paddingLeft: "1em",
          margin: "auto",
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div id="buttons" style={{ float: "left" }}>
          <ul style={{ listStyle: "none", paddingLeft: "0.5em" }}>
            <li>
              <Button
                className="user-controller-button"
                style={{
                  width: "7.5em",
                }}
                outline
                color="success"
                size="md"
                onClick={onPlay}
                disabled={play}
              >
                PLAY
              </Button>
            </li>
            <li>
              <Button
                className="user-controller-button"
                style={{
                  marginTop: "0.5em",
                  width: "7.5em",
                }}
                outline
                color="danger"
                size="md"
                onClick={onPickup}
                disabled={playerTurn !== who_am_i}
              >
                PICKUP
              </Button>
            </li>
          </ul>
        </div>
        <div
          style={{
            float: "left",
            fontSize: "3em",
            marginLeft: "0.2em",
            marginRight: "0.2em",
          }}
        >
          |
        </div>
        <div style={{ float: "left" }}>
          {current_hand.map((card) => (
            <VisualCard key={card} card={card} clickable={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

CardController.propTypes = {
  playerTurn: PropTypes.string,
  who_am_i: PropTypes.string,
  player1: PropTypes.object.isRequired,
  player2: PropTypes.object.isRequired,
  cards_selected: PropTypes.array.isRequired,
  table_cards: PropTypes.array.isRequired,
  updatePlayerTurn: PropTypes.func.isRequired,
  pickupCards: PropTypes.func.isRequired,
  playCards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playerTurn: state.games.palace.playerTurn,
  who_am_i: state.games.palace.who_am_i,
  cards_selected: state.games.palace.cards_selected,
  player1: state.games.palace.player1,
  player2: state.games.palace.player2,
  table_cards: state.games.palace.game.table_cards,
});

export default connect(mapStateToProps, {
  updatePlayerTurn,
  pickupCards,
  playCards,
})(CardController);
