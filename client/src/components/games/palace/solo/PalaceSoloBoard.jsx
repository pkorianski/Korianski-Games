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
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Palace from "../../../../actions/games/palace/Palace";
import faker from "faker";
import VisibleCardStack from "../Board/VisibleCardStack";

// Palace Board
import Board from "../Board/Board";
import UserController from "../Controller/UserController";
import TopCards from "../Board/TopCards";

// Actions
import { updateStep } from "../../../../actions/games/palace/solo/game";
import { setupGame } from "../../../../actions/games/palace/solo/game";

const PalaceSoloBoard = ({ cards_selected, step, updateStep, setupGame }) => {
  let [game, setGame] = useState(null);

  const beginGame = () => {
    game.set_deck();
    game.players();
    game.deal_cards();
    updateStep(step);
  };

  const onSubmitGame = async (e) => {
    e.preventDefault();
    let numberOfOpponents = e.target.numberOfOpponents.value;
    setupGame(e.target.yourPlayer.value, numberOfOpponents);
    updateStep(step);

    setGame(
      new Palace(
        e.target.numberOfOpponents.value,
        e.target.yourPlayer.value,
        faker.internet.userName(),
        numberOfOpponents > 2 ? faker.internet.userName() : null,
        numberOfOpponents > 3 ? faker.internet.userName() : null
      )
    );
  };

  const initGame = () => (
    <div id="select-players">
      <h3>Game Setup</h3>
      <Form onSubmit={(e) => onSubmitGame(e)}>
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
      <h1
        className="game-title"
        style={{ textAlign: "center", marginTop: "1em" }}
      >
        {"Palace (Solo Play)".toUpperCase()}
      </h1>

      {step === 1 && initGame()}
      {step === 2 && beginGame()}
      {step >= 3 && (
        <div>
          <h6 style={{ textAlign: "center" }}>TURN: Player X</h6>
          <Board
            player1={game.player1}
            player2={game.player2}
            playet3={game.player3}
            player4={game.player4}
          />
          <UserController />
          <TopCards current_hand={game.player1.current_hand} game={game} />
          {game.players()}
        </div>
      )}
    </Container>
  );
};

PalaceSoloBoard.propTypes = {
  step: PropTypes.number.isRequired,
  updateStep: PropTypes.func.isRequired,
  setupGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.games.palace.step,
  cards_selected: state.games.palace.cards_selected,
});

export default connect(mapStateToProps, { updateStep, setupGame })(
  PalaceSoloBoard
);
