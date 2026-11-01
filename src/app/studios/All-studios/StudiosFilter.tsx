"use client"
import { StudioCard } from '@/components/StudioCard/studio-card';
import { TStudio } from '@/lib/studios';
import React, { useState } from 'react'

const StudiosFilter = ({allStudios }:{allStudios:TStudio[]}) => {
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [sort, setSort] = useState("");
const AllStudiosFiltered=allStudios.filter((studio)=>{
      const matchSearch =
    studio.title.toLowerCase().includes(search.trim().toLowerCase()) ||
    studio.location.toLowerCase().includes(search.trim().toLowerCase());
    const matchCategory = category === "All" || studio.category === category;

  return matchSearch && matchCategory;
})
const sortedStudios = [...AllStudiosFiltered];

if (sort === "low") {
  sortedStudios.sort(
    (a, b) => Number(a.rate) - Number(b.rate)
  );
}

if (sort === "high") {
  sortedStudios.sort(
    (a, b) => Number(b.rate) - Number(a.rate)
  );}
  return (
    <div>
 <input
  type="text"
  placeholder="Search studios..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="All">All Studios</option>
  <option value="Photo Studio">Photo Studios</option>
  <option value="Film Stage">Film Stage</option>
  <option value="Podcast Lounge">Podcast Lounge</option>
  <option value="Music Suite">Music Suite</option>
  <option value="Workshop">Workshop</option>
</select>
<select
  value={sort}
  onChange={(e) => setSort(e.target.value)}
>
  <option value="">Default Sorting</option>
  <option value="low">Price: Low to High</option>
  <option value="high">Price: High to Low</option>
</select>
       <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
     <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedStudios.map((studio) => (
          <StudioCard key={studio?._id} studio={studio} />
        ))}
      </div>
      </section>
    </div>
  )
}

export default StudiosFilter
