import React, { useEffect, useState } from "react";

// get bike data
// - json
// - hardcoded array
// - from an API

// display each bike
// each bike will have an add to cart button
// each bike will have an inventory count (max number of orders we can place)
// price per day or price per hour
// img
// availability for bike

// show the cart
// show the total
// apply a discount if the total is over $1000
// reduce the count of bikes
// delete them from cart altogether

// user is presented with bikes
// they click on a particular bike (it has a button 'rent this bike')
// they will be presented with date picker
// after they choose the dates
// a total will be presented to them
// checkout and confirmation page

// views
// view of all the bikes
// singular bike with date picker and totals
// confirmation that you've booked this bike, dates, total

const bikes = [
  {
    id: 1,
    name: "Forrester",
    pricePerDay: 25.0,
    image:
      "https://toppng.com/uploads/preview/bike-png-11553947168o2lejcpmvy.png",
  },
  {
    id: 2,
    name: "Explorer",
    pricePerDay: 35.0,
    image:
      "https://clipart.world/wp-content/uploads/2020/08/classic-mens-town-road-bike-png.png",
  },
  {
    id: 3,
    name: "Adventurer",
    pricePerDay: 45.0,
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/be02a4e3-e357-4bde-b048-3a8a59e11d49/d2xq8bu-770b674e-f0af-4383-a1e1-c28d36f24c80.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JlMDJhNGUzLWUzNTctNGJkZS1iMDQ4LTNhOGE1OWUxMWQ0OVwvZDJ4cThidS03NzBiNjc0ZS1mMGFmLTQzODMtYTFlMS1jMjhkMzZmMjRjODAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.WopSUaX74ktnG72rYyT2TT4ydTks0Neg7_2hnNEmYuM",
  },
];

const BikeDisplayComponent = ({
  id,
  name,
  pricePerDay,
  image,
  description,
  isSelectingDates,
  handleOnBikeRent = () => {},
}) => {
  return (
    <div
      style={{
        border: "1px solid white",
        borderRadius: "10px",
        margin: "20px",
        fontSize: "1rem",
        width: "450px",
        padding: "10px",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: "100px", height: "auto", borderRadius: "5px" }}
      />
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Price:</strong> ${pricePerDay} / day
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      {!isSelectingDates && (
        <div>
          <button
            style={{
              fontSize: "1.2rem",
              background: "orange",
              borderRadius: "5px",
              color: "white",
            }}
            onClick={() => handleOnBikeRent(id)}
          >
            Rent the {name}
          </button>
        </div>
      )}
    </div>
  );
};

const ConfirmationPage = ({ bike, bookingDates, total }) => {
  return (
    <div>
      <h3>Booking Confirmed!</h3>
      <BikeDisplayComponent
        id={bike.id}
        pricePerDay={bike.pricePerDay}
        name={bike.name}
        image={bike.image}
        isSelectingDates={true}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
        }
      />
      <div>
        Your adventure starts:{" "}
        {new Date(bookingDates.start).toLocaleDateString()}
      </div>
      <div>
        Your adventure ends: {new Date(bookingDates.end).toLocaleDateString()}
      </div>
      <div>Total: ${total}</div>
    </div>
  );
};

const SelectDatesForBike = ({ bike, handleConfirmBooking }) => {
  const [bookingDates, setBookingDates] = useState({
    start: "",
    end: "",
  });

  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    // determine # of days between start and end
    // multiply by bike price
    // set total

    const startDate = new Date(bookingDates.start);
    const endDate = new Date(bookingDates.end);
    const Difference_In_Time = endDate.getTime() - startDate.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    const newTotal = Difference_In_Days * bike.pricePerDay;
    setTotal(newTotal || 0);
  };

  useEffect(() => {
    calculateTotal();
  }, [bookingDates]);

  const handleDateChange = (startOrEnd, event) => {
    console.log(event.target.value);
    if (startOrEnd === "start") {
      setBookingDates({
        ...bookingDates,
        start: event.target.value,
      });
    } else {
      setBookingDates({
        ...bookingDates,
        end: event.target.value,
      });
    }
  };

  return (
    <div>
      <BikeDisplayComponent
        id={bike.id}
        pricePerDay={bike.pricePerDay}
        name={bike.name}
        image={bike.image}
        isSelectingDates={true}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
        }
      />
      <div
        style={{
          fontSize: "1rem",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div id="start-date">
          <label htmlFor="starting">Start Date: </label>
          <input
            type="date"
            id="starting"
            value={bookingDates.start}
            onChange={(e) => handleDateChange("start", e)}
          />
        </div>
        <div id="end-date">
          <label htmlFor="ending">End Date: </label>
          <input
            type="date"
            id="ending"
            value={bookingDates.end}
            onChange={(e) => handleDateChange("end", e)}
          />
        </div>
      </div>
      <div id="display-prices">
        <p>Total: ${total}</p>
      </div>
      <div>
        <button
          style={{
            background: "orange",
            fontSize: "1.1rem",
            marginTop: "15px",
            color: "white",
          }}
          onClick={() => handleConfirmBooking(total, bookingDates)}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

const BikeRental = () => {
  const [allBikes, setAllBikes] = useState([...bikes]);
  const [view, setView] = useState(1);
  const [selectedBike, setSelectedBike] = useState(null);
  const [bikeTotal, setBikeTotal] = useState(0);
  const [bookingDates, setBookingDates] = useState({});

  const handleOnBikeRent = (id) => {
    const currBike = allBikes.filter((bike) => bike.id === id);
    console.log(currBike[0]);
    setSelectedBike(currBike[0]);
    setView(2);
  };

  const handleClickBackButton = () => {
    setView(1);
  };

  const handleConfirmBooking = (total, bookingDates) => {
    setBikeTotal(total);
    setBookingDates(bookingDates);
    setView(3);
  };

  return (
    <div>
      <h2>Bike Rentals</h2>
      {view !== 1 && (
        <button onClick={handleClickBackButton}>Back to All Bikes</button>
      )}
      {view === 1 &&
        allBikes.length > 0 &&
        allBikes.map((bike) => {
          return (
            <BikeDisplayComponent
              key={bike.id}
              id={bike.id}
              pricePerDay={bike.pricePerDay}
              name={bike.name}
              image={bike.image}
              isSelectingDates={false}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
              }
              handleOnBikeRent={handleOnBikeRent}
            />
          );
        })}

      {view === 2 && selectedBike && (
        <SelectDatesForBike
          bike={selectedBike}
          handleConfirmBooking={handleConfirmBooking}
        />
      )}

      {view === 3 && bikeTotal && bookingDates && (
        <ConfirmationPage
          bike={selectedBike}
          bookingDates={bookingDates}
          total={bikeTotal}
        />
      )}
    </div>
  );
};

export default BikeRental;
