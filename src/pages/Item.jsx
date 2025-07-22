import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactPixel from 'react-facebook-pixel';
import ItemForm from "../components/item/itemform/ItemForm";
import ItemImages from "../components/item/itemimgs/ItemImages";
import items from '../item.json'
import axios from "axios";
// Prevent Pixel re-initialization on every route change
let pixelInitialized = false;

const Item = () => {
    const { id } = useParams();
    const item = items.find(e => e._id === id)
    useEffect(() => {
        const getiyem = async () => {
            await axios.get(`https://true-fit-dz-api.vercel.app/item/${id}`)
                .then(res => {
                    console.log(res.data);

                })
        }
        getiyem()
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        const getItem = async () => {


            // Initialize Pixel only once
            if (item.Fpixal && !pixelInitialized) {
                ReactPixel.init(item.Fpixal, {}, { debug: false }); // debug: true for testing
                pixelInitialized = true;
            }

            // Always send a page view and ViewContent event
            if (item.Fpixal) {
                ReactPixel.pageView();
                ReactPixel.track('ViewContent', {
                    content_name: item.name,
                    content_ids: [item._id],
                    content_type: 'product',
                    value: item.price,
                    currency: 'DZD',
                });
            }
        }
        getItem();
    }, [id]);


    return (
        <div className="w-full flex flex-row-reverse flex-wrap justify-center px-5  mb-5 overflow-hidden">
            <ItemImages imgs={item.imgs} />
            <ItemForm item={item} />

        </div>
    );
};

export default Item;
