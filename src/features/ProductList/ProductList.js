import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import Pagination from "../Pagination";
import styles from "./ProductList.style";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedType, getProducts, setFilteredData, setPaginatedData } from "../../redux/shoppingSlice";

const { Wrapper, Header, Content, ItemContainer, Label, PriceLabel, TabRow, TabButton, ItemImageContainer, ItemImage, AddButton} = styles;

const ProductList = () => {
  const { selectedType, data, isLoading } = useSelector(state => state.shopping);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(selectedType));
  }, [selectedType]);

  return (
    <Wrapper>
      <Header>Products</Header>
      <TabRow>
        <TabButton active={selectedType === "mug"} onClick={() => dispatch(setSelectedType("mug"))}>mug</TabButton>
        <TabButton active={selectedType === "shirt"} onClick={() => dispatch(setSelectedType("shirt"))}>shirt</TabButton>
      </TabRow>
      <Content>
        {data.paginated?.length && data.paginated.map(item => (
          <ItemContainer>
            <ItemImageContainer>
              <ItemImage />
            </ItemImageContainer>
            <PriceLabel>{"₺ " + item.price}</PriceLabel>
            <Label>{item.name}</Label>
            <AddButton>Add</AddButton>
          </ItemContainer>
        ))}
      </Content>
      {data.filtered?.length && (
        <Pagination data={data} setPaginatedData={setPaginatedData} />
      )}
    </Wrapper>
  );
}

export default ProductList
