// React imports
import React, { useState } from "react";

// Bootstrap imports
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

// Yup imports
import * as yup from "yup";

// Stylesheet import
import "./AddCar.css";

/**
In this component, the primary focus is on updating the loading state of the parent component and handling the add car event through the handleAddCar event handler, which is passed down from the parent component.
 */
export default function AddCar({ setLoading, handleAddCar }) {
  // State variables for the new car
  const [newCar, setNewCar] = useState({
    model: "",
    make: "",
    color: "",
    registrationNumber: "",
    owner: "",
    address: "",
  });

  // Validation state
  const [isValid, setIsValid] = useState(false);

  // Yup Schema

  // The Yup library is utilized in this component to guarantee that the correct data is sent to the server and recorded in the database, as well as to prevent errors in handling the data received from the front-end.
  // Reference: https://github.com/jquense/yup
  let yupSchema = yup.object({
    model: yup.number().required("Required").positive().integer(),
    make: yup.string().required("Required"),
    color: yup.string().required("Required"),
    registrationNumber: yup.string().required("Required"),
    owner: yup.string().required("Required"),
    address: yup.string(),
  });

  // destructuring object keys
  const { model, make, color, registrationNumber, owner, address } = newCar;

  // We check that the form is valid to be submitted by verifying that all required fields as per the Schema specifications in the back-end have been filled. The value of this check is stored in the "isValid" state variable.
  function handleChange(e) {
    setNewCar({
      ...newCar,
      [e.target.name]: e.target.value,
    });
    setIsValid(
      yupSchema.isValidSync({ ...newCar, [e.target.name]: e.target.value })
    );
  }

  return (
    <div className="add-car-wrapper">
      <h4 className="add-car-title">Add a New Car</h4>
      <InputGroup className="mb-3  input-group">
        <FormControl
          placeholder="Enter Model Year"
          name="model"
          value={model}
          onChange={handleChange}
        />

        <FormControl
          placeholder="Enter the Make of the Car"
          name="make"
          value={make}
          onChange={handleChange}
        />

        <FormControl
          placeholder="Enter Color"
          name="color"
          value={color}
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup>
        <FormControl
          placeholder="Enter Registration Number"
          name="registrationNumber"
          value={registrationNumber}
          onChange={handleChange}
        />

        <FormControl
          placeholder="Enter Current Owner"
          name="owner"
          value={owner}
          onChange={handleChange}
        />

        <FormControl
          placeholder="Enter Address of Owner"
          name="address"
          value={address}
          onChange={handleChange}
        />

        <Button
          variant="outline-secondary"
          onClick={() => {
            //  We only allow the sending of data if
            // the form is valid
            if (isValid) {
              setLoading(true);
              setNewCar({
                model: "",
                make: "",
                color: "",
                registrationNumber: "",
                owner: "",
                address: "",
              });
              handleAddCar(newCar);
            }
          }}
          disabled={!isValid}
        >
          Add New Car
        </Button>
      </InputGroup>
    </div>
  );
}
