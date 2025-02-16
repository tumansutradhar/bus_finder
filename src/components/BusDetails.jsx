import { useState, useEffect } from "react";

const BusDetails = () => {
  const [buses, setBuses] = useState([]);
  const [busNumber, setBusNumber] = useState("");
  const [fare, setFare] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [endTime, setEndTime] = useState("");
  const [editingBusId, setEditingBusId] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const allBuses = JSON.parse(localStorage.getItem("buses")) || [];
    setBuses(allBuses.filter(bus => bus.ownerId === loggedInUser?.email));
  }, []);

  const handleSaveBus = () => {
    if (!busNumber || !fare || !startLocation || !startTime || !endLocation || !endTime) {
      alert("All fields are required!");
      return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let updatedBuses;

    if (editingBusId) {
      updatedBuses = buses.map(bus => bus.id === editingBusId ? { ...bus, busNumber, fare, startLocation, startTime, endLocation, endTime } : bus );
    } else {
      const newBus = { id: Date.now(), ownerId: loggedInUser.email, busNumber, fare, startLocation, startTime, endLocation, endTime }; updatedBuses = [...buses, newBus];
    }

    setBuses(updatedBuses);
    localStorage.setItem("buses", JSON.stringify(updatedBuses));

    setBusNumber("");
    setFare("");
    setStartLocation("");
    setStartTime("");
    setEndLocation("");
    setEndTime("");
    setEditingBusId(null);
  };

  const handleEditBus = (bus) => {
    setBusNumber(bus.busNumber);
    setFare(bus.fare);
    setStartLocation(bus.startLocation);
    setStartTime(bus.startTime);
    setEndLocation(bus.endLocation);
    setEndTime(bus.endTime);
    setEditingBusId(bus.id);
  };

  const handleDeleteBus = (busId) => {
    const updatedBuses = buses.filter(bus => bus.id !== busId);
    setBuses(updatedBuses);
    localStorage.setItem("buses", JSON.stringify(updatedBuses));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Your Buses</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <input type="text" placeholder="Bus Number" className="w-full p-2 border rounded mb-2"
          value={busNumber} onChange={(e) => setBusNumber(e.target.value)} />
        <input type="text" placeholder="Fare" className="w-full p-2 border rounded mb-2"
          value={fare} onChange={(e) => setFare(e.target.value)} />
        <div className="flex space-x-2">
          <input type="text" placeholder="Start Location" className="w-1/2 p-2 border rounded"
            value={startLocation} onChange={(e) => setStartLocation(e.target.value)} />
          <input type="time" className="w-1/2 p-2 border rounded"
            value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div className="flex space-x-2 mt-2">
          <input type="text" placeholder="End Location" className="w-1/2 p-2 border rounded"
            value={endLocation} onChange={(e) => setEndLocation(e.target.value)} />
          <input type="time" className="w-1/2 p-2 border rounded"
            value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded" onClick={handleSaveBus}>
          {editingBusId ? "Update Bus" : "Add Bus"}
        </button>
      </div>
      <h3 className="text-xl font-bold mt-6">Your Buses</h3>
      {buses.length === 0 ? (
        <p>No buses added yet.</p>
      ) : (
        buses.map((bus) => (
          <div key={bus.id} className="bg-white p-4 shadow rounded my-2 flex justify-between items-center">
            <div>
              <p><strong>Bus:</strong> {bus.busNumber} | <strong>Fare:</strong> {bus.fare}</p>
              <p><strong>From:</strong> {bus.startLocation} at {bus.startTime} </p>
              <p><strong>To:</strong> {bus.endLocation} at {bus.endTime} </p>
            </div>
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleEditBus(bus)}>
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteBus(bus.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BusDetails;
