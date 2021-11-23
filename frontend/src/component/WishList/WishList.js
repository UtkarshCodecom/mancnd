import React, { Fragment } from "react";
import "../Cart/Cart.css";
import CartItemCard from "../Cart/CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToWishList,
  removeItemsFromWishList,
} from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const WishList = ({ history }) => {
  const dispatch = useDispatch();
  const { wishListItems } = useSelector((state) => state.wishList);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromWishList(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {wishListItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your WishList</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>M.R.P</p>
            </div>

            {wishListItems &&
              wishListItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <p className="cartSubtotal">{`₹${
                    item.price
                  }`}</p>
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default WishList;
