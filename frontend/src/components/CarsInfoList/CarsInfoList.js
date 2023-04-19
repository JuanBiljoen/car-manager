// React imports
import React, { useEffect, useState } from "react";

// Bootstrap imports
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

// Components and Stylesheet imports
import AddCar from "../AddCar/AddCar";
import SingleCarInfo from "../SingleCarInfo/SingleCarInfo";
import UpdateMultipleCars from "../UpdateCars/UpdateCars";
import "./CarsInfoList.css";

/**
 *
 * CARS INFO LIST COMPONENT
 *
 * The CarsInfoList component is the primary component that handles all the main business logic of the application. It makes GET, POST, PUT and DELETE calls to the Express server using the fetch method, updating the MongoDB database accordingly. The presentation of the app is delegated to child components, allowing this component to focus on data fetching and handling events. The useEffect hook is used to make a GET request when the component is first mounted on the DOM, and the modifiedDocuments state variable is included in the dependency array to enable refetching of data from the database. The event handlers are used to make POST, PUT, and DELETE requests, including passing data from the React app to the Express server via headers and body.
 */

export default function CarsInfoList() {
  // State variable for cars List and fetch states
  const [carsInfoList, setCarsInfoList] = useState([]);
  const [modifiedDocuments, setModifiedDocuments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State variable for dropdown
  const [choiceForNewOrMultiple, setChoiceForNewOrMultiple] = useState("");

  // CREATE/POST Request
  function handleAddCar(newCar) {
    fetch("api/addCar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    })
      .then((res) => res.json())
      .then((data) => {

        const updatedCarsInfoList = [...carsInfoList, data];

        // The code below updates the state variables after the previous code has completed execution. The state updates are performed asynchronously, which is why the update is made after the previous code has finished running.
        setCarsInfoList(updatedCarsInfoList);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error("Error in adding new Car: ", err);
      });
  }

  // UPDATE/PUT Single Car Request
  function handleEditCar(editedCar) {
    fetch(`api/updateSingleCar/${editedCar._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedCar),
    })
      .then((res) => res.json())
      .then((data) => {

        const updatedCarsInfoList = carsInfoList.map((carInfo) => {
          if (carInfo._id === data._id) {
            return data;
          } else {
            return carInfo;
          }
        });

        setCarsInfoList(updatedCarsInfoList);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error("Error in updating Car Information: ", err);
      });
  }

  // UPDATE Multiple Cars Request
  function handleUpdateMultipleCars(updatedInfo) {
    fetch("api/updateMultipleCars", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        // Once the data Object is received from the server
        // we set the state with the count of modified docs
        setModifiedDocuments(data.modifiedCount);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error("Error in updating Multiple Cars Information: ", err);
      });
  }

  // DELETE Request
  function handleDeleteCar(deletedCar) {
    fetch(`api/deleteCar/${deletedCar._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // The filter method creates a new array that excludes the deleted Object
        const updatedCarsInfoList = carsInfoList.filter((carInfo) => {
          return carInfo._id !== data._id;
        });
// The setStates below will update after the filter method has completed execution due to the asynchronous nature of state updates as previously mentioned in the update request.
        setCarsInfoList(updatedCarsInfoList);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error("Error in deleting Car: ", err);
      });
  }

  // GET Request for Cars older than 5 Years
  function handleFetchOldCars() {
    fetch("/api/old")
      .then((res) => res.json())
      .then(
        (data) => {
          setCarsInfoList(data);
          setLoading(false);
          setError(null);
        },
        (err) => {
          setError(err);
          setLoading(false);
          console.error("Error in fetching data: ", err);
        }
      );
  }

  useEffect(() => {
   
    let ignoreSettingState = false;
    // GET Request
    fetch("/api")
      .then((res) => res.json())
      .then(
        (data) => {
          if (!ignoreSettingState) setCarsInfoList(data);
          setLoading(false);
          setError(null);
        },
        (err) => {
          setError(err);
          setLoading(false);
          console.error("Error in fetching data: ", err);
        }
      );

    // Clean Up
    return () => {
      // / We use this line of code to prevent the component from updating its state when it is no longer needed or visible on the webpage. This is done to avoid any unnecessary changes or errors.
      ignoreSettingState = true;
    };
  }, [modifiedDocuments]);

  return (
    <div className="main-wrapper">
      <h1>Cars Information Listing</h1>

      <div className="select-wrapper">
        <Form.Select
          aria-label="Selecting choice for new car or updating multiple cars"
          value={choiceForNewOrMultiple}
          onChange={(e) => {
            setChoiceForNewOrMultiple(e.target.value);
          }}
        >
          <option value="">---Choose Adding New Car or Update Cars---</option>
          <option value="newCar">Add New Car</option>
          <option value="updateCars">Update Multiple Cars</option>
        </Form.Select>

        <Button
          variant="outline-secondary"
          className="search-old-cars"
          onClick={handleFetchOldCars}
        >
          Search Cars Older Than 5 Years
        </Button>
      </div>

      {choiceForNewOrMultiple === "updateCars" && (
        <UpdateMultipleCars
          setLoading={setLoading}
          handleUpdateMultipleCars={handleUpdateMultipleCars}
        />
      )}

      {choiceForNewOrMultiple === "newCar" && (
        <AddCar setLoading={setLoading} handleAddCar={handleAddCar} />
      )}

      {loading && <p>Loading...</p>}

      {error && <p>Something is wrong!</p>}

      {modifiedDocuments && (
        <p className="modified-documents">
          Congrats! {modifiedDocuments} Cars have been updated!
        </p>
      )}

      <div className="cars-details-wrapper">
        {carsInfoList &&
          carsInfoList.map((carInfo) => {
            return (
              <SingleCarInfo
                key={carInfo._id}
                singleCarInfo={carInfo}
                handleEditCar={handleEditCar}
                handleDeleteCar={handleDeleteCar}
              />
            );
          })}
      </div>
    </div>
  );
}
