import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Input,
  Label,
  Form,
  FormGroup,
  Button,
  Container,
  InputGroup,
} from "reactstrap";
import delay from "lodash/delay";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import faker from "faker";
import Palace from "../../../../actions/games/Palace";
import { random } from "../../../common";

// Palace Board
import Board from "../Board/Board";

// Shareables
import GameHeader from "../shareable/GameHeader";
import SelectCharacter from "../shareable/SelectCharacter";
import CardController from "../shareable/CardController";

// Wizard
import StartGame from "../wizards/StartGame";

// Actions
import {
  setupGame,
  updateStep,
  updatePlayerTurn,
} from "../../../../actions/games/game";

const PalaceSoloBoard = ({
  step,
  player1,
  player2,
  updateStep,
  setupGame,
  playerTurn,
  updatePlayerTurn,
}) => {
  const characters = [
    "Centaur",
    "Elf",
    "Fairy",
    "Grim",
    "King",
    "Knight",
    "Monster",
    "Orc",
    "Spider",
    "Witch",
    "Tree",
    "Unicorn",
    "Viking",
    "Villager",
    "Werewolf",
  ];

  // Game init state
  const [selectedChar, setSelectedChar] = useState(null);
  const [charModal, setCharModal] = useState(false);
  const toggleChar = () => setCharModal(!charModal);

  const onSubmitGame = async (e) => {
    e.preventDefault();
    const data = {
      play_type: "solo",
      player1: { name: e.target.yourPlayer.value, img: selectedChar.img },
      player2: {
        name: faker.internet.userName().slice(0, 12),
        img: `${process.env.PUBLIC_URL}/players/${
          characters[Math.floor(random(1, characters.length)) - 1]
        }-icon.png`,
      },
    };

    setupGame(data);
    updateStep(2);
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
          <Label for="playerImg">Pick Your Character</Label>
          <InputGroup id="playerImg">
            <Button className="kg-font" type="button" onClick={toggleChar}>
              Choose
            </Button>
            {selectedChar && (
              <span style={{ marginLeft: "1em" }}>
                {selectedChar.name}
                <img
                  style={{
                    marginLeft: "0.5em",
                    width: "2.5em",
                    height: "2.5em",
                    backgroundColor: "#00cc66",
                    borderRadius: "50%",
                    border: "1px solid black",
                    padding: "0.2em",
                  }}
                  src={selectedChar.img}
                  alt=""
                />
              </span>
            )}
          </InputGroup>
        </FormGroup>
        <Link to="/palace/howto">Don't remember the rules? Review here</Link>
        <Button id="play-button" color="success">
          <div id="play-button-text">PLAY</div>
        </Button>
      </Form>
      <SelectCharacter
        charModal={charModal}
        toggleChar={toggleChar}
        handleClick={setSelectedChar}
      />
    </div>
  );

  useEffect(() => {
    // Robot Turn
    if (step === 5 && playerTurn === player2.player_name && player2.isRobot) {
      // game.robotTurn();

      delay(updatePlayerTurn, 2000, player1.player_name);
    }
    // eslint-disable-next-line
  }, [playerTurn]);

  return (
    <Container>
      <GameHeader />

      {step === 1 && initGame()}
      {step >= 3 && (
        <div>
          <Board />
          <StartGame />
          <CardController
            current_hand={step >= 5 ? player1.current_hand : []}
          />
        </div>
      )}
    </Container>
  );
};

PalaceSoloBoard.propTypes = {
  step: PropTypes.number.isRequired,
  current_hand: PropTypes.array,
  updateStep: PropTypes.func.isRequired,
  setupGame: PropTypes.func.isRequired,
  playerTurn: PropTypes.string,
  updatePlayerTurn: PropTypes.func.isRequired,
  player1: PropTypes.object,
  player2: PropTypes.object,
};

const mapStateToProps = (state) => ({
  step: state.games.palace.step,
  playerTurn: state.games.palace.playerTurn,
  player1: state.games.palace.game.player1,
  player2: state.games.palace.game.player2,
});

export default connect(mapStateToProps, {
  updateStep,
  setupGame,
  updatePlayerTurn,
})(PalaceSoloBoard);
