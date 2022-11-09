import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/cartSlice.js";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  return (
    <div>
      <h3>Cart</h3>
      <div className="cartWrapper">
        {products.map((product) => (
          <div className="cartCard" key={product.id}>
            <img src={product.image} alt="product" />
            <h5>{product.title}</h5>
            <h5>{product.price}</h5>

            <button onClick={() => handleRemove(product.id)} className="btn">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
