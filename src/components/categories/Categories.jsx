import useUser from "../../hooks/useUser"
import CategoriCard from "../categoriCard/CategoriCard"



const Categories = () => {
  const { Loading, UserCategories } = useUser()
  const mycat = UserCategories.map(e => <CategoriCard key={e.name} home e={e} />
  )
  if (Loading) return (
    <section className="w-full my-5 animate-pulse">
      <h1 className="text-xl font-bold md:text-2xl bg-gray-300 rounded w-40 h-6 mb-4"></h1>

      <div className="w-full flex overflow-x-scroll md:overflow-hidden gap-4 mt-5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="min-w-[150px] h-40 bg-gray-300 rounded-lg"
          ></div>
        ))}
      </div>
    </section>

  )
  if (UserCategories.length == 0) return
  return (
    <section
      className="w-full my-5"
    >
      <h1
        className="text-xl font-bold md:text-2xl"
      >اكتشف فئات منتجاتنا!</h1>
      <div
        className='w-full flex overflow-x-scroll md:overflow-hidden a mt-5'
      >
        {mycat}
      </div>
    </section>
  )
}

export default Categories