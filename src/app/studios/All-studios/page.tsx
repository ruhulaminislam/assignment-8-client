import { StudioCard } from '@/components/StudioCard/studio-card'
import { TStudio } from '@/lib/studios'
import React from 'react'

const AllStudios = async () => {
    const res = await fetch('http://localhost:5000/all-studios')
    const allStudios:TStudio[] = await res.json()
   
  return (
     <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
     <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allStudios.map((studio) => (
          <StudioCard key={studio?._id} studio={studio} />
        ))}
      </div>
      </section>
  )
}

export default AllStudios
