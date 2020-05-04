import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import VisibleCardStack from "../Board/VisibleCardStack";
import {
  updateStep,
  removeAllSelectedCards,
} from "../../../../actions/games/palace/solo/game";

const TopCards = ({
  who_am_i,
  current_hand,
  cards_selected,
  step,
  game,
  updateStep,
  removeAllSelectedCards,
}) => {
  const onClick = () => {
    if (game.player1.player_name === who_am_i) {
      game.player1.top_three_cards = cards_selected;
      game.player1.current_hand = game.player1.current_hand.filter((card) => {
        return !cards_selected.includes(card);
      });
    } else if (game.player2.player_name === who_am_i) {
      game.player2.top_three_cards = cards_selected;
      game.player2.current_hand = game.player2.current_hand.filter((card) => {
        return !cards_selected.includes(card);
      });
    } else if (game.player3.player_name === who_am_i) {
      game.player3.top_three_cards = cards_selected;
      game.player3.current_hand = game.player3.current_hand.filter((card) => {
        return !cards_selected.includes(card);
      });
    } else if (game.player.player_name === who_am_i) {
      game.player4.top_three_cards = cards_selected;
      game.player4.current_hand = game.player4.current_hand.filter((card) => {
        return !cards_selected.includes(card);
      });
    }

    game.pick_top_three();
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

export default connect(mapStateToProps, { updateStep, removeAllSelectedCards })(
  TopCards
);
