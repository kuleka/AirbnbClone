import {Link} from 'react-router-dom';
import Header from "../Header.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(res => {
            setPlaces(res.data);
        })
    }, []);
    return(
      <div className="mt-8 grid gap-6 gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {places.length > 0 && places.map(place => (
              <Link to={'/place/'+place._id}>
                  <div className="bg-gray-500 mb-2 rounded-2xl flex">
                      {place.photo?.[0] && (
                          <img className="rounded-2xl object-cover aspect-square"
                               src={'http://localhost:3000/uploads/' + place.photo?.[0]} alt=""/>
                      )}
                  </div>
                  <h2 className="font-bold truncate">{place.address}</h2>
                  <h3 className="text-sm text-gray-500 truncate">{place.title}</h3>
                  <div className="mt-1">
                      <span className="font-bold">${place.price}</span> per night
                  </div>
              </Link>
          ))}
      </div>
    );
}