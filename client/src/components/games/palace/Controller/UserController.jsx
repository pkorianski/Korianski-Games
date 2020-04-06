import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

const UserController = (props) => {
  return (
    <div
      className="user-controller"
      style={{
        backgroundColor: "lightgray",
        width: "34em",
        height: "5em",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1em",
        borderRadius: "25px",
        border: "2px solid black",
        boxShadow: "1px 2px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "0.5em",
          marginBottom: "1em",
          width: "100%",
        }}
      >
        <Button
          className="user-controller-button"
          style={{
            width: "10em",
            height: "3em",
            marginRight: "1em",
          }}
          outline
          color="success"
          size="lg"
        >
          PLAY
        </Button>
        ~
        <Button
          className="user-controller-button"
          style={{ width: "10em", height: "3em", marginLeft: "1em" }}
          outline
          color="danger"
          size="lg"
        >
          PICKUP
        </Button>
      </div>
    </div>
  );
};

UserController.propTypes = {};

export default UserController;
