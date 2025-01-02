import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen overflow-y-auto">
        <div className="p-8 grid gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-9 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black hover:bg-gray-300"
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
                    className="w-full h-full object-cover"
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
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl font-bold">{place.title}</h1>
      <a
        className="my-2 block font-semibold text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <div className="relative mt-4">
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            {place.photos?.[0] && (
              <div className="rounded-lg overflow-hidden">
                <img
                  className="aspect-square object-cover w-full"
                  src={"http://localhost:3000/" + place.photos[0]}
                  alt="Main Photo"
                />
              </div>
            )}
          </div>
          <div className="grid grid-rows-2 gap-2">
            {place.photos?.[1] && (
              <div className="rounded-lg overflow-hidden">
                <img
                  className="aspect-square object-cover w-full"
                  src={"http://localhost:3000/" + place.photos[1]}
                  alt="Photo 2"
                />
              </div>
            )}
            {place.photos?.[2] && (
              <div className="rounded-lg overflow-hidden">
                <img
                  className="aspect-square object-cover w-full"
                  src={"http://localhost:3000/" + place.photos[2]}
                  alt="Photo 3"
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex items-center gap-1 absolute bottom-4 right-4 py-2 px-4 bg-white text-gray-800 rounded-2xl shadow-lg hover:bg-gray-200 transition-all duration-200"
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
    </div>
  );
}

export default PlacePage;
