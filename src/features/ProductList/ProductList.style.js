import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
`;

const Header = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 16px;
`;

const TabRow = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const TabButton = styled.button`
  cursor: pointer;
  height: 30px;
  width: 61px;
  border: 0;
  border-radius: 2px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ active }) => (active ? "#f2f0fd" : "#1ea4ce")};
  background-color: ${({ active }) => (active ? "#1ea4ce" : "#f2f0fd")};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
  box-shadow: 0px 6px 24px rgba(93, 62, 188, 0.04);
  border-radius: 2px;
  padding: 20px 0 0 20px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 124px;
  margin: 0 20px 20px 0;
`;

const ItemImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 124px;
  width: 124px;
  border: 1.17666px solid #f3f0fe;
  border-radius: 12px;
  background: #fefefe;
`;

const ItemImage = styled.div`
  width: 90px;
  height: 90px;
  background: #c4c4c4;
`;

const Label = styled.div`
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #191919;
  margin-bottom: 8px;
`;

const PriceLabel = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #1ea4ce;
  margin-top: 8px;
  margin-bottom: 5px;
`;

const AddButton = styled.button`
  cursor: pointer;
  height: 22px;
  background: #1ea4ce;
  border-radius: 2px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
`;


export default { Wrapper, Header, Content, ItemContainer, ItemImageContainer, ItemImage, Label, PriceLabel, TabRow, TabButton, AddButton }
