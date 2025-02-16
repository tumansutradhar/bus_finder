import { useState, useEffect } from "react";

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [busName, setBusName] = useState("");
  const [busNumber, setBusNumber] = useState("");
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
    if (!busName || !busNumber || !startLocation || !destination || !startDepartureTime || !destinationArrivalTime) {
      alert("Please fill all required fields!");
      return;
    }

    const newBus = {
      id: Date.now(), busName, busNumber, startLocation, startDepartureTime, destination, destinationArrivalTime, stoppages: stoppages.length > 0 ? stoppages : [],
    };

    const updatedBuses = [...buses, newBus];
    setBuses(updatedBuses);
    localStorage.setItem("buses", JSON.stringify(updatedBuses));

    setBusName("");
    setBusNumber("");
    setStartLocation("");
    setStartDepartureTime("");
    setDestination("");
    setDestinationArrivalTime("");
    setStoppages([]);
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
    <div className="p-6 pt-20 bg-[#FFEBCC] min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Manage Buses</h2>
      <div className="bg-[#FFF6E9] p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-lg">
        <input className="border p-3 w-full rounded-lg mb-3 bg-white" placeholder="Bus Name" value={busName} onChange={(e) => setBusName(e.target.value)} />
        <input className="border p-3 w-full rounded-lg mb-3 bg-white" placeholder="Bus Number" value={busNumber} onChange={(e) => setBusNumber(e.target.value)} />
        <h3 className="text-lg font-semibold mt-4">Start Location</h3>
        <input className="border p-3 w-full rounded-lg mb-3 bg-white" placeholder="Start Location" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} />
        <input className="border p-3 w-full rounded-lg mb-3 bg-white" type="time" value={startDepartureTime} onChange={(e) => setStartDepartureTime(e.target.value)} />
        <h3 className="text-lg font-semibold mt-4">Destination</h3>
        <input className="border p-3 w-full rounded-lg mb-3 bg-white" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <input className="border p-3 w-full rounded-lg mb-3 bg-white" type="time" value={destinationArrivalTime} onChange={(e) => setDestinationArrivalTime(e.target.value)} />
        <h3 className="text-lg font-semibold mt-4">Add Stoppages (Optional)</h3>
        <input className="border p-3 w-full rounded-lg mb-3 bg-white" placeholder="Stoppage Location" value={stoppageLocation} onChange={(e) => setStoppageLocation(e.target.value)} />
        <input className="border p-3 w-full rounded-lg mb-3 bg-white" type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
        <input className="border p-3 w-full rounded-lg mb-3 bg-white" type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
        <button className="bg-blue-500 text-white p-3 rounded-lg w-full font-semibold transition hover:bg-blue-600 active:bg-blue-700 shadow-md" onClick={addStoppage}>Add Stoppage</button>

        {stoppages.length > 0 && (
          <ul className="mt-4">
            {stoppages.map((stop, index) => (
              <li key={index} className="border p-3 rounded-lg bg-gray-100 mb-2 text-sm">
                <strong>{stop.location}</strong> - Arrival: {stop.arrivalTime}, Departure: {stop.departureTime}
              </li>
            ))}
          </ul>
        )}

        <button className="bg-green-500 text-white p-3 rounded-lg w-full mt-4 font-semibold transition hover:bg-green-600 active:bg-green-700 shadow-md" onClick={addBus}>Add Bus</button>
      </div>
      <div className="w-full max-w-2xl mt-8">
        {buses.map((bus) => (
          <div key={bus.id} className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800">{bus.busName} ({bus.busNumber})</h3>
            <h4 className="mt-2 font-semibold">Start Location:</h4>
            <p className="text-gray-700">{bus.startLocation} - Departure: {bus.startDepartureTime}</p>
            <h4 className="mt-2 font-semibold">Destination:</h4>
            <p className="text-gray-700">{bus.destination} - Arrival: {bus.destinationArrivalTime}</p>
            {bus.stoppages.length > 0 && (
              <>
                <h4 className="mt-2 font-semibold">Stoppages:</h4>
                <ul>
                  {bus.stoppages.map((stop, index) => (
                    <li key={index} className="border p-3 rounded-lg bg-gray-100 mb-2 text-sm">
                      <strong>{stop.location}</strong> - Arrival: {stop.arrivalTime}, Departure: {stop.departureTime}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <button className="bg-red-500 text-white p-3 rounded-lg mt-4 font-semibold transition hover:bg-red-600 active:bg-red-700 shadow-md w-full" onClick={() => deleteBus(bus.id)}>Delete Bus</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBuses;
  