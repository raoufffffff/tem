
import React, { useRef, useState } from 'react'
import { GrDeliver } from "react-icons/gr";
import { FaMinus, FaPlus } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import states from '../../../constans/states';
import etat from '../../../constans/etat';

const ItemForm = ({ price, item }) => {
    const router = useNavigate();
    const formRef = useRef(null)
    const InputRef = useRef(null)
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
        InputRef.current?.focus()
    };

    const [user, setUser] = useState({
        name: "",
        phone: "",
        state: "",
        city: "",
        ride: 0,
        type: true,
        items: [item],
        q: 1,
        price: price,
        home: true,
        stutas: "new"
    });

    const [stateid, setStateid] = useState("0");
    const [Livrition, setLivrition] = useState({
        beru: 0,
        home: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        const selectedStateObj = states.find(state => state.name === selectedState);
        setStateid(selectedStateObj?.id || 0);
        setLivrition({ beru: selectedStateObj.stop_back, home: selectedStateObj.prix_initial });
        setUser({ ...user, state: selectedState, ride: selectedStateObj.prix_initial });
        if (errors.state) setErrors(prev => ({ ...prev, state: '' }));
    };

    const handleCityChange = (e) => {
        setUser({ ...user, city: e.target.value });
        if (errors.city) setErrors(prev => ({ ...prev, city: '' }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!user.name.trim()) newErrors.name = 'الاسم الكامل مطلوب';
        if (!user.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
        else if (!/^(\+?213|0)(5|6|7)[0-9]{8}$/.test(user.phone))
            newErrors.phone = 'رقم هاتف غير صحيح';
        if (!user.state) newErrors.state = 'الولاية مطلوبة';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            scrollToForm();
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`https://daily-api-tan.vercel.app/order`, user);
            if (response.data.good) {
                router.push('/thanks');
            } else {
                setErrors({ submit: 'حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى' });
            }
        } catch (error) {
            setErrors({ submit: 'حدث خطأ في الخادم، يرجى المحاولة لاحقًا' });
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }
    console.log(user);

    return (
        <>
            <div
                ref={formRef}
                className="w-full mx-auto md:w-10/12 mt-10 rounded-xl border-2 border-green-600 py-6 px-4 text-right font-[Cairo]">
                <h2 className="text-center font-bold text-green-700">املأ النموذج لإتمام الطلب</h2>

                {errors.submit && (
                    <div className="text-red-500 text-center mb-4">
                        {errors.submit}
                    </div>
                )}

                <div className="flex flex-wrap justify-evenly mt-5 items-center">
                    <div className="w-[90%]">
                        <input
                            ref={InputRef}
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className={`w-full my-2 placeholder:text-right text-right p-3 border-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                            placeholder="الاسم الكامل"
                        />
                        {errors.name && <p className="text-red-500 text-sm mr-2">{errors.name}</p>}
                    </div>

                    <div className="w-[90%]">
                        <input
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className={`w-full my-2 placeholder:text-right text-right p-3 border-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                            placeholder="رقم الهاتف"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mr-2">{errors.phone}</p>}
                    </div>

                    <div className="w-[45%]">
                        <select
                            name="state"
                            value={user.state}
                            onChange={handleStateChange}
                            className={`w-full my-2 p-3 border-2 ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-xl font-bold text-right`}
                        >
                            <option value="">اختر الولاية</option>
                            {states.map((e) => (
                                <option value={e.name} key={e.id}>{e.ar_name}</option>
                            ))}
                        </select>
                        {errors.state && <p className="text-red-500 text-sm mr-2">{errors.state}</p>}
                    </div>

                    <div className="w-[45%]">
                        <select
                            name="city"
                            value={user.city}
                            onChange={handleCityChange}
                            disabled={etat.filter(e => e.state_code == stateid).length === 0}
                            className={`w-full my-2 p-3 border-2 ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-xl text-right`}
                        >
                            <option value="">اختر المدينة</option>
                            {etat.filter(e => e.state_code == stateid).map((city, index) => (
                                <option value={city.name} key={index}>{city.ar_name}</option>
                            ))}
                        </select>
                        {errors.city && <p className="text-red-500 text-sm mr-2">{errors.city}</p>}
                    </div>
                </div>

                <h3 className='px-2 font-bold my-2 text-green-800'>مكان التوصيل</h3>

                <div onClick={() => setUser({ ...user, home: false, ride: Livrition.home })
                } className='flex items-center px-2 my-2 cursor-pointer'>
                    <span className='p-1 rounded-full ml-3 border border-black flex items-center'>
                        <span className={`rounded-full w-3 h-3 ${user.home && "bg-green-600"}`}></span>
                    </span>
                    <span>إلى المنزل</span>
                    <span className='mr-auto'>{Livrition.home} دج</span>
                </div>

                <div onClick={() => setUser({ ...user, home: false, ride: Livrition.beru })} className='flex items-center px-2 my-2 cursor-pointer'>
                    <span className='p-1 rounded-full ml-3 border border-black flex items-center'>
                        <span className={`rounded-full w-3 h-3 ${!user.home && "bg-green-600"}`}></span>
                    </span>
                    <span>إلى مكتب التوصيل</span>
                    <span className='mr-auto'>{Livrition.beru} دج</span>
                </div>

                <div className='flex mt-4 justify-between px-2 items-center text-sm'>
                    <span className='text-gray-700'>سعر التوصيل</span>
                    <span className={`bg-green-50 rounded-xl py-2 px-4 font-bold flex items-center`}>
                        {user.state && <GrDeliver className='ml-3' size={18} />}
                        {user.state ? (user.home ? Livrition.home : Livrition.beru) : "اختر الولاية ومكان التوصيل"} {user.state && "دج"}
                    </span>
                </div>

                <div className='flex mt-2 justify-between px-2 items-center text-sm'>
                    <span className='text-gray-700'>ثمن المنتجات</span>
                    <span className='font-bold'>{user.price * user.q} دج</span>
                </div>

                <div className='flex mt-3 justify-between px-2'>
                    <span className='font-bold'>الإجمالي</span>
                    <span className="text-green-600 text-lg font-bold">
                        {(user.price * user.q) + (user.state ? (user.home ? Livrition.home : Livrition.beru) : 0)} دج
                    </span>
                </div>

                <div className='flex px-2 mt-3 items-center'>
                    <div className='flex w-6/12 items-center'>
                        <button
                            type="button"
                            onClick={() => setUser({ ...user, q: user.q + 1 })}
                            className='bg-green-100 text-green-800 p-4 rounded-lg'
                        >
                            <FaPlus />
                        </button>
                        <span className='mx-3 text-xl font-bold'>{user.q}</span>
                        <button
                            type="button"
                            onClick={() => setUser({ ...user, q: user.q == 1 ? user.q : user.q - 1 })}
                            className='bg-green-100 text-green-800 p-4 rounded-lg'
                        >
                            <FaMinus />
                        </button>
                    </div>
                    <button
                        onClick={submit}
                        disabled={isSubmitting}
                        className='py-3 font-bold shadow-xl w-6/12 text-sm rounded-xl bg-green-700 text-white text-center disabled:bg-gray-400'
                    >
                        {isSubmitting ? 'جاري المعالجة...' : 'اطلب الآن'}
                    </button>
                </div>
            </div>
            <button
                onClick={scrollToForm}
                className="fixed bottom-4 right-4 left-4 md:right-10 md:left-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all z-40"
            >
                اشترِ الآن
            </button>
        </>
    );
};

export default ItemForm;