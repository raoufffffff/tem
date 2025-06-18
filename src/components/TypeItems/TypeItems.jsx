import ItemCard from '../itemCard/ItemCard'
import items from '../../constans/items'
const TypeItems = ({ name }) => {
  const mytype = items.filter(e => e.type == name).map((e, i) => <ItemCard key={i} item={e} />)
  if (items.filter(e => e.type == name).length == 0) {
    return <p
      className='text-center mt-7 mb-52 capitalize text-[#0007] text-xl'
    >Aucune donnée à afficher.</p>
  }
  return (
    <div
      className='w-full flex flex-wrap justify-evenly mt-3 mb-8 items-center'
    >
      {mytype}
    </div>
  )
}

export default TypeItems