import React from "react";
import PropTypes from "prop-types";
import "../../../../App.css";
import VisibleCardStack from "./VisibleCardStack";
import { connect } from "react-redux";

const Board = ({ step, player1, player2, player3, player4 }) => {
  return (
    <div
      className="board"
      style={{
        marginTop: "1em",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "green",
        width: "34em",
        height: "37em",
        borderRadius: "25px",
        border: "20px solid brown",
        boxShadow: "5px 5px",
        position: "relative",
      }}
    >
      {step > 3 && (
        <div id="player1" style={{}}>
          <div
            style={{
              position: "absolute",
              bottom: 5,
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                marginLeft: "10em",
              }}
            >
              <VisibleCardStack
                cards={player1.face_down_cards}
                clickable={
                  player1.top_three_cards.length === 0 &&
                  player1.current_hand.length === 0
                }
                visible={player1.top_three_cards.length === 0}
              />
              <VisibleCardStack
                cards={player1.top_three_cards}
                clickable={player1.current_hand.length === 0}
                visible={true}
              />
              <VisibleCardStack
                cards={player1.current_hand}
                clickable={true}
                visible={true}
              />
            </div>
          </div>
        </div>
      )}

      {step > 3 && (
        <div id="player2" style={{}}>
          <div
            style={{
              position: "absolute",
              top: 5,
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                marginLeft: "10em",
              }}
            >
              <VisibleCardStack
                cards={player2.current_hand}
                clickable={false}
                visible={true}
              />
              <VisibleCardStack
                cards={player2.top_three_cards}
                clickable={false}
                visible={true}
              />
              <VisibleCardStack
                cards={player2.face_down_cards}
                clickable={false}
                visible={player2.top_three_cards.length === 0}
              />
            </div>
          </div>
        </div>
      )}

      {player3 != null && <div id="player3">Yo3</div>}
      {player4 != null && <div id="player4">Yo4</div>}
    </div>
  );
};

Board.propTypes = {
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.games.palace.step,
});

export default connect(mapStateToProps, {})(Board);
