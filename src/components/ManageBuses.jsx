import { useState, useEffect } from "react";

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [busName, setBusName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [startDepartureTime, setStartDepartureTime] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationArrivalTime, setDestinationArrivalTime] = useState("");
  const [stoppages, setStoppages] = useState([]);
  const [stoppageLocation, setStoppageLocation] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");

  useEffect(() => {
    const storedBuses = JSON.parse(localStorage.getItem("buses")) || [];
    setBuses(storedBuses);
  }, []);

  const addBus = () => {
    if (!busName || !startLocation || !destination || !startDepartureTime || !destinationArrivalTime) {
      alert("Please fill all required fields!");
      return;
    }

    const newBus = { 
      id: Date.now(), 
      busName, 
      startLocation, 
      startDepartureTime, 
      destination, 
      destinationArrivalTime, 
      stoppages: stoppages.length > 0 ? stoppages : [] // Only add stoppages if they exist
    };

    const updatedBuses = [...buses, newBus];
    setBuses(updatedBuses);
    localStorage.setItem("buses", JSON.stringify(updatedBuses));

    setBusName("");
    setStartLocation("");
    setStartDepartureTime("");
    setDestination("");
    setDestinationArrivalTime("");
    setStoppages([]); // Reset stoppages after adding bus
  };

  const deleteBus = (id) => {
    const updatedBuses = buses.filter((bus) => bus.id !== id);
    setBuses(updatedBuses);
    localStorage.setItem("buses", JSON.stringify(updatedBuses));
  };

  const addStoppage = () => {
    if (!stoppageLocation || !arrivalTime || !departureTime) {
      alert("Please provide stoppage location and times!");
      return;
    }

    setStoppages([...stoppages, { location: stoppageLocation, arrivalTime, departureTime }]);
    setStoppageLocation("");
    setArrivalTime("");
    setDepartureTime("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Buses</h2>

      {/* Add Bus Form */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <input className="border p-2 w-full mb-2" placeholder="Bus Name" value={busName} onChange={(e) => setBusName(e.target.value)} />

        {/* Start Location */}
        <h3 className="text-lg font-semibold mt-4">Start Location</h3>
        <input className="border p-2 w-full mb-2" placeholder="Start Location" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} />
        <input className="border p-2 w-full mb-2" type="time" value={startDepartureTime} onChange={(e) => setStartDepartureTime(e.target.value)} />

        {/* Destination */}
        <h3 className="text-lg font-semibold mt-4">Destination</h3>
        <input className="border p-2 w-full mb-2" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <input className="border p-2 w-full mb-2" type="time" value={destinationArrivalTime} onChange={(e) => setDestinationArrivalTime(e.target.value)} />

        {/* Stoppages (Optional) */}
        <h3 className="text-lg font-semibold mt-4">Add Stoppages (Optional)</h3>
        <input className="border p-2 w-full mb-2" placeholder="Stoppage Location" value={stoppageLocation} onChange={(e) => setStoppageLocation(e.target.value)} />
        <input className="border p-2 w-full mb-2" type="time" placeholder="Arrival Time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
        <input className="border p-2 w-full mb-2" type="time" placeholder="Departure Time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={addStoppage}>Add Stoppage</button>

        {/* Display Added Stoppages */}
        {stoppages.length > 0 && (
          <ul className="mt-4">
            {stoppages.map((stop, index) => (
              <li key={index} className="border p-2 rounded bg-gray-100 mb-2">
                <strong>{stop.location}</strong> - Arrival: {stop.arrivalTime}, Departure: {stop.departureTime}
              </li>
            ))}
          </ul>
        )}

        <button className="bg-green-500 text-white p-2 rounded w-full mt-4" onClick={addBus}>Add Bus</button>
      </div>

      {/* Display Buses */}
      <div>
        {buses.map((bus) => (
          <div key={bus.id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-lg font-semibold">{bus.busName}</h3>

            <h4 className="mt-2 font-semibold">Start Location:</h4>
            <p>{bus.startLocation} - Departure: {bus.startDepartureTime}</p>

            <h4 className="mt-2 font-semibold">Destination:</h4>
            <p>{bus.destination} - Arrival: {bus.destinationArrivalTime}</p>

            {/* Display Stoppages Only If Added */}
            {bus.stoppages.length > 0 && (
              <>
                <h4 className="mt-2 font-semibold">Stoppages:</h4>
                <ul>
                  {bus.stoppages.map((stop, index) => (
                    <li key={index} className="border p-2 rounded bg-gray-100 mb-2">
                      <strong>{stop.location}</strong> - Arrival: {stop.arrivalTime}, Departure: {stop.departureTime}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <button className="bg-red-500 text-white p-2 rounded mt-2" onClick={() => deleteBus(bus.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBuses;
