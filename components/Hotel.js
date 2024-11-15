import Image from 'next/image';


// components/Item.js
export default function Hotel({ hotel }) {
  console.log("hotel component=>" , hotel )
    return (
      <div  style={{backgroundColor:'white' ,width:'50%' ,textAlign:"center" ,marginLeft:"auto",marginRight:"auto",borderRadius:"30px"  }}>
        <h3>  {hotel.name}</h3>
        <Image style={{borderRadius:"30px"}} src={hotel.image}  width={300} height={300}  />
        <p> Price:  <b> {hotel.price}</b>    </p> 
        <p> Rating: <b> {hotel.rating}  </b>  </p>
    </div>
    );
} 
  