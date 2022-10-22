import React, { useEffect } from 'react';
import Icon from "../Icon";
import styles from "./ShoppingCart.style";
import { useDispatch, useSelector } from 'react-redux';
import { setCartTotalPrice, handleRemoveCartItem, handleCartItemAmountChange } from "../../redux/cartSlice";
import PropTypes from "prop-types";

const { Wrapper, CartItems, CartRow, InfoContainer, ItemPrice, ItemName, NumberBox, Footer, PriceBox, ButtonsContainer, RemoveButton } = styles;

const ShoppingCart = ({ items }) => {

  const { cartItems, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // Any time cartItems change total price is updated
  useEffect(() => {
    if(cartItems?.length) {
      dispatch(setCartTotalPrice(cartItems));
    }
  }, [cartItems]);

  return (
    <Wrapper>
      <CartItems>
        {items.map(({ amount, name, price }, index) => (
          <CartRow key={name + index}>
            <InfoContainer>
              <ItemName>{name}</ItemName>
              <ItemPrice>{price}</ItemPrice>
              <RemoveButton onClick={() => dispatch(handleRemoveCartItem(index))}>Remove</RemoveButton>
            </InfoContainer>
            <ButtonsContainer>
              <Icon isClickable name="Substract" size={12} onClick={() => dispatch(handleCartItemAmountChange({ index, increment: -1}))} />
              <NumberBox>{amount}</NumberBox>
              <Icon isClickable name="Plus" size={12} onClick={() => dispatch(handleCartItemAmountChange({ index, increment: 1}))} />
            </ButtonsContainer>
          </CartRow>
        ))}
      </CartItems>
      <Footer>
        {totalPrice ? (
          <PriceBox>{"₺" + totalPrice}</PriceBox>
        ) : null}
      </Footer>
    </Wrapper>
  );
}

ShoppingCart.propTypes = {
  items: PropTypes.array
}


export default ShoppingCart
