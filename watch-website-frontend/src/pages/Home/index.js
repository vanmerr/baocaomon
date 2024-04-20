import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductHome from '~/components/ProductHome';
import Slider from '~/components/Slider';
import { getAllProduct as allProduct, searchProduct  } from '~/services/productService';

export const handleSearch = (key) => {
    console.log(key);
    return <Home searchKey={key} />;
};

function Home() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const searchKey = new URLSearchParams(location.search).get('searchKey');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result;
                if (searchKey) {
                    result = await searchProduct(searchKey);
                } else {
                    result = await allProduct();
                }
                setProducts(result.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [searchKey]);

    return (
        <>
            <Slider />
            <ProductHome products={products} />
        </>
    );
}

export default Home;
