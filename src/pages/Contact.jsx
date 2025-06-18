import { IoLogoWhatsapp } from "react-icons/io";
import { FaViber } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import SocialNetworks from "../components/social networks/SocialNetworks";

const Contact = () => {
    const contact = [
        {
            name: "whatsApp",
            link: "https://api.whatsapp.com/send/?phone=213793924024&text&type=phone_number&app_absent=0",
            img: <IoLogoWhatsapp size={22}
                className='mx-2 text-green-600'
            />,
            text: "0793924024"
        },
        {
            name: "viber",
            link: "viber://chat?number=213793924024",
            img: <FaViber size={22}
                className='mx-2 text-purple-600'
            />,
            text: "0793924024"
        },
        {
            name: "e-mail",
            link: "",
            img: <MdAlternateEmail size={22}
                className='mr-2 text-orange-600'
            />,
            text: "yacinesoft16@gmail.com"
        },
    ].map(e => (
        <a
            key={e.name}
            href={e.link}
            target='_blank'
            className='capitalize my-2'>
            <p
                className='text-xl font-[600] my-2'
            >{e.name}</p>
            <p
                className='flex items-center font-[500]'
            >{e.img} {e.text}</p>
        </a>
    ))

    return (
        <div
            className='w-full px-5 mb-20'
        >
            <h1
                className='mb-3 mt-7 font-bold capitalize  text-xl md:text-3xl'
            >contactez-nous</h1>
            <div
                className='w-full mt-5'
            >
                {contact}
            </div>
            <div
                className='w-full'
            >
                <h2
                    className='mb-3 mt-7 font-bold capitalize  text-lg md:text-2xl'
                >
                    réseaux sociaux
                </h2>
                <SocialNetworks page />
            </div>
        </div>
    )
}

export default Contact