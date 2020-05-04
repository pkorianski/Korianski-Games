import React from "react";
import PropTypes from "prop-types";
import "../../../../App.css";
import VisibleCardStack from "./VisibleCardStack";
import { connect } from "react-redux";

const Board = ({
  step,
  game: { current_deck, table_cards, player1, player2 },
}) => {
  const numberOfCardsLeft = () => {
    switch (current_deck.length) {
      case 1:
        return "one";
      case 2:
        return "two";
      case 3:
        return "three";
      case 4:
        return "four";
      case 5:
        return "five";
      default:
        return "full";
    }
  };

  return (
    <div
      className="board"
      style={{
        marginTop: "1em",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "green",
        width: "34em",
        height: "32em",
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
              <div style={{ marginBottom: "0.5em" }}>
                <VisibleCardStack
                  cards={player1.face_down_cards}
                  clickable={
                    player1.top_three_cards.length === 0 &&
                    player1.current_hand.length === 0
                  }
                  visible={player1.top_three_cards.length === 0}
                />
                <VisibleCardStack
                  style={{ marginBottom: "2em" }}
                  cards={player1.top_three_cards}
                  clickable={player1.current_hand.length === 0}
                  visible={true}
                />
              </div>
              <div>
                <span>
                  <img
                    style={{
                      marginLeft: "0.5em",
                      width: "2.5em",
                      height: "2.5em",
                      backgroundColor: "#00cc66",
                      borderRadius: "50%",
                      border: "1px solid black",
                      padding: "0.2em",
                      float: "left",
                    }}
                    src={player1.img}
                    alt=""
                  />
                  <div
                    style={{
                      color: "white",
                      paddingTop: "0.4em",
                      paddingLeft: "2.5em",
                      marginLeft: "1em",
                    }}
                  >
                    {player1.player_name}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {current_deck.length && (
        <div
          style={{
            paddingTop: "12.5em",
            marginLeft: "7.5em",
          }}
        >
          <img
            src={`${
              process.env.PUBLIC_URL
            }/cards/deck_stack_${numberOfCardsLeft()}.png`}
            style={{ float: "left", height: "6em", width: "4.5em" }}
            alt=""
          />
          {table_cards.length ? (
            <img
              src={`${process.env.PUBLIC_URL}/cards/${table_cards[0]}.png`}
              style={{
                float: "left",
                height: "5em",
                width: "3.5em",
                marginTop: "0.5em",
                marginLeft: "2em",
              }}
              alt=""
            />
          ) : null}
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
              <div style={{ paddingBottom: "0.5em" }}>
                <span>
                  <img
                    style={{
                      marginLeft: "0.5em",
                      marginRight: "0.5em",
                      width: "2.5em",
                      height: "2.5em",
                      backgroundColor: "#00cc66",
                      borderRadius: "50%",
                      border: "1px solid black",
                      padding: "0.2em",
                      float: "left",
                    }}
                    src={player2.img}
                    alt=""
                  />
                  <div
                    style={{
                      color: "white",
                      marginTop: "0.4em",
                      paddingTop: "0.4em",
                    }}
                  >
                    {player2.player_name}
                  </div>
                </span>
              </div>
              <div style={{ clear: "both", paddingTop: "0.5em" }}>
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
        </div>
      )}
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
