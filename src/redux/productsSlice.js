import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const DEFAULT_IS_ASC = true;
const DEFAULT_SORT_FIELD = "price";

const initialState = {
  data: { raw: [], filtered: [], paginated: []},
  selectedType: "mug",
  isLoading: true,
  filterState: {
    brands: [
      { label: "All", value: 1, selected: true, count: "" }
    ],
    tags: [
      { label: "All", value: 1, selected: true, count: "" }
    ]
  },
  sortingState: [
    { label: "Price low to high", value: 1, selected: true, isAsc: true, fieldName: "price" },
    { label: "Price high to low", value: 2, selected: false, isAsc: false, fieldName: "price" },
    { label: "New to old", value: 3, selected: false, isAsc: false, fieldName: "added" },
    { label: "Old to new", value: 4, selected: false, isAsc: true, fieldName: "added" }
  ]
}

const _applyAllItemFilterChange = (state, filterName, newValue) => {
  state.filterState[filterName].forEach(el => {
    el.selected = newValue;
  })
}

const _getSortedAndUniqueItems = a => {
  return a.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
  });
}

const _fillCounts = (obj, list) => list.forEach(name => obj[name] ? obj[name]++ :  obj[name] = 1);

const _getCountMap = (brandList, tagList) => {
  let countMap = { brands: {}, tags: {} };
  _fillCounts(countMap.brands, brandList);
  _fillCounts(countMap.tags, tagList);
  return countMap;
}

const getInitialFilterData = data => {
  let brandListInit = [];
  let tagListInit = [];

  const filterObjBrands = [{ ...initialState.filterState.brands[0], count: data.length }];
  const filterObjTags = [{ ...initialState.filterState.tags[0], count: data.length }];

  data.forEach((item) => {
    brandListInit.push(item.manufacturer);
    tagListInit = tagListInit.concat(item.tags);
  });

  const countMap = _getCountMap(brandListInit, tagListInit) 

  const brandList = _getSortedAndUniqueItems(brandListInit);
  const tagList = _getSortedAndUniqueItems(tagListInit);


  brandList.forEach(label => {
    const value = filterObjBrands[filterObjBrands.length - 1].value + 1;
    filterObjBrands.push({ label, value, selected: true, count: countMap.brands[label] });
  });

  tagList.forEach(label => {
    const value = filterObjTags[filterObjTags.length - 1].value + 1;
    filterObjTags.push({ label, value, selected: true, count: countMap.tags[label] });
  });

  return { brands: filterObjBrands, tags: filterObjTags };
}

const _sortData = (data, isAsc, fieldName) => {
  const dataCopy = [...data];
  dataCopy.sort((a, b) => {
    if(isAsc) {
      return a[fieldName] - b[fieldName];
    }
    return b[fieldName] - a[fieldName];
  });

  return dataCopy;
}

export const getProducts = createAsyncThunk("products/getProducts", async (type, thunkAPI) => {
  try {
    const { data } = await axios("http://localhost:4000/items?itemType=" + type);
    return _sortData(data, DEFAULT_IS_ASC, DEFAULT_SORT_FIELD);
  } catch (error) {
    return thunkAPI.rejectWithValue("getProducts failed");
  }
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    setFilteredData: (state, action) => {
      state.data.filtered = action.payload;
    },
    setPaginatedData: (state, action) => {
      state.data.paginated = action.payload;
    },
    applyFilter: (state, action) => {
      const { item, filterName } = action.payload;
      const isAllItem = item.value === 1;
      if(isAllItem) {
        _applyAllItemFilterChange(state, filterName, !item.selected);
      } else {
        state.filterState[filterName].forEach(el => {
          if(el.value === item.value) {
            el.selected = !el.selected;
          } 
        })
      }
      let newFiltered = [];
      const rawCopy = [...JSON.parse(JSON.stringify(state.data.raw))];
      let filterState = {...JSON.parse(JSON.stringify(state.filterState))};
      // If "All" is selected there is no need to filter 
      if (!filterState.brands[0].selected) {
        const allowedBrands = filterState.brands.filter(item => item.selected).map(item => item.label);
        newFiltered = rawCopy.filter(item => allowedBrands.indexOf(item.manufacturer) >= 0);
      } else {
        newFiltered = rawCopy;
      }
      // If "All" is selected there is no need to filter 
      if (!filterState.tags[0].selected) {
        const allowedTags = filterState.tags.filter(item => item.selected).map(item => item.label);
        newFiltered = newFiltered.filter(item => {
          if(item?.tags?.length) {
            let includesAtLeastOne = false;
            item.tags.forEach(t => {
              if(allowedTags.indexOf(t) >= 0) {
                includesAtLeastOne = true;
              }
            })
            return includesAtLeastOne;
          } else {
            return false
          }
        });
      }

      state.data.filtered = newFiltered;
    },
    applySort: (state, action) => {
      const selectedItem = action.payload;
      const {value, fieldName, isAsc } = selectedItem;
      state.sortingState.forEach(item => {
        if(item.value === value) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      })    
      state.data.filtered = _sortData(JSON.parse(JSON.stringify(state.data.filtered)), isAsc, fieldName);
    }
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data.raw = action.payload;
      state.data.filtered = action.payload;
      state.filterState = getInitialFilterData(action.payload);
      state.sortingState = initialState.sortingState;
    },
    [getProducts.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  }
})

export const { setSelectedType, setFilteredData, setPaginatedData, applyFilter, applySort } = productsSlice.actions

export default productsSlice.reducer