import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from ".."
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

// Define a type for the slice state
export interface CounterState {
    value: number
  }
const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

  // Define the initial state using that type
  const initialState: CounterState = {
    value: 12
  } as CounterState
  
  export const counterSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      increment: state => {
        state.value += 1
      },
      decrement: (state) => {
        state.value -= 1
      },
      // Use the PayloadAction type to declare the contents of `action.payload`
      incrementByAmount: (state, action: PayloadAction<number>) => {
        state.value += action.payload
      }
    }
  })

  export const { increment, decrement, incrementByAmount } = counterSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  export const selectCount = (state: RootState) => state.counter.value
  
  export default counterSlice.reducer