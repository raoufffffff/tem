import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPixel from 'react-facebook-pixel';

import Avis from "../components/item/avis/Avis";
import ItemForm from "../components/item/itemform/ItemForm";
import ItemImages from "../components/item/itemimgs/ItemImages";

// Prevent Pixel re-initialization on every route change
let pixelInitialized = false;

const Item = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getItem = async () => {
            try {
                const res = await axios.get(`https://true-fit-dz-api.vercel.app/item/${id}`);
                if (res.data.good) {
                    const data = res.data.result;
                    setItem(data);
                    setLoading(false);

                    // Initialize Pixel only once
                    if (data.Fpixal && !pixelInitialized) {
                        ReactPixel.init(data.Fpixal, {}, { debug: false }); // debug: true for testing
                        pixelInitialized = true;
                    }

                    // Always send a page view and ViewContent event
                    if (data.Fpixal) {
                        ReactPixel.pageView();
                        ReactPixel.track('ViewContent', {
                            content_name: data.name,
                            content_ids: [data._id],
                            content_type: 'product',
                            value: data.price,
                            currency: 'DZD',
                        });
                    }
                }
            } catch (err) {
                console.error("Failed to fetch item:", err);
                setLoading(false);
            }
        };

        getItem();
    }, [id]);

    if (loading) return <h1>Loading...</h1>;

    return (
        <div className="w-full px-5 mb-5 overflow-hidden">
            <div className="flex flex-col min-h-screen md:items-end relative">
                <div className="w-full md:w-6/12">
                    <h1 className="my-3 font-bold capitalize text-lg md:text-2xl">
                        {item.name}
                    </h1>
                    <p className="text-[#0007] font-[500] text-sm">{item.des}</p>
                    <h2 className="text-[#ef4444] font-bold my-2 text-xl">
                        {item.price} DA
                    </h2>
                </div>

                {/* Images Section */}
                <div className="w-full md:w-6/12 md:h-fit md:absolute top-0 left-0 overflow-hidden">
                    <ItemImages imgs={item.imgs} />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-6/12 mt-5">
                    <ItemForm price={item.price} />
                </div>
            </div>

            {/* Optional: Reviews Component */}
            {/* <Avis /> */}
        </div>
    );
};

export default Item;
