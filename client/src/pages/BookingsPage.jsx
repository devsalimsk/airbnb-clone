import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div className="p-4">
      <AccountNav />
      <div className="grid gap-4 mt-4">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex flex-col md:flex-row gap-4 bg-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              key={booking._id}
            >
              <div className="w-full md:w-48 h-48 md:h-auto">
                <PlaceImg place={booking.place} />
              </div>
              <div className="flex flex-col justify-between py-3 px-4 grow">
                <h2 className="text-lg font-semibold">{booking.place.title}</h2>
                <div>
                  <BookingDates
                    booking={booking}
                    className="mb-2 mt-2 text-gray-500"
                  />
                  <div className="flex items-center gap-2 mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="text-xl font-medium">
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
