Sintaxe básica
'''
import React from 'react'
import ReactDOM from 'react-dom/client'

// Redux
import { Provider } from 'react-redux'
import  { configureStore } from '@reduxjs/toolkit';

import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

// Slice
const counterSlice = createSlice({
  name: 'counter',

  // Initial State
  initialState: {
      count: 0
  },
  
  // Reducers
  reducers: {
      increment: (state) => {
          state.count += 1
      },
      decrement: (state) => {
          state.count -= 1
      },
      toZero: (state) => {
          state.count = 0;
      }
  },
})

// Store
const store = configureStore({
  reducer: {
      counter: counterSlice.reducer
  }
})

// Actions
const { increment, decrement, toZero } = counterSlice.actions

const Counter  = () => {
  const count =  useSelector(state => state.counter.count);
  const dispatch = useDispatch()
  return (
      <>
          <p><button onClick={() => dispatch(counterSlice.actions.increment())}>+</button></p>
          <p>{count}</p>
          <p><button onClick={() => dispatch(counterSlice.actions.decrement())}>-</button></p>
          <p><button onClick={() => dispatch(counterSlice.actions.toZero())}>Zero</button></p>
      </>
  )
}

function App() {
  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
        <Counter />
      </p>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root'))
.render(
<Provider store={store}>
  <App/>
</Provider>)
'''