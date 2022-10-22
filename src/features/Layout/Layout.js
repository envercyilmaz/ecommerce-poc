import React, { useEffect } from 'react';
import LogoImage from "../../assets/logo.svg";
import Icon from "../Icon";
import SortingMenu from '../SortingMenu';
import FilterMenu from '../FilterMenu';
import ProductList from '../ProductList';
import ShoppingCart from '../ShoppingCart';
import styles from './Layout.style';
import { useSelector, useDispatch } from 'react-redux';
import { setCartTotalPrice } from "../../redux/cartSlice";

const { Wrapper, Header, LogoContainer, Logo, Cart, Price, Content, LeftSide, ProductsContainer, RightSide, Footer, FooterText } = styles;

const Layout = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector(state => state.cart);
 
  // Any time cartItems change total price is updated
  useEffect(() => {
    if(cartItems?.length) {
      dispatch(setCartTotalPrice(cartItems));
    }
  }, [cartItems]);

  return (
    <Wrapper>
      <Header>
        <LogoContainer>
          <Logo src={LogoImage}/>
        </LogoContainer>
        <Cart>
          <Icon name="Basket" />
          {totalPrice ? (
             <Price>{"₺" + totalPrice}</Price>
          ) : null}
        </Cart>
      </Header>
      <Content>
          <LeftSide>
            <SortingMenu />
            <FilterMenu title="Brands" />
            <FilterMenu title="Tags" />
          </LeftSide>
        <ProductsContainer>
          <ProductList />
        </ProductsContainer>
        <RightSide>
          {cartItems?.length > 0 ? (
            <ShoppingCart items={cartItems} />
          ) : null}
        </RightSide>
      </Content>
      <Footer>
        <FooterText>©2019 Market</FooterText>
        <FooterText>.</FooterText>
        <FooterText>Privacy Policy</FooterText>
      </Footer>
    </Wrapper>
  );
}

export default Layout
