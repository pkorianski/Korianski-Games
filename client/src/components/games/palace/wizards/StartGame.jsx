import React from "react";
import PropTypes from "prop-types";
import { Modal } from "reactstrap";
import { connect } from "react-redux";

import TopCards from "../wizards/TopCards";
import LowestCard from "../wizards/LowestCard";

const StartGame = ({ step, player1 }) => {
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
      {step === 3 && <TopCards current_hand={player1.current_hand} />}
      {step === 4 && <LowestCard current_hand={player1.current_hand} />}
    </Modal>
  );
};

StartGame.propTypes = {
  step: PropTypes.number.isRequired,
  player1: PropTypes.object,
};

const mapStateToProps = (state) => ({
  step: state.games.palace.step,
  player1: state.games.palace.game.player1,
});

export default connect(mapStateToProps)(StartGame);
