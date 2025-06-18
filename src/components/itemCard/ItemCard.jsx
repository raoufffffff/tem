import { Link } from "react-router-dom"

const ItemCard = ({ item }) => {
  return (
    <article
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      animate={{ opacity: 1 }}
      className='w-5/12 md:w-3/12 mx-2 overflow-hidden my-2 '
    >
      <Link
        to={`/item/${item._id}`}
        className='flex flex-col items-center justify-center'
      >
        <div
          className=' item-img rounded-xl w-full'
        >
          <img
            src={item.imgs[0]}
            alt={item.name}
            width={300}
            height={300}
            className='w-full  mb-2 min-w[300px] min-h-[150px] max-h-[150px] md:min-h-[250px] md:max-h-[250px] hover:scale-110 transition-all'
          />
        </div>
        <p
          className='px-4 text-center one-line'
        >{item.name}</p>
        <span
          className='flex text-center my-2 font-semibold'
        >{item.price} DA</span>
        <div
          className='w-[90%] mt-2 uppercase font-semibold hover:text-white hover:bg-black rounded-xl border border-black text-center py-2 mx-auto'
        >commander</div>
      </Link>
    </article>
  )
}

export default ItemCard