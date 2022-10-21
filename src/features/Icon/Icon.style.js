import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size + "px"};
  height: ${({ size }) => size + "px"};
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "normal")};
`;

export default { Wrapper }
