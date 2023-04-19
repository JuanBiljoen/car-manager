// React imports
import React, { useState } from "react";

// Bootstrap imports
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

// Stylesheet import
import "./SingleCarInfo.css";

/**
 *
 * The SingleCarInfo component is mostly a presentational
 * component to display the individual car information documents
 */

export default function SingleCarInfo({
  singleCarInfo,
  handleEditCar,
  handleDeleteCar,
}) {
  // Object destructuring of the singleCarInfo
  // We destructure the properties of the object
  // to be used in the below
  const { _id, model, make, color, registrationNumber, owner, address } =
    singleCarInfo;

  // State variables
  const [editMode, setEditMode] = useState(false);
  const [editedCar, setEditedCar] = useState({
    _id,
    model,
    make,
    color,
    registrationNumber,
    owner,
    address,
  });

  function handleChange(e) {
    setEditedCar({
      ...editedCar,
      [e.target.name]: e.target.value,
    });
  }

  if (!singleCarInfo) return <p>Add an item to the list</p>;

  return (
    <div>
      <Card className="container py-5 h-100 card-style">
        <Card.Body>
          <Card.Title>
            {editMode ? (
              <FormControl
                name="make"
                value={editedCar.make}
                onChange={handleChange}
              />
            ) : (
              make
            )}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {editMode ? (
              <FormControl
                name="model"
                value={editedCar.model}
                onChange={handleChange}
              />
            ) : (
              model
            )}
          </Card.Subtitle>
          <Card.Text>
            {editMode ? (
              <FormControl
                name="owner"
                value={editedCar.owner}
                onChange={handleChange}
              />
            ) : (
              owner
            )}
          </Card.Text>
        </Card.Body>

        <ListGroup>
          <ListGroupItem>
            {editMode ? (
              <FormControl
                name="color"
                value={editedCar.color}
                onChange={handleChange}
              />
            ) : (
              color
            )}
          </ListGroupItem>
          <ListGroupItem>
            {editMode ? (
              <FormControl
                name="registrationNumber"
                value={editedCar.registrationNumber}
                onChange={handleChange}
              />
            ) : (
              registrationNumber
            )}
          </ListGroupItem>
          <ListGroupItem>
            {editMode ? (
              <FormControl
                name="address"
                value={editedCar.address}
                onChange={handleChange}
              />
            ) : (
              address
            )}
          </ListGroupItem>
        </ListGroup>

        <div className="buttons-wrapper">
          {editMode && (
            <Button
              className="cancel-button"
              variant="light"
              onClick={() => {
                setEditMode(false);
              }}
            >
              Cancel
            </Button>
          )}

          <Button
            className="edit-button"
            variant="light"
            onClick={() => {
              if (editMode) {
                handleEditCar(editedCar);
                setEditMode(false);
              } else {
                setEditMode(true);
              }
            }}
          >
            {editMode ? "Done!" : "Update"}
          </Button>

          <Button
            className="delete-button"
            variant="light"
            onClick={() => {
              handleDeleteCar(singleCarInfo);
            }}
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}
