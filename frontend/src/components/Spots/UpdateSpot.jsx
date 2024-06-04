import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUpdatedSpot } from "../../store/spotReducer";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spotReducer";

const UpdateSpot = () => {
  const spot = useSelector((state) => state.spots.currentSpot);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const { spotId } = useParams();

  console.log(spotId);

  useEffect(() => {
    dispatch(getSingleSpot(spotId))
      .then(() => setCountry(spot.country))
      .then(() => setAddress(spot.address))
      .then(() => setCity(spot.city))
      .then(() => setState(spot.state))
      .then(() => setLat(spot.lat))
      .then(() => setLng(spot.lng))
      .then(() => setDescription(spot.description))
      .then(() => setName(spot.name))
      .then(() => setPrice(spot.price));

    const errors = {};

    if (country.length < 1) {
      errors.country = "Country is required";
    } else if (address.length < 1) {
      errors.address = "Address is required";
    } else if (city.length < 1) {
      errors.city = "City is required";
    } else if (state.length < 1) {
      errors.state = "State is required";
    } else if (isNaN(lat) || lat === "") {
      errors.lat = "Lat is required and must be a number";
    } else if (isNaN(lng) || lng === "") {
      errors.lng = "Lng is required and must be a number";
    } else if (description.length < 1) {
      errors.description = "Description needs 30 or more characters";
    } else if (name.length < 1) {
      errors.name = "Name is required";
    } else if (isNaN(price) || price === "") {
      errors.price = "Price is required and must be a number";
    }

    setErrors(errors);
  }, [
    dispatch,
    country,
    address,
    city,
    state,
    lat,
    lng,
    description,
    name,
    price,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).length === 0) {
      const spotObj = {
        address,
        city,
        state,
        country,
        lat: parseInt(lat),
        lng: parseInt(lng),
        name,
        description,
        price: parseInt(price),
      };

      try {
        console.log(spot.id);
        console.log(spotObj);
        dispatch(createUpdatedSpot(spot.id, spotObj)).then(() => {
          navigate(`/spots/${spot.id}`);
        });

        setCountry("");
        setAddress("");
        setCity("");
        setState("");
        setLat("");
        setLng("");
        setDescription("");
        setName("");
        setPrice("");
      } catch {
        console.log("Uncaught in promise");
      }
    } else {
      alert("Please fix your errors before creating a spot");
    }
  };

  return (
    <div className="create-spot-container">
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Update your Spot</h1>
        <h2 className="form-subtitle">Where&apos;s your place located?</h2>
        <h3 className="form-info">
          Guests will only get your exact address once they book a reservation.
        </h3>

        <label className="signup-label">
          Country:
          <input
            className="input-area-spots"
            type="text"
            id="country"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          {country === "" && isFirstTime ? (
            <>{setIsFirstTime(false)}</>
          ) : Object.keys(errors).length >= 1 ? (
            <p className="error-message">{errors.country}</p>
          ) : (
            <></>
          )}
          {/* {Object.keys(errors).length >= 1 ? (
            <p className="error-message">{errors.country}</p>
          ) : (
            <></>
          )} */}
        </label>

        <label className="signup-label">
          Street Address:
          <input
            className="input-area-spots"
            type="text"
            id="street-address"
            name="street-address"
            placeholder="Street Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {Object.keys(errors).length >= 1 ? (
            <p className="error-message">{errors.address}</p>
          ) : (
            <></>
          )}
        </label>
        <div className="city-state">
          <div className="city">
            <label className="signup-label">
              City:
              <input
                className="input-area-spots"
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {Object.keys(errors).length >= 1 ? (
                <p className="error-message">{errors.city}</p>
              ) : (
                <></>
              )}
            </label>
          </div>
          <div className="city">
            <label className="signup-label">
              State:
              <input
                className="input-area-spots"
                type="text"
                id="state"
                name="state"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              {Object.keys(errors).length >= 1 ? (
                <p className="error-message">{errors.state}</p>
              ) : (
                <></>
              )}
            </label>
          </div>
        </div>
        <div className="city-state">
          <div className="city">
            <label className="signup-label">
              lat:
              <input
                className="input-area-spots"
                type="text"
                id="lat"
                name="lat"
                placeholder="Lat"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
              {Object.keys(errors).length >= 1 ? (
                <p className="error-message">{errors.lat}</p>
              ) : (
                <></>
              )}
            </label>
          </div>
          <div className="city">
            <label className="signup-label">
              lng:
              <input
                className="input-area-spots"
                type="text"
                id="lng"
                name="lng"
                placeholder="Lng"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
              {Object.keys(errors).length >= 1 ? (
                <p className="error-message">{errors.lng}</p>
              ) : (
                <></>
              )}
            </label>
          </div>
        </div>
        <div className="added-text">
          <h2 className="description-title">
            Describe your place to your guests
          </h2>
          <p className="description-info">
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood
          </p>
          <label className="signup-label">
            Description:
            <textarea
              className="input-text-area"
              id="description"
              name="description"
              placeholder="Please write at least 30 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {Object.keys(errors).length >= 1 ? (
              <p className="error-message">{errors.description}</p>
            ) : (
              <></>
            )}
          </label>
        </div>
        <div className="added-text">
          <h2 className="spot-title">Create a title for your spot</h2>
          <p className="title-info">
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
          <label className="signup-label">
            Name of Spot:
            <input
              className="input-area-spots"
              type="text"
              id="name-of-spot"
              name="name-of-spot"
              placeholder="Name your spot"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {Object.keys(errors).length >= 1 ? (
              <p className="error-message">{errors.name}</p>
            ) : (
              <></>
            )}
          </label>
        </div>
        <div className="added-text">
          <h2 className="price-title">Set a price for your spot</h2>
          <p className="price-info">
            Competitive pricing can help your listing stand out and rank higher
            in search results
          </p>
          <label className="signup-label">
            <input
              className="input-area-spots"
              type="text"
              id="price"
              name="price"
              placeholder="Price per night($USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {Object.keys(errors).length >= 1 ? (
              <p className="error-message">{errors.price}</p>
            ) : (
              <></>
            )}
          </label>
        </div>

        <button className="spot-button" type="submit">
          Update your Spot
        </button>
      </form>
    </div>
  );
};

export default UpdateSpot;
