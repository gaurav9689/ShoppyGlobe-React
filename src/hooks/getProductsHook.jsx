import { useState, useEffect } from 'react';

const getProductHook = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let data = await fetch("https://dummyjson.com/products");
        data = await data.json();
        setProductList(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return { productList, loading, error };
};

export default getProductHook;
