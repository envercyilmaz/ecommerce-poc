import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Pagination from "../Pagination";
import styles from "./ProductList.style";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedType, getProducts, setPaginatedData } from "../../redux/productsSlice";
import { handleAddCartItem } from "../../redux/cartSlice";

const { Wrapper, Header, Content, ItemContainer, Label, PriceLabel, TabRow, TabButton, ItemImageContainer, ItemImage, AddButton } = styles;

const ProductList = () => {
  const { selectedType, data, isLoading } = useSelector(state => state.products);
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
      {isLoading ? (
        <Skeleton count={5} height={225} style={{ marginBottom: "15px"}}/>
      ) : (
        <>
          <Content>
            {data.paginated?.length > 0 ? data.paginated.map((item, index) => (
              <ItemContainer key={item.name + index}>
                <ItemImageContainer>
                  <ItemImage />
                </ItemImageContainer>
                <PriceLabel>{"₺ " + item.price}</PriceLabel>
                <Label>{item.name}</Label>
                <AddButton onClick={() => dispatch(handleAddCartItem(item))}>Add</AddButton>
              </ItemContainer>
            )) : null}
          </Content>
          {data.filtered?.length ? (
            <Pagination data={data} setPaginatedData={setPaginatedData} />
          ) : null}
        </>
      )}
      
    </Wrapper>
  );
}

export default ProductList
