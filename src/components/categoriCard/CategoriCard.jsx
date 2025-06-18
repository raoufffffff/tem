import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CategoriCard = ({ e, home }) => {
    return (
        <Link
            className={`${home ? "min-w-[80%] md:min-w-[23%] md:max-w-[23%] border border-[#ff0075]" : "w-[45%] sm:w-[31%] md:w-[23%] my-2 mx-2"} bg-[#0004]  mx-2 rounded-xl overflow-hidden relative `}
            key={e.name}
            to={`/categories/${e.name}`}>
            <img
                src={e.img}
                alt={`${e.img}-img`}
                width={300}
                height={300}
            />
            <div
                className='absolute w-full h-full flex justify-end flex-col  bottom-0 left-0'
            >
                <p
                    className={`text-xl mb-3 ${!home && "text-[16px] sm:text-lg pl-3 mb-2"} font-bold  w-10/12 mx-auto text-white `}
                >{e.name}</p>
                <p
                    className={`${home ? "p-2.5  mb-5" : "mb-2 py-1 sm:py-2.5"} font-bold w-10/12 mx-auto flex items-center justify-center  uppercase rounded-lg bg-black text-white`}
                >
                    voir
                    <FaArrowRight
                        className='mx-2'
                    />
                </p>
            </div>
        </Link>
    )
}

export default CategoriCard