  "use client"
import { Button } from '@/components/ui/button'
import React from 'react'
type Booking = {
  _id: string;
  studioId: string;
  title: string;
  imageUrl: string;
  hourlyRate: string;
  bookingDate: string;
  startDate: string;
  endDate: string;
  duration: number;
  totalAmount: number;
  userName: string;
  userEmail: string;
  status: string;
};
const CancelBooking = ({isPending,status,booking }:{isPending: boolean; status: string,booking:Booking}) => {
    const handleCancelBooking=async()=>{
    const respose=await fetch("http://localhost:5000/cancel-booking",{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({id:booking._id,status:"Cancelled"})
    })
    const data=await respose.json()
    console.log(data)
    }
  return (
    <div>
        <div className="mt-4 border-t pt-4">
        <Button 
         onClick={handleCancelBooking}
          variant="outline"
          disabled={!isPending}
          className="w-full bg-[#6D4AFF] text-white hover:bg-[#5A3BD9] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        >
          {isPending ? "Cancel Booking" : status === "Cancelled" ? "Cancelled" : "Cancel Booking"}
        </Button>
      </div>
    </div>
  )
}

export default CancelBooking
