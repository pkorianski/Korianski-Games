import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Card,
  CardHeader,
  CardImg,
  CardFooter,
  Input,
} from "reactstrap";

const SelectCharacter = ({ charModal, toggleChar, handleClick }) => {
  const characters = [
    "Centaur",
    "Elf",
    "Fairy",
    "Grim",
    "King",
    "Knight",
    "Monster",
    "Orc",
    "Spider",
    "Witch",
    "Tree",
    "Unicorn",
    "Viking",
    "Villager",
    "Werewolf",
  ];

  const getPlayerImages = () => {
    return characters.map((char, i) => (
      <Col key={i} xs="6" sm="4" style={{ marginBottom: "1em" }}>
        <FormGroup check>
          <Label check>
            <Card style={{ width: "7.5em", textAlign: "center" }}>
              <CardHeader className="kg-font" style={{ fontSize: "0.6em" }}>
                {char}
              </CardHeader>
              <CardImg
                style={{
                  width: "4.5em",
                  height: "4.5em",
                  marginTop: "0.5em",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "0.5em",
                }}
                src={`${process.env.PUBLIC_URL}/players/${char}-icon.png`}
                alt=""
              />
              <CardFooter style={{ height: "2em", paddingLeft: "2.8em" }}>
                <Input
                  style={{
                    marginTop: "-0.4em",
                  }}
                  type="radio"
                  name="radio1"
                  onClick={() =>
                    handleClick({
                      name: char,
                      img: `${process.env.PUBLIC_URL}/players/${char}-icon.png`,
                    })
                  }
                />
              </CardFooter>
            </Card>
          </Label>
        </FormGroup>
      </Col>
    ));
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={charModal}
      toggle={toggleChar}
      scrollable={true}
    >
      <ModalHeader
        style={{ fontSize: 1 }}
        className="kg-font"
        toggle={toggleChar}
      >
        Pick Your Character
      </ModalHeader>
      <ModalBody style={{ height: "23em" }}>
        <Container style={{ paddingLeft: 0 }}>
          <Row>{getPlayerImages()}</Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button className="kg-font" color="primary" onClick={toggleChar}>
          SELECT
        </Button>
      </ModalFooter>
    </Modal>
  );
};

SelectCharacter.propTypes = {
  charModal: PropTypes.bool.isRequired,
  toggleChar: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SelectCharacter;
