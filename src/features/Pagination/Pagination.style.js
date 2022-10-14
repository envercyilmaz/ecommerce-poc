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
  background-color:  ${({ selected }) => (selected ? "#1ea4ce" : "transparent")};
  color: ${({ selected }) => (selected ? "#ffffff" : "#697488")};
`;

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
  color: #697488;
  background-color: transparent;
`;

const ButtonText = styled.div`
  margin-left:  ${({ left }) => (left ? "10px" : "0")};
  margin-right:  ${({ left }) => (!left ? "10px" : "0")};
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: ${({ left }) => (left ? "#1ea4ce" : "#697488")};
`;

export default { Wrapper, NumberBox, Button, ButtonText }
