import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 296px;
  margin-bottom: 24px;
`;

const Header = styled.div`
  font-weight: 600;
  font-size: 13px;
  height: 18px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.grayTextColor};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 2px;
  padding: 24px;
`;

const InputRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  height: 124px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: -4px;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin-left: 12px;
  color: ${({ theme }) => theme.filterTextColor};
`;

const CountLabel = styled.div`
  margin-left: 4px;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.lightGrayTextColor};
`;

const SearchInput = styled.input`
  width: 248px;
  height: 48px;
  border: ${({ theme }) => "2px solid " + theme.searchInputBorder};
  border-radius: 2px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  padding: 12px 16px;
  margin-bottom: 17px;
  color: ${({ theme }) => theme.lightGrayTextColor};
`;

export default { Wrapper, Header, Content, InputRow, InputContainer, Label, CountLabel, SearchInput }
