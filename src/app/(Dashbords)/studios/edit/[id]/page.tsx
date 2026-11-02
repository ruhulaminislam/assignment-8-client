import React from 'react'
import UpdateStudioPage from './updatestudio'
import { TStudio } from '@/lib/studios'
import { notFound } from 'next/navigation'
// import { notFound } from 'next/navigation'

const page = async({ params }: { params: { id: string } }) => {
  const {id }=await params
  const response = await fetch(`http://localhost:5000/studios/${id}`)
  
  if (!response.ok) {
    notFound()
  }
  const data:TStudio = await response.json()
     
  return (
    <div>
      <UpdateStudioPage data={data}  ></UpdateStudioPage>
    </div>
  )
}

export default page
