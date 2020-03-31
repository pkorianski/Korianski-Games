import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

const PalaceMain = props => {
  return (
    <Container fluid>
      <h1 style={{ textAlign: "center", marginTop: "1em" }}>Palace</h1>
      <Row>
        <img
          className="game-logo"
          src={process.env.PUBLIC_URL + "/games/palace/logo.png"}
          alt=""
        />
      </Row>
      <Row>
        <div className="game-buttons game-button-top">
          <Link to="/palace/solo">
            <Button className="game-button" color="success">
              SOLO PLAY
            </Button>
          </Link>
        </div>
      </Row>
      <Row>
        <div className="game-buttons">
          <Link to="/palace/online">
            <Button className="game-button" color="secondary">
              ONLINE
            </Button>
          </Link>
        </div>
      </Row>
      <Row>
        <div className="game-buttons">
          <Link to="/palace/howto">
            <Button outline className="game-button" color="info">
              HOW TO PLAY
            </Button>
          </Link>
        </div>
      </Row>
    </Container>
  );
};

PalaceMain.propTypes = {};

export default PalaceMain;
