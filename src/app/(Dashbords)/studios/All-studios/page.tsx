
import { TStudio } from '@/lib/studios'
import StudiosFilter from './StudiosFilter'

const AllStudios = async ({ searchParams }: { searchParams: Promise<{ category?: string }> }) => {
  const { category } = await searchParams;
    const res = await fetch('http://localhost:5000/all-studios')
    const allStudios:TStudio[] = await res.json()

   
  return (
    <div>
      <StudiosFilter allStudios={allStudios} initialCategory={category || "All"}></StudiosFilter>
    </div>
  )
}

export default AllStudios
