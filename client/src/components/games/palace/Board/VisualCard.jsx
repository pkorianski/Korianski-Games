import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  addSelectedCard,
  removeSelectedCard,
} from "../../../../actions/games/palace/solo/game";
import { connect } from "react-redux";

const VisualCard = ({
  addSelectedCard,
  removeSelectedCard,
  card,
  clickable,
}) => {
  let [enabled, setEnabled] = useState(false);

  const onClick = () => {
    if (clickable) {
      if (enabled) {
        removeSelectedCard(card);
      } else {
        addSelectedCard(card);
      }
      setEnabled(!enabled);
    }
  };

  const style = () => {
    if (enabled) {
      return {
        width: "3.5em",
        height: "5em",
        borderStyle: "solid",
        marginRight: "0.5em",
      };
    }

    return {
      width: "3.5em",
      height: "5em",
      marginRight: "0.5em",
    };
  };

  return (
    <div style={{ display: "table-cell" }}>
      <img
        key={card}
        style={style()}
        src={`${process.env.PUBLIC_URL}/cards/${card}.png`}
        alt=""
        onClick={() => onClick(card)}
      />
    </div>
  );
};

VisualCard.propTypes = {
  card: PropTypes.string.isRequired,
  addSelectedCard: PropTypes.func.isRequired,
  removeSelectedCard: PropTypes.func.isRequired,
};

export default connect(null, { addSelectedCard, removeSelectedCard })(
  VisualCard
);
