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
  cardWidth,
  cardHeight,
}) => {
  let [enabled, setEnabled] = useState(false);
  // eslint-disable-next-line
  let [defaults, setDefaults] = useState({
    width: cardWidth !== undefined ? cardWidth : "3.5em",
    height: cardHeight !== undefined ? cardHeight : "5em",
  });

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
        width: defaults.width,
        height: defaults.height,
        borderStyle: "solid",
        marginRight: "0.5em",
      };
    }

    return {
      width: defaults.width,
      height: defaults.height,
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
