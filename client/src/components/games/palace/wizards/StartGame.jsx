import React from "react";
import PropTypes from "prop-types";
import { Modal } from "reactstrap";
import { connect } from "react-redux";

import TopCards from "../wizards/TopCards";
import LowestCard from "../wizards/LowestCard";

const StartGame = ({ step, game }) => {
  if (step === 5) return null;
  return (
    <Modal
      style={{
        marginTop: "12em",
        marginLeft: "auto",
        marginRight: "auto",
        opacity: "0.95",
      }}
      isOpen
    >
      {step === 3 && (
        <TopCards current_hand={game.player1.current_hand} game={game} />
      )}
      {step === 4 && (
        <LowestCard current_hand={game.player1.current_hand} game={game} />
      )}
    </Modal>
  );
};

StartGame.propTypes = {
  step: PropTypes.number.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.games.palace.step,
});

export default connect(mapStateToProps)(StartGame);
