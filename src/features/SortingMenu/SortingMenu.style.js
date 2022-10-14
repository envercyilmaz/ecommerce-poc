import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 296px;
  height: 214px;
  margin-bottom: 48px;
`;

const Header = styled.div`
  font-weight: 600;
  font-size: 13px;
  height: 18px;
  margin-bottom: 12px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 6px 24px rgba(93, 62, 188, 0.04);
  border-radius: 2px;
  padding: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 18px;
`;

const Label = styled.div`
  font-weight: 400;
  font-size: 14px;
  margin-left: 12px;
`;

export default { Wrapper, Header, Content, InputContainer, Label }
