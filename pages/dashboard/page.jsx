'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { present,notpresent }  from '../../store/userSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Hotel from "@/components/Hotel";

export default function Dashboard() {

    const [hotels, setHotels] = useState([]);
    const dispatch = useDispatch();
    const { data: session } = useSession();
// search compoenent queries
    const [results, setResults] = useState();
    const [destination, setDestination] = useState('');
    const router = useRouter()
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [noOfTravellers, setNoOfTravellers] = useState('');
    const [startDate, setStartDate] = useState(''); // Start date state
    const [endDate, setEndDate] = useState(''); // End date state
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');




// search compoenent queries


const handleSearch = async () => {

    try {
      const res = await axios.get(`/api/search`, {
        params: { 
          destination: destination, 
          fromDate:   fromDate, 
          toDate: toDate, 
          noOfTravellers: noOfTravellers,
          startDate: startDate ,
          endDate: endDate, // Pass start and end date as parameters
          minPrice: minPrice, 
          maxPrice: maxPrice 
        }
      });
      setResults(res.data.data);
      console.log("hotels=>",res.data.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    //   router.push('/displayhotel')};
    }
}

    console.log('userdata=>', session );

   
useEffect(()=>{
    console.log("use effect");
  if (minPrice){
    handleSearch()
  }
  if(maxPrice){
    handleSearch()
  }

},[minPrice,maxPrice])

    
      if (results){
        console.log("results=>",results)
      }
 

    if (session){
        dispatch(present(session?.user))
    }

    const signInHandler = ()=>{
        signIn();
    }

    const signOutHandler = ()=>{
        signOut()  ;
        dispatch(notpresent()) 
    }

  
    

    return (<div>
        <h4 style={{border:"1px solid black" ,width:'90px',padding:"2px"
         }} > Travel Vista </h4>
        {!session ? (    
        <>  
        <button style={{ marginLeft: '1150px' }} onClick={() =>   signInHandler()   }   >Sign in</button>
<h1 style={{ textAlign: 'center' }} > Welcome, Kindly Login to Continue </h1>
        </>
        ) : (
        <>
            <button style={{ marginLeft: '1150px' }} onClick={() => { signOutHandler()          }    }>Sign out</button>
            <h1 style={{ textAlign: 'center' }} > Welcome, {session.user.name} !  </h1>
        </>
        )}
        <div style={{ backgroundImage:  'url("/cover.webp")',width:'1250px',height:"700px" }} >
            {/* <h1 style={{color:"white", marginLeft:"450px" }} >Kindly enter your preference !</h1> */}
           
            <input  type="text" 
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="where to ?" 
        style={{ borderRadius:"15px", padding:'9px',marginLeft:"280px" ,marginTop:"50px"   }}
        />

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="From (date)" style={{ borderRadius:"15px", padding:'9px'  }}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="To (date)"
        style={{ borderRadius:"15px", padding:'9px'  }}
      />

      <input
        type="number"
        value={noOfTravellers}
        onChange={(e) => setNoOfTravellers(e.target.value)}
        placeholder="No of Travellers"
        style={{ borderRadius:"15px", padding:'9px'  }}
      />

      <button style={{ borderRadius:"15px", padding:'9px'}} onClick={handleSearch}> search </button>
<br />
<br />
        {results && <div>  <input placeholder="from" type="Number" onChange={(e) => {setMinPrice(e.target.value) }        }  style={{marginLeft:'450px' ,padding:'5px' ,borderRadius:"15px" }}         value={minPrice}  /> <input placeholder="to" type="Number"   value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value) }}  style={{padding:'5px',borderRadius:"15px"}}   />  </div>  }
        <br />
        <br />  
        {  results &&  results.map(  (hotel)     =>{
           return   <Hotel hotel={hotel}        />
        })              }


        </div>
    </div>
    )
}