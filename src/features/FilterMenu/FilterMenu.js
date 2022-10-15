import React, { useEffect, useState } from 'react';
import Icon from "../Icon";
import styles from './FilterMenu.style';
import { useDispatch, useSelector } from 'react-redux';
import { applyFilter } from "../../redux/shoppingSlice";

const { Wrapper, Header, Content, InputRow, InputContainer, Label, SearchInput } = styles;

const FilterMenu = ({ title }) => {
  const dispatch = useDispatch();
  const { filterState } = useSelector(state => state.shopping);

  const filterName = title.toLowerCase();
  const [shownItems, setShownItems] = useState();
  const [inputFilter, setInputFilter] = useState("");

  useEffect(() => {
    if (inputFilter) {
      setShownItems(filterState[filterName].filter(item => item.label.toLowerCase().includes(inputFilter)));
    } else {
      setShownItems(filterState[filterName]);
    }
  }, [inputFilter, filterState[filterName]]);

  return (
    <Wrapper>
      <Header>{title}</Header>
      <Content>
        <SearchInput type="text" placeholder={"Search " + filterName} value={inputFilter} onChange={(e => {setInputFilter(e.target.value)})} />
        <InputContainer>
          {shownItems?.length ? shownItems.map(item => (
            <InputRow key={item.label}>
              <Icon name={item.selected ? "CheckboxSelected" : "Checkbox"} size={26} onClick={() => {dispatch(applyFilter({ item, filterName }))}}/>
              <Label>{item.label}</Label>
            </InputRow>
          )) : null}
        </InputContainer>
      </Content>
    </Wrapper>
  );
}

export default FilterMenu
