import React, { useState } from 'react';
import LogoImage from "../../assets/logo.svg";
import Icon from "../Icon";
import SortingMenu from '../SortingMenu';
import FilterMenu from '../FilterMenu';
import ProductList from '../ProductList';
import ShoppingCart from '../ShoppingCart';
import styles from './Layout.style';
import { useSelector } from 'react-redux';

const { Wrapper, Header, LogoContainer, Logo, Cart, Price, Content, LeftSide, ProductsContainer, RightSide, Footer, FooterText } = styles;

const Layout = () => {

  const { cartItems, totalPrice } = useSelector(state => state.shopping);

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
