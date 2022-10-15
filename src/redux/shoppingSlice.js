import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  data: { raw: [], filtered: [], paginated: []},
  selectedType: "mug",
  isLoading: true,
  cartItems: [
    {
      "price":11.99,
      "name":"Licensed Snow Mug",
      "amount": 1
   },
   {
      "price":12.99,
      "name":"Intelligent Trees Shirt",
      "amount": 5
   },
   {
      "price":15.99,
      "name":"Incredible Ocean Shirt",
      "amount": 3
   }
  ],
  totalPrice: 0,
  filterState: {
    brands: [
      { label: "All", value: 1, selected: true }
    ],
    tags: [
      { label: "All", value: 1, selected: true }
    ]
  },
  sortingState: [
    { label: "Price low to high", value: 1, selected: false, isAsc: true, fieldName: "price" },
    { label: "Price high to low", value: 2, selected: false, isAsc: false, fieldName: "price" },
    { label: "New to old", value: 3, selected: false, isAsc: false, fieldName: "added" },
    { label: "Old to new", value: 4, selected: false, isAsc: true, fieldName: "added" }
  ]
}

const applyAllItemFilterChange = (state, filterName, newValue) => {
  state.filterState[filterName].forEach(el => {
    el.selected = newValue;
  })
}

const getSortedAndUniqueItems = (a) => {
  return a.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
  });
}

const getInitialFilterData = data => {
  let brandListInit = [];
  let tagListInit = [];
  data.forEach((item) => {
    brandListInit.push(item.manufacturer);
    tagListInit = tagListInit.concat(item.tags);
  });

  const brandList = getSortedAndUniqueItems(brandListInit);
  const tagList = getSortedAndUniqueItems(tagListInit);
  const filterObjBrands = [...initialState.filterState.brands];
  const filterObjTags = [...initialState.filterState.tags];

  brandList.forEach(label => {
    const value = filterObjBrands[filterObjBrands.length - 1].value + 1;
    filterObjBrands.push({ label, value, selected: true });
  });

  tagList.forEach(label => {
    const value = filterObjTags[filterObjTags.length - 1].value + 1;
    filterObjTags.push({ label, value, selected: true });
  });

  return { brands: filterObjBrands, tags: filterObjTags };
}

export const getProducts = createAsyncThunk("shopping/getProducts", async (type, thunkAPI) => {
  try {
    const { data } = await axios("http://localhost:4000/items?itemType=" + type);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("getProducts failed");
  }
});

export const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    getCartTotalPrice: (state, action) => {
      const items = action.payload ? [...action.payload] : null;
      if(!items?.length) {
        return "";
      }
      const total = items.reduce(function (acc, obj) { return acc + (obj.price * obj.amount); }, 0);
      state.totalPrice = total;
    },
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
        applyAllItemFilterChange(state, filterName, !item.selected);
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

      const dataToSort = [...JSON.parse(JSON.stringify(state.data.filtered))];
      dataToSort.sort((a, b) => {
        if(isAsc) {
          return a[fieldName] - b[fieldName];
        }
        return b[fieldName] - a[fieldName];
      });
      state.data.filtered = dataToSort;
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
    },
    [getProducts.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  }
})

export const { getCartTotalPrice, setSelectedType, setFilteredData, setPaginatedData, applyFilter, applySort } = shoppingSlice.actions

export default shoppingSlice.reducer