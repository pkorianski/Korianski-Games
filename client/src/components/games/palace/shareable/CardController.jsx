import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import VisualCard from "../Board/VisualCard";
import { updatePlayerTurn } from "../../../../actions/games/palace/solo/game";

const CardController = ({
  current_hand,
  playerTurn,
  who_am_i,
  updatePlayerTurn,
}) => {
  const onPlay = () => {
    if (playerTurn === who_am_i) {
      console.log("Legal play");
    } else {
      console.log("Not your play");
    }
  };

  const onPickup = () => {
    if (playerTurn === who_am_i) {
      console.log("Legal pickup");
    } else {
      console.log("Not your pickup");
    }
  };

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
  updatePlayerTurn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playerTurn: state.games.palace.playerTurn,
  who_am_i: state.games.palace.who_am_i,
});

export default connect(mapStateToProps, { updatePlayerTurn })(CardController);
