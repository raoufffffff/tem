import catégories from "../../constans/catégories"
import CategoriCard from "../categoriCard/CategoriCard"



const Categories = () => {
  const mycat = catégories.map(e => <CategoriCard key={e.name} home e={e} />
  )
  return (
    <div
      className='w-full flex overflow-x-scroll md:overflow-hidden a mt-5'
    >
      {mycat}
    </div>
  )
}

export default Categories