 
import { StudioCard } from '@/components/StudioCard/studio-card'
import { TStudio } from '@/lib/studios'
import StudiosFilter from './StudiosFilter'


const AllStudios = async () => {
    const res = await fetch('http://localhost:5000/all-studios')
    const allStudios:TStudio[] = await res.json()

   
  return (
    <div>
      <StudiosFilter allStudios={allStudios}></StudiosFilter>
    </div>
  )
}

export default AllStudios
