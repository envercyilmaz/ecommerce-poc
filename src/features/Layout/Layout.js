import React, { useState } from 'react';
import LogoImage from "../../assets/logo.svg";
import Icon from "../Icon";
import SortingMenu from '../SortingMenu';
import FilterMenu from '../FilterMenu';
import ProductList from '../ProductList';
import styles from './Layout.style';

const { Wrapper, Header, LogoContainer, Logo, Cart, Price, Content, LeftSide, ProductsContainer, RightSide, Footer, FooterText } = styles;

const Layout = () => {

  return (
    <Wrapper>
      <Header>
        <LogoContainer>
          <Logo src={LogoImage}/>
        </LogoContainer>
        <Cart>
          <Icon name="Basket" />
          <Price>₺ 39,97</Price>
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
        <RightSide></RightSide>
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
