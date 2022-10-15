import styled from "styled-components";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 296px;
  border: 8.18px solid #1ea4ce;
  border-radius: 2px;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10.22px 22px 0;
`;

const CartRow = styled.div`
  width: 100%;
  display: flex;
  padding: 16.35px 0;
  border-bottom: 1px solid #f4f4f4;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #1ea4ce;
`;

const ItemName = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #191919;

`;

const NumberBox = styled.div`
  width: 32px;
  height: 32.7px;
  margin: 0 11px;
  background-color: #1ea4ce;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16.35px 0;
`;

const PriceBox = styled.div`
  margin-right: 16px;
  border: 2px solid #1ea4ce;
  border-radius: 2px;
  width: 92px;
  height: 51.1px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1ea4ce;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
`;


export default { Wrapper, CartItems, CartRow, InfoContainer, ItemPrice, ItemName, NumberBox, Footer, PriceBox, ButtonsContainer }
