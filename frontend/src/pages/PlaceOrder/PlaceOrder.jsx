import { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Informatio</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email address" />
          <input type="text" placeholder="Street" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals:</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total:</b>
            <b>${getTotalCartAmount() + 2}</b>
          </div>
          {/* <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button> */}
          <Link to="/">
            <button>PROCEED TO PAYMENT</button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
