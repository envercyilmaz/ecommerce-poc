import React, { useCallback, useState } from 'react';
import Icon from "../Icon";
import styles from "./ShoppingCart.style";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";

const { Wrapper, CartItems, CartRow, InfoContainer, ItemPrice, ItemName, NumberBox, Footer, PriceBox, ButtonsContainer } = styles;

const ShoppingCart = ({ items }) => {

  const { totalPrice } = useSelector(state => state.shopping);

  return (
    <Wrapper>
      <CartItems>
        {items.map(({ amount, name, price }) => (
          <CartRow>
            <InfoContainer>
              <ItemName>{name}</ItemName>
              <ItemPrice>{price}</ItemPrice>
            </InfoContainer>
            <ButtonsContainer>
              <Icon name="Substract" size={12} onCLick={() => {}} />
              <NumberBox>{amount}</NumberBox>
              <Icon name="Plus" size={12} onCLick={() => {}} />
            </ButtonsContainer>
          </CartRow>
        ))}
      </CartItems>
      <Footer>
        <PriceBox>{"₺" + totalPrice}</PriceBox>
      </Footer>
    </Wrapper>
  );
}

ShoppingCart.propTypes = {
  items: PropTypes.array
}


export default ShoppingCart
