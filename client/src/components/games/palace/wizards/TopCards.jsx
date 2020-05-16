import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import VisibleCardStack from "../Board/VisibleCardStack";
import {
  updateStep,
  removeAllSelectedCards,
  pickTopThree,
} from "../../../../actions/games/game";

const TopCards = ({
  play_type,
  who_am_i,
  current_hand,
  cards_selected,
  step,
  player1,
  player2,
  updateStep,
  removeAllSelectedCards,
  pickTopThree,
}) => {
  const onClick = () => {
    if (player1.player_name === who_am_i) {
      player1.top_three_cards = cards_selected;
      player1.current_hand = player1.current_hand.filter((card) => {
        return !cards_selected.includes(card);
      });
    } else if (player2.player_name === who_am_i) {
      player2.top_three_cards = cards_selected;
      player2.current_hand = player2.current_hand.filter((card) => {
        return !cards_selected.includes(card);
      });
    }

    if (play_type === "solo") {
      pickTopThree(player2);
    }
    removeAllSelectedCards();
    updateStep(step);
  };

  return (
    <Fragment>
      <ModalHeader className="kg-font">Choose Your Top 3 Cards</ModalHeader>
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
          Selected Cards:
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
        {(cards_selected.length > 3 || cards_selected.length < 3) && (
          <div>
            {cards_selected.length > 3 && (
              <p
                style={{
                  color: "red",
                  float: "left",
                  marginRight: "1em",
                }}
              >
                Choose <u>ONLY</u> 3 cards
              </p>
            )}
            <Button className="kg-font" color="primary" outline disabled>
              Select Cards
            </Button>
          </div>
        )}
        {cards_selected.length === 3 && (
          <Button onClick={onClick} className="kg-font" color="primary" outline>
            Select Cards
          </Button>
        )}
      </ModalFooter>
    </Fragment>
  );
};

TopCards.propTypes = {
  play_type: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  cards_selected: PropTypes.array.isRequired,
  current_hand: PropTypes.array.isRequired,
  who_am_i: PropTypes.string.isRequired,
  updateStep: PropTypes.func.isRequired,
  removeAllSelectedCards: PropTypes.func.isRequired,
  pickTopThree: PropTypes.func.isRequired,
  player1: PropTypes.object,
  player2: PropTypes.object,
};

const mapStateToProps = (state) => ({
  play_type: state.games.palace.play_type,
  step: state.games.palace.step,
  cards_selected: state.games.palace.cards_selected,
  who_am_i: state.games.palace.who_am_i,
  player1: state.games.palace.game.player1,
  player2: state.games.palace.game.player2,
});

export default connect(mapStateToProps, {
  updateStep,
  removeAllSelectedCards,
  pickTopThree,
})(TopCards);
