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
  color: ${({ theme }) => theme.headerColor};
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
  color: ${({ theme, active }) => (active ? theme.tabButtonColor : theme.brandColor)};
  background-color: ${({ theme, active }) => (active ? theme.brandColor : theme.tabButtonColor)};
`;

const Content = styled.div`
  flex: 0 0 1000px;
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: ${({ theme }) => theme.boxShadow};
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
  border: ${({ theme }) => "1.17666px solid " + theme.imageBorderColor};
  border-radius: 12px;
  background: ${({ theme }) => theme.secondaryBackgroundColor};
`;

const ItemImage = styled.div`
  width: 90px;
  height: 90px;
  background: ${({ theme }) => theme.darkGrayBackgroundColor};
`;

const Label = styled.div`
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 8px;
`;

const PriceLabel = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.brandColor};
  margin-top: 8px;
  margin-bottom: 5px;
`;

const AddButton = styled.button`
  cursor: pointer;
  height: 22px;
  background: ${({ theme }) => theme.brandColor};
  border-radius: 2px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.backgroundColor};
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
`;


export default { Wrapper, Header, Content, ItemContainer, ItemImageContainer, ItemImage, Label, PriceLabel, TabRow, TabButton, AddButton }
