import Hotel from '../components/Hotel';
import { useState, useEffect } from 'react';

export default function DisplayHotels(){

    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetchHotels();
      }, []);    
    
    const fetchHotels = async () => {
        const res = await fetch('/api/hotels');
        const { data } = await res.json();
        setHotels(data) ;
      } ;

    console.log('display Hotels => ,' , hotels)

    return( <div>
                <h1> display hotels </h1>
                {hotels.map((hotel) => (
                     <Hotel
                       key={hotel._id}
                       hotel={hotel}
          />
        ))}
        </div>
    )
}