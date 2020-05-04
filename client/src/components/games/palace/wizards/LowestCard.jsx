import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import VisibleCardStack from "../Board/VisibleCardStack";
import {
  updateStep,
  removeAllSelectedCards,
  updatePlayerTurn,
} from "../../../../actions/games/palace/solo/game";

const LowestCard = ({
  who_am_i,
  current_hand,
  cards_selected,
  step,
  game,
  updateStep,
  removeAllSelectedCards,
  updatePlayerTurn,
}) => {
  const [lowestOpen, setLowestOpen] = useState(true);
  const [waitingOpen, setWaitingOpen] = useState(false);

  const onClick = () => {
    if (game.player1.player_name === who_am_i) {
      // Add selected to starting card queue
      game.addStartingCard({
        player_id: game.player1.id,
        card: cards_selected[0],
      });
    } else if (game.player2.player_name === who_am_i) {
      // Add selected to starting card queue
      game.addStartingCard({
        player_id: game.player2.id,
        card: cards_selected[0],
      });
    }
    setLowestOpen(false);
    setWaitingOpen(true);
  };

  const setStartingTurn = () => {
    if (step === 4) {
      if (game.player2.isRobot) {
        for (let i = 1; i < 5000; i++) {
          continue;
          // Need some delay here
        }
        game.determineRobotStartingCard();
      }

      //MULT TODO: Multiple player look at queue every 2 seconds
      while (game.startingCardsQueue.length < 2) {
        //MULT TODO: Multiple player look at queue every 2 seconds
        continue;
      }

      const playerTurn = game.determineStartingTurn();
      removeAllSelectedCards();
      updatePlayerTurn(playerTurn);
      updateStep(step);
    }
  };

  useEffect(() => {
    if (waitingOpen) {
      setStartingTurn();
    }
    // eslint-disable-next-line
  }, [waitingOpen]);

  return (
    <Fragment>
      {lowestOpen && (
        <Fragment>
          <ModalHeader className="kg-font">Choose Lowest Card</ModalHeader>
          <ModalBody style={{ height: "20em" }}>
            <h6 className="kg-font">Available Cards:</h6>
            <div style={{ marginTop: "1.5em" }}>
              <VisibleCardStack
                style={{ marginTop: "1em" }}
                cards={current_hand}
                clickable={true}
                visible={true}
              />
            </div>
            <h6 style={{ marginTop: "2em" }} className="kg-font">
              Selected Card:
            </h6>
            <div style={{ marginTop: "1.5em" }}>
              <VisibleCardStack
                style={{ marginTop: "1em" }}
                cards={cards_selected}
                clickable={false}
                visible={true}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            {(cards_selected.length > 1 || cards_selected.length < 1) && (
              <div>
                {cards_selected.length > 1 && (
                  <p
                    style={{
                      color: "red",
                      float: "left",
                      marginRight: "1em",
                    }}
                  >
                    Choose <u>ONLY</u> 1 card
                  </p>
                )}
                <Button className="kg-font" color="primary" outline disabled>
                  Select Lowest
                </Button>
              </div>
            )}
            {cards_selected.length === 1 && (
              <Button
                onClick={onClick}
                className="kg-font"
                color="primary"
                outline
              >
                Select Lowest
              </Button>
            )}
          </ModalFooter>
        </Fragment>
      )}
      {waitingOpen && (
        <Fragment>
          <ModalHeader className="kg-font">Waiting Room</ModalHeader>
          <ModalBody style={{ height: "20em", marginRight: "1em" }}>
            <p className="kg-font">
              A player is still choosing their <u>lowest card</u>
            </p>
            <div>
              <Spinner type="grow" color="success" />
              <Spinner type="grow" color="success" />
              <Spinner type="grow" color="success" />
            </div>
            <br />
            <p className="kg-font">Look below for a personalized ad!</p>
          </ModalBody>
          <ModalFooter>
            <Link to="/palace">
              <Button className="kg-font" color="danger">
                QUIT GAME
              </Button>
            </Link>
          </ModalFooter>
        </Fragment>
      )}
    </Fragment>
  );
};

LowestCard.propTypes = {
  step: PropTypes.number.isRequired,
  cards_selected: PropTypes.array.isRequired,
  current_hand: PropTypes.array.isRequired,
  who_am_i: PropTypes.string.isRequired,
  updateStep: PropTypes.func.isRequired,
  removeAllSelectedCards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.games.palace.step,
  cards_selected: state.games.palace.cards_selected,
  who_am_i: state.games.palace.who_am_i,
});

export default connect(mapStateToProps, {
  updateStep,
  updatePlayerTurn,
  removeAllSelectedCards,
})(LowestCard);
