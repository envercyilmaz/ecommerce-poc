import React, { useState } from 'react';
import Icon from "../Icon";
import styles from './FilterMenu.style';
import { useDispatch, useSelector } from 'react-redux';
import { applyFilter } from "../../redux/shoppingSlice";

const { Wrapper, Header, Content, InputRow, InputContainer, Label, SearchInput } = styles;

const FilterMenu = ({ title }) => {
  const { filterState } = useSelector(state => state.shopping);
  const filterName = title.toLowerCase();

  const items = filterState[filterName];

  return (
    <Wrapper>
      <Header>{title}</Header>
      <Content>
        <SearchInput type="text" placeholder={"Search " + filterName}></SearchInput>
        <InputContainer>
          {items.map(item => (
            <InputRow>
              <Icon name={item.selected ? "CheckboxSelected" : "Checkbox"} size={26} onClick={() => {}}/>
              <Label>{item.label}</Label>
            </InputRow>
          ))}
        </InputContainer>
      </Content>
    </Wrapper>
  );
}

export default FilterMenu
