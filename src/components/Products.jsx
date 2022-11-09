import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { STATUSES } from "../store/productSlice";
import { fetchProducts } from "../store/productSlice";

const Products = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    // const fetchProducts = async () => {
    //   const res = await fetch(`https://fakestoreapi.com/products`);
    //   const data = await res.json();

    //   // console.log(data);
    //   setProducts(data);
    // };

    // fetchProducts();

    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = (product) => {
    // Store the product in Redux store
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading...</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="productsWrapper">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt="product" />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button onClick={() => handleAdd(product)} className="btn">
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
