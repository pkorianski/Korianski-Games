import React from "react";
import PropTypes from "prop-types";
import VisualCard from "./VisualCard";

const VisibleCardStack = ({ cards, clickable, visible }) => {
  let style = {};
  if (visible) {
    style = { overflow: "hidden", marginTop: "0.2em", visibility: "visible" };
  } else {
    style = {
      overflow: "hidden",
      marginTop: "0.2em",
      visibility: "hidden",
    };
  }

  return (
    <div style={style}>
      {cards.map((card) => (
        <VisualCard key={card} card={card} clickable={clickable} />
      ))}
    </div>
  );
};

VisibleCardStack.propTypes = {
  cards: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default VisibleCardStack;
