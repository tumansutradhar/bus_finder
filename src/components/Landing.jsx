import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function Landing() {
    const [from, setFrom] = useState(localStorage.getItem("from") || "");
    const [to, setTo] = useState(localStorage.getItem("to") || "");
    const [date, setDate] = useState(localStorage.getItem("date") || "");
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);

    useEffect(() => {
        localStorage.setItem("from", from);
        localStorage.setItem("to", to);
        localStorage.setItem("date", date);
    }, [from, to, date]);

    const swapLocations = () => {
        if (from && to) {
            setFrom(to);
            setTo(from);
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
    };

    const searchBuses = () => {
        setSearchClicked(true);
        const savedBuses = JSON.parse(localStorage.getItem("buses")) || [];

        if (savedBuses.length === 0) {
            setFilteredBuses([]);
            return;
        }

        const results = savedBuses.filter(bus =>
            bus.startLocation?.toLowerCase().trim() === from.toLowerCase().trim() &&
            bus.destination?.toLowerCase().trim() === to.toLowerCase().trim()
        );

        console.log("Filtered Buses:", results);
        setFilteredBuses(results);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#FFEBCC] px-4 py-6 pt-20">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Welcome to Bus Find</h1>
            <p className="text-gray-700 text-center mb-6">Seamless Bus Travel: Track, Plan & Ride with Ease!</p>
            <div className="w-full mb-8">
                <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 3000 }} loop={true} className="rounded-lg shadow-lg">
                    <SwiperSlide>
                        <img src="https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Bus 1" className="w-full h-96 object-cover rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Bus 2" className="w-full h-96 object-cover rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://images.unsplash.com/photo-1573812456956-4a85dfc2ed00?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Bus 3" className="w-full h-96 object-cover rounded-lg" />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="flex justify-center items-center w-full">
                <div className="bg-[#FFF6E9] p-4 rounded-2xl flex flex-col sm:flex-row items-center shadow-lg w-full max-w-4xl gap-4">
                    <div className="flex-1 flex items-center gap-2 px-4 border bg-white border-gray-300 rounded-lg w-full">
                        <input type="text" placeholder="From" className="outline-none w-full p-2 text-lg" value={from} onChange={(e) => setFrom(e.target.value)} />
                    </div>
                    <button className="bg-white border border-gray-300 rounded-full p-2 shadow-md flex items-center gap-1 transition hover:bg-gray-200" onClick={swapLocations}>
                        🔄 <span className="text-gray-500">Swap</span>
                    </button>
                    <div className="flex-1 flex items-center gap-2 px-4 border bg-white border-gray-300 rounded-lg w-full">
                        <input type="text" placeholder="To" className="outline-none w-full p-2 text-lg" value={to} onChange={(e) => setTo(e.target.value)} />
                    </div>
                    <div className="flex-1 flex items-center gap-2 px-4 border bg-white border-gray-300 rounded-lg w-full">
                        <input type="date" className="outline-none w-full p-2 text-lg" value={date} onChange={handleDateChange} />
                    </div>
                    <button className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold cursor-pointer shadow-lg transition hover:bg-red-600 w-full sm:w-auto" onClick={searchBuses} >
                        SEARCH BUSES
                    </button>
                </div>
            </div>
            <div className="w-full max-w-4xl mt-6">
                {searchClicked && (
                    filteredBuses.length > 0 ? (
                        <div className="grid gap-4">
                            {filteredBuses.map(bus => (
                                <div key={bus.id} className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                                    <h3 className="text-xl font-bold">{bus.busName} ({bus.busNumber})</h3>
                                    <p className="text-gray-700">Start: {bus.startLocation} - Departure: {bus.startDepartureTime}</p>
                                    <p className="text-gray-700">Destination: {bus.destination} - Arrival: {bus.destinationArrivalTime}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-red-600 text-center mt-4 text-lg font-semibold">No buses found. Please try a different search.</p>
                    )
                )}
            </div>
            <div id="about" className="w-full bg-[#FFF6E9] py-12 px-6 rounded-2xl mt-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                        <span className="text-red-500 font-semibold">Bus Find</span> is your **go-to platform** for tracking buses in real time. No more waiting at bus stops – check live bus locations, arrival & departure times, and plan your journey effortlessly!
                    </p>
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-6">
                    <div className="max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold text-gray-900">🕒 Live Bus Tracking</h3>
                        <p className="mt-2 text-gray-600">Check real-time bus arrival & departure updates.</p>
                    </div>
                    <div className="max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold text-gray-900">📍 Accurate Routes</h3>
                        <p className="mt-2 text-gray-600">Plan your travel with **precise route details**.</p>
                    </div>
                    <div className="max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold text-gray-900">🚏 Stoppage Info</h3>
                        <p className="mt-2 text-gray-600">Know where your bus stops and how long it stays.</p>
                    </div>
                </div>
                <div className="mt-10 text-center">
                    <p className="text-gray-700">&quot;Never miss your bus again – Track, Plan & Ride!&quot; 🚍</p>
                </div>
            </div>
            <div id="contact" className="w-full bg-[#FFF6E9] py-12 px-6 mt-10 rounded-2xl">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
                    <p className="mt-4 text-gray-600">Have any questions? Reach out to us!</p>
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-6">
                    <div className="max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold text-gray-900">📧 Email Support</h3>
                        <p className="mt-2 text-gray-600">support@busfind.com</p>
                    </div>
                    <div className="max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold text-gray-900">📞 Call Us</h3>
                        <p className="mt-2 text-gray-600">+123 456 7890</p>
                    </div>
                    <div className="max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold text-gray-900">📍 Office Location</h3>
                        <p className="mt-2 text-gray-600">731121,Golapbag, Bardhaman, West Bengal, India</p>
                    </div>
                </div>
                <div className="mt-10 text-center">
                    <p className="text-gray-700">&quot;We&apos;re here to help! Get in touch anytime.&quot; ✉️</p>
                </div>
            </div>
        </div>
    );
}
