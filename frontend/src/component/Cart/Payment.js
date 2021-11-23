import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import "./payment.css";
import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const loadScript =  (src) => {

    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src

      script.onload = () => {
        resolve(true);
      }

      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  const displayRazorpay = async (amount) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if(!res){
      alert.error("Check your connection")
      return;
    }

    const options = {
      key: "rzp_test_9SWXylcYkCm4Fk",
      currency:"INR",
      amount: amount * 100,
      name: "UTkarsh",
      description: "here",
      image:"https://example.com/your_logo.jpg",

      handler: function (response){
        alert.success(response.razorpay_payment_id)
        history.push("/success");
        dispatch(createOrder(order))
      },
      prefill:{
        email: user.email,
      }
      
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()

  }

const amount = orderInfo.totalPrice;
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />


         <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            onClick={displayRazorpay(amount)}
            className="paymentFormBtn"
          />

    </Fragment>
  );
};

export default Payment;