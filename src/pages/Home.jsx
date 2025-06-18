import BestItem from "../components/BestItem/BestItem";
import Categories from "../components/categories/Categories";

export default function Home() {
    return (
        <div
            className="w-full px-5 my-2"
        >

            <section
                className="w-full my-5"
            >
                <h1
                    className="text-xl font-bold md:text-2xl"
                >Découvrez nos catégories de produits !</h1>
                <Categories />
            </section>
            <section
                className="w-full my-5"
            >
                <h2
                    className="text-xl font-bold md:text-2xl"
                >Meilleurs produits</h2>
                <p
                    className="text-sm"
                >Découvrez les meilleurs produits aux meilleurs prix 🔥</p>
                <BestItem />
            </section>
        </div>
    );
}