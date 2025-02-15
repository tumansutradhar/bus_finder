import { useState, useEffect } from "react";

export default function Landing() {
    const [from, setFrom] = useState(localStorage.getItem("from") || "");
    const [to, setTo] = useState(localStorage.getItem("to") || "");
    const [date, setDate] = useState(localStorage.getItem("date") || "");

    useEffect(() => {
        localStorage.setItem("from", from);
        localStorage.setItem("to", to);
        localStorage.setItem("date", date);
    }, [from, to, date]);

    const swapLocations = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <div className="flex flex-col items-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome to Bus Management</h1>
            <p>Find and manage your buses easily.</p>
            <div className="flex justify-center items-center min-h-scree w-full">
                <div className="bg-white p-4 rounded-full flex items-center shadow-lg w-full max-w-4xl">
                    <div className="flex-1 flex items-center gap-2 px-4 border-r">
                        <input
                            type="text"
                            placeholder="From"
                            className="outline-none w-full"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </div>

                    <button
                        className="bg-white border rounded-full p-2 mx-2 shadow-md flex items-center gap-1"
                        onClick={swapLocations}
                    >
                        🔄 <span className="text-gray-500">Swap</span>
                    </button>

                    <div className="flex-1 flex items-center gap-2 px-4 border-r">
                        <input
                            type="text"
                            placeholder="To"
                            className="outline-none w-full"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 flex items-center gap-2 px-4">
                        <input
                            type="date"
                            className="outline-none w-full"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            max="2099-12-31"
                            min="1900-01-01"
                        />
                    </div>

                    <button className="bg-red-500 text-white px-6 py-3 rounded-full font-bold cursor-pointer shadow-lg">
                        SEARCH BUSES
                    </button>
                </div>
            </div>

            <div id="about" className="w-full max-w-4xl bg-white p-6 my-10 shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-center">About Us</h2>
                <p className="mt-2 text-center">
                    Welcome to our Bus Management System. We provide a seamless experience for
                    travelers to find and book buses, and for bus owners to manage their fleet.
                </p>
            </div>

            <div id="contact" className="w-full max-w-4xl bg-white p-6 my-10 shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-center">Contact Us</h2>
                <p className="mt-2 text-center">
                    Have any questions? Reach out to us at:
                </p>
                <p className="mt-1 font-semibold text-center">📧 Email: support@busmanagement.com</p>
                <p className="mt-1 font-semibold text-center">📞 Phone: +123 456 7890</p>
            </div>
        </div>
    );
}
