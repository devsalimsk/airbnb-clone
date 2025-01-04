import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen overflow-y-auto">
        <div className="p-8 grid gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl mr-32 font-semibold">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-9 flex gap-1 py-2 px-4 rounded-2xl shadow-lg bg-white text-black hover:bg-gray-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {place?.photos?.length > 0 &&
              place.photos.map((photo, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    src={"http://localhost:3000/" + photo}
                    alt={`Photo ${index + 1}`}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-50 -mx-8 px-8 py-8">
      <h1 className="text-4xl font-bold mb-3">{place.title}</h1>
      <a
        className="flex items-center gap-2 text-lg text-blue-600 underline mb-4"
        target="_blank"
        rel="noopener noreferrer"
        href={"https://maps.google.com/?q=" + place.address}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        {place.address}
      </a>
      <div className="relative mt-4">
        <div
          className="grid gap-2 grid-cols-[2fr_1fr] grid-rows-[auto_auto] rounded-2xl overflow-hidden"
          style={{ gridAutoRows: "minmax(0, 1fr)" }}
        >
          <div className="row-span-2 col-span-1 overflow-hidden">
            {place.photos?.[0] && (
              <img onClick={() => setShowAllPhotos(true)}
                className="object-cover cursor-pointer w-full h-full hover:scale-105 transition-transform"
                src={"http://localhost:3000/" + place.photos[0]}
                alt="Main Photo"
              />
            )}
          </div>
          {place.photos?.slice(1, 3).map((photo, index) => (
            <div
              key={index}
              className="overflow-hidden hover:scale-105 transition-transform"
            >
              <img onClick={() => setShowAllPhotos(true)}
                className="object-cover cursor-pointer w-full h-full"
                src={"http://localhost:3000/" + photo}
                alt={`Photo ${index + 2}`}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex items-center gap-1 absolute bottom-4 right-4 py-2 px-4 bg-blue-500 text-white rounded-2xl shadow-md hover:bg-blue-600 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
            />
          </svg>
          Show more photos
        </button>
      </div>

      <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in:{place.checkIn} <br />
          Chek-out:{place.checkOut} <br />
          Max number of Guests:{place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-2xl">Extra-info</h2>
      </div>
      <div className="mb-4 mt-1 text-sm text-gray-700 leading-4">
        {place.extraInfo}
      </div>
    </div>
  );
}

export default PlacePage;
