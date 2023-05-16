import { Context, MakeStore, createWrapper } from "next-redux-wrapper";
import { AnyAction, applyMiddleware, legacy_createStore as createStore } from "redux";
import { RootState, reducer } from "./reducers";
import thunk, { ThunkDispatch } from "redux-thunk";

// create a makeStore function
// @ts-ignore
const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer, applyMiddleware(thunk));

// export an assembled wrapper
// @ts-ignore
export const wrapper = createWrapper<RootState>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>