import React, { useEffect, useState } from 'react';
import Icon from "../Icon";
import styles from './FilterMenu.style';
import { useDispatch, useSelector } from 'react-redux';
import { applyFilter } from "../../redux/productsSlice";
import PropTypes from "prop-types";

const { Wrapper, Header, Content, InputRow, InputContainer, Label, CountLabel, SearchInput } = styles;

const FilterMenu = ({ title }) => {
  const dispatch = useDispatch();
  const { filterState } = useSelector(state => state.products);

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
              <Icon isClickable name={item.selected ? "CheckboxSelected" : "Checkbox"} size={26} onClick={() => {dispatch(applyFilter({ item, filterName }))}}/>
              <Label>{item.label}</Label>
              <CountLabel>{ item.count ? "(" + item.count + ")" : ""}</CountLabel>
            </InputRow>
          )) : null}
        </InputContainer>
      </Content>
    </Wrapper>
  );
}

FilterMenu.propTypes = {
  title: PropTypes.string
}


export default FilterMenu
