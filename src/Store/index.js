import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../Reducer/index.js';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
