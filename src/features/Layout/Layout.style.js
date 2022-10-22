import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.contentBackgroundColor};
  overflow-y: auto;
  overflow-x: hidden;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  padding: 18.16px 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.brandColor};
  color: ${({ theme }) => theme.backgroundColor};
`;

const LogoContainer = styled.div`
  display: flex;
  height: 40.32px;
`;

const Logo = styled.img`
  height: 40.32px;
  align-self: center;
`;

const Cart = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 129px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.darkBrandColor};
  color: ${({ theme }) => theme.backgroundColor};
  right: 10%;
  padding: 0 24px;
`;

const Icon = styled.img`
  height: 24.52px;
`;

const Price = styled.div`
  color: ${({ theme }) => theme.backgroundColor};
  font-size: 14px;
  font-weight: 600;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 1 1232px;
  padding-top: 38.36px;
`;

const LeftSide = styled.div`
  flex: 0 1 296px;
`;

const ProductsContainer = styled.div`
  flex: 0 1 608px;
  margin: 0 16px;
`;

const RightSide = styled.div`
  flex: 0 1 296px;
`;

const Footer = styled.div`
  margin-top: auto;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterText = styled.span`
  height: 23px;
  color: ${({ theme }) => theme.brandColor};
  margin: 0 8px;
  font-weight: 400;
  font-size: 13px;
`;

export default { Wrapper, Header, LogoContainer, Logo, Cart, Icon, Price, Content, LeftSide, ProductsContainer, RightSide, Footer, FooterText }
