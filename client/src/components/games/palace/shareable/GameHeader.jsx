import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const GameHeader = ({ step, online, playerTurn, who_am_i }) => {
  return (
    <Fragment>
      <h1
        className="game-title"
        style={{ textAlign: "center", marginTop: "1em" }}
      >
        {`Palace (${online ? "Online" : "Solo"} Play)`.toUpperCase()}
      </h1>
      {step >= 3 && (
        <h6 className="kg-font" style={{ textAlign: "center" }}>
          TURN:
          {playerTurn === who_am_i ? (
            <span
              style={{
                color: "green",
              }}
            >
              You
            </span>
          ) : (
            <span style={{ color: "red" }}>{playerTurn}</span>
          )}
        </h6>
      )}
    </Fragment>
  );
};

GameHeader.propTypes = {
  step: PropTypes.number.isRequired,
  playerTurn: PropTypes.string,
  who_am_i: PropTypes.string,
};

const mapStateToProps = (state) => ({
  step: state.games.palace.step,
  playerTurn: state.games.palace.playerTurn,
  who_am_i: state.games.palace.who_am_i,
});

export default connect(mapStateToProps)(GameHeader);
