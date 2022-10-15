import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-top: 29px;
`;

const NumberBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 32px;
  margin-right: 3px;
  cursor: ${({ dots }) => (dots ? "normal" : "pointer")};
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  border-radius: 2px;
  border-width: 0;
  background-color:  ${({ theme, selected }) => (selected ? theme.brandColor : "transparent")};
  color: ${({ theme, selected }) => (selected ? theme.backgroundColor : theme.grayTextColor)};`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 10px;
  margin-left: ${({ prev }) => (prev ? "0" : "20px")};
  margin-right: ${({ next }) => (next ? "0" : "20px")};
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  border-width: 0;
  color: ${({ theme }) => theme.grayTextColor};
  background-color: transparent;
`;

const ButtonText = styled.div`
  margin-left:  ${({ left }) => (left ? "10px" : "0")};
  margin-right:  ${({ left }) => (!left ? "10px" : "0")};
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme, left }) => (left ? theme.brandColor : theme.grayTextColor)};
`;

export default { Wrapper, NumberBox, Button, ButtonText }
