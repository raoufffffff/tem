import ItemCard from '../itemCard/ItemCard'
// import items from '../../constans/items'
import { useEffect, useState } from 'react'
import axios from 'axios'

const BestItem = () => {
  const [Items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get(`https://true-fit-dz-api.vercel.app/item`)
        setItems(res.data.result)
      } catch (error) {
        setError("حدث خطأ أثناء تحميل المنتجات.")
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getItems()
  }, [])



  if (loading) {
    return <div className="text-center text-lg mt-5">جارٍ تحميل المنتجات...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 mt-5">{error}</div>
  }

  if (Items.length === 0) {
    return <div className="text-center text-gray-500 mt-5">لا توجد منتجات متاحة حالياً.</div>
  }

  const myBestItems = Items.map((e, i) => (
    <ItemCard key={i} item={e} />
  ))
  // const mybestItems = items.filter(e => e.best).map((e, i) => <ItemCard key={i} item={e} />)

  return (
    <div className="w-full flex flex-wrap justify-evenly mt-3 items-center">
      {myBestItems}
    </div>
  )
}

export default BestItem
