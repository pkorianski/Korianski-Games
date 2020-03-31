import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
  Form,
  FormGroup,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Actions
import { updateStep } from "../../../../actions/games/palace/solo/game";
import { setupGame } from "../../../../actions/games/palace/solo/game";

const PalaceSoloBoard = ({ step, updateStep, setupGame }) => {
  const onSubmitGame = e => {
    e.preventDefault();
    console.log(e.target.yourPlayer.value);
    console.log(e.target.numberOfOpponents.value);
    setupGame(e.target.yourPlayer.value, e.target.numberOfOpponents.value);
    updateStep(step);
  };

  const initGame = () => (
    <div id="select-players">
      <h3>Game Setup</h3>
      <Form onSubmit={e => onSubmitGame(e)}>
        <FormGroup>
          <Label for="yourPlayer">Enter Your Username</Label>
          <Input type="text" id="yourPlayer" placeholder="username" required />
        </FormGroup>
        <FormGroup>
          <Label for="numberOfOpponents">Number of Opponents</Label>
          <Input type="select" name="select" id="numberOfOpponents">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Input>
        </FormGroup>
        <Link to="/palace/howto">Don't remember the rules? Review here</Link>
        <Button id="play-button" color="success">
          <div id="play-button-text">PLAY</div>
        </Button>
      </Form>
    </div>
  );

  return (
    <Container>
      <h1 style={{ textAlign: "center", marginTop: "1em" }}>
        Palace (Solo Play)
      </h1>

      {step === 1 && initGame()}
    </Container>
  );
};

PalaceSoloBoard.propTypes = {
  step: PropTypes.number.isRequired,
  updateStep: PropTypes.func.isRequired,
  setupGame: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  step: state.games.palace.step
});

export default connect(mapStateToProps, { updateStep, setupGame })(
  PalaceSoloBoard
);
