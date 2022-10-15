import styles from "./Pagination.style"
import { useState, useEffect, useCallback } from "react";
import Icon from "../Icon";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";

const TOTAL_BOX_ITEMS = 7;
const INNER_BOX_ITEMS = 3;
const { Wrapper, NumberBox, Button, ButtonText } = styles;

const Pagination = ({ data, pageDataLength=16, setPaginatedData }) => {
  const dispatch = useDispatch();
  const pageCount = Math.ceil(data.filtered.length/pageDataLength);
  const [currentPage, setCurrentPage] = useState(1);
  // indexes: 0,1,..6
  // pages: 1,2,..7
  // length: 7
  
  // data.filtered from a table is reconstructed for pagination purposes
  const convertToPaginated = useCallback(page => {
    const newData = [];
    const startingIndex = (page - 1) * pageDataLength;
    for(let i = 0; i < pageDataLength; i++) {
      const currentItem = data.filtered[startingIndex + i];
      currentItem && newData.push(data.filtered[startingIndex + i]);
    }
    return newData;
  }, [data.filtered]);

  // Covers both increment and decrement. if isUp === false it's decrement
  const increment = useCallback(isUp => {
    setCurrentPage(prev => {
      if (isUp && prev + 1 <= pageCount) {
        return prev + 1;
      } else  if (!isUp && prev - 1 >= 1) {
        return prev - 1;
      }
      return prev;
    });
  }, [pageCount]);

  useEffect(() => {
    // After a filter is applied and current page does not exist anymore, page is set to 1
    let currPage = currentPage;
    if (currentPage > pageCount) {
      currPage = 1;
      setCurrentPage(currPage);
    }
    if(data.filtered?.length) {
      dispatch(setPaginatedData(convertToPaginated(currPage)));
    }
  }, [data.filtered, currentPage]);

  // Designed for 7 boxes, should be modified if TOTAL_BOX_ITEMS value changes
  // If current page goes away from one side ... will appear
  // The logic of ... depends on TOTAL_BOX_ITEMS and the InnerPages component below

  return (
    <Wrapper>
      {currentPage > 1 && (
        <Button prev onClick={() => increment(false)}>
          <Icon name={"ArrowLeft"} size={24}/>
          <ButtonText left>Prev</ButtonText>
        </Button>
      )} 
      <NumberBox selected={currentPage === 1} onClick={() => setCurrentPage(1)}>1</NumberBox>
      {pageCount > TOTAL_BOX_ITEMS && currentPage > TOTAL_BOX_ITEMS - INNER_BOX_ITEMS ? (<NumberBox dots>...</NumberBox>) : pageCount > 1 ? (
         <NumberBox selected={currentPage === 2} onClick={() => {setCurrentPage(2)}}>2</NumberBox>
      ) : null}
      <InnerPages currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount} />
      {currentPage < pageCount - INNER_BOX_ITEMS && pageCount > TOTAL_BOX_ITEMS ? (<NumberBox dots>...</NumberBox>) : pageCount > INNER_BOX_ITEMS ? (
         <NumberBox selected={currentPage === pageCount - 1} onClick={() => {setCurrentPage(pageCount - 1)}}>{pageCount - 1}</NumberBox>
      ) : null}
      {pageCount > 2 && (
        <NumberBox selected={currentPage === pageCount} onClick={() => setCurrentPage(pageCount)}>{pageCount}</NumberBox>
      )}
      {currentPage < pageCount && (
        <Button next onClick={() => increment(true)}>
          <ButtonText>Next</ButtonText>
          <Icon name={"ArrowRight"} size={24}/>
        </Button>
      )} 
    </Wrapper>
  );
};

Pagination.propTypes = {
  data: PropTypes.object.isRequired, 
  setData: PropTypes.func.isRequired,
  pageDataLength: PropTypes.number.isRequired,
}

export default Pagination;

const InnerPages = ({ currentPage, setCurrentPage, pageCount }) => {
  let num = INNER_BOX_ITEMS; // default value indicates that left side is open at start
  if(pageCount <= 4) {
    return null;
  }

  if (pageCount > TOTAL_BOX_ITEMS) {
    const isLeftOpen = currentPage < TOTAL_BOX_ITEMS - INNER_BOX_ITEMS;
    const isRightOpen = currentPage > pageCount - INNER_BOX_ITEMS;
  
    if (isRightOpen) {
      num = pageCount - (TOTAL_BOX_ITEMS - INNER_BOX_ITEMS);
    } else if (!isLeftOpen) {
      num = currentPage - 1;
    }
  }

  return (
    <>
      {pageCount > 4 && (<NumberBox selected={currentPage === num} onClick={() => {setCurrentPage(num)}}>{num}</NumberBox>)}
      {pageCount > 5 && (<NumberBox selected={currentPage === num + 1} onClick={() => {setCurrentPage(num + 1)}}>{num + 1}</NumberBox>)}
      {pageCount > 6 && (<NumberBox selected={currentPage === num + 2} onClick={() => {setCurrentPage(num + 2)}}>{num + 2}</NumberBox>)}
    </>
  );
};

InnerPages.propTypes = {
  currentPage: PropTypes.number.isRequired, 
  setCurrentPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
}

