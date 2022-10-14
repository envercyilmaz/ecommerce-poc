import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size + "px"};
  height: ${({ size }) => size + "px"};
  cursor: ${({ onClick }) => (onClick ? "pointer" : "normal")}
`;

export default { Wrapper }
