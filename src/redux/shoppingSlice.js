import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  data: { raw: [], filtered: [], paginated: []},
  selectedType: "mug",
  isLoading: true,
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
    filterObjBrands.push({ label, value, selected: false });
  });

  tagList.forEach(label => {
    const value = filterObjTags[filterObjTags.length - 1].value + 1;
    filterObjTags.push({ label, value, selected: false });
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
    setSelectedType: (state, action) => {
      state.selectedType = action.payload
    },
    setFilteredData: (state, action) => {
      state.data.filtered = action.payload
    },
    setPaginatedData: (state, action) => {
      state.data.paginated = action.payload
    },
    applyFilter: (state, action) => {
      const filterType = action.payload
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

export const { setSelectedType, setFilteredData, setPaginatedData, applyFilter, applySort } = shoppingSlice.actions

export default shoppingSlice.reducer