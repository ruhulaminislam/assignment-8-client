import React from 'react'
import UpdateStudioPage from './updatestudio'
import { TStudio } from '@/lib/studios'

const page = async({ params }: { params: { id: string } }) => {
  const {id }=await params
  const response = await fetch(`http://localhost:5000/studios/${id}`)
  const data:TStudio = await response.json()
     
  return (
    <div>
      <UpdateStudioPage data={data}  ></UpdateStudioPage>
    </div>
  )
}

export default page
