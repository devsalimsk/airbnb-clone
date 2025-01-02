import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/place/" + place._id}
            key={place._id}
            className="group shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white"
          >
            <div className="relative w-full h-48 bg-gray-200">
              {place.photos?.[0] && (
                <img
                  className="object-cover w-full h-full"
                  src={"http://localhost:3000/" + place.photos[0]}
                  alt={place.title}
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg truncate">{place.address}</h2>
              <h3 className="text-sm text-gray-500 truncate">{place.title}</h3>
              <div className="mt-2">
                <span className="font-bold text-green-600">${place.price}</span>
                <span className="text-sm text-gray-500 ml-1">per night</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
