import React, { useState } from 'react';
import Icon from "../Icon";
import styles from './SortingMenu.style';
import { useDispatch, useSelector } from 'react-redux';
import { applySort } from "../../redux/productsSlice";

const { Wrapper, Header, Content, InputContainer, Label } = styles;

const SortingMenu = () => {
  const dispatch = useDispatch();
  const { sortingState: items } = useSelector(state => state.products);

  return (
    <Wrapper>
      <Header>Sorting</Header>
      <Content>
        {items.map(item => (
          <InputContainer key={item.label}>
            <Icon name={item.selected ? "RadioSelected" : "Radio"} size={22} onClick={() => dispatch(applySort(item))}/>
            <Label>{item.label}</Label>
          </InputContainer>
        ))}
      </Content>
    </Wrapper>
  );
}

export default SortingMenu
