import * as React from 'react';
import { createContext, Reducer, useContext, useReducer } from 'react';
import { GoodsOption } from '@typings/db';

type OptionActions =
  | { type: 'ADD_OPTION'; option: GoodsOption }
  | {
      type: 'REMOVE_OPTION';
      size: GoodsOption['size'];
    }
  | { type: 'INCREMENT_OPTION_QUANTITY'; size: GoodsOption['size'] }
  | { type: 'DECREMENT_OPTION_QUANTITY'; size: GoodsOption['size'] }
  | {
      type: 'CHANGE_OPTION_QUANTITY';
      size: GoodsOption['size'];
      quantity: GoodsOption['quantity'];
    }
  | { type: 'RESET_OPTION' };

const optionReducer: Reducer<GoodsOption[], OptionActions> = (
  state,
  action
) => {
  switch (action.type) {
    case 'ADD_OPTION':
      return state.concat(action.option);
    case 'REMOVE_OPTION':
      return state.filter(option => option.size !== action.size);
    case 'INCREMENT_OPTION_QUANTITY':
      return state.map(option =>
        option.size === action.size
          ? { ...option, quantity: option.quantity + 1 }
          : option
      );
    case 'DECREMENT_OPTION_QUANTITY':
      return state.map(option =>
        option.size === action.size
          ? { ...option, quantity: option.quantity - 1 }
          : option
      );
    case 'CHANGE_OPTION_QUANTITY':
      return state.map(option =>
        option.size === action.size
          ? { ...option, quantity: action.quantity }
          : option
      );
    case 'RESET_OPTION':
      return [];
  }
};

const OptionContext = createContext<GoodsOption[] | undefined>(undefined);

const OptionDispatchContext = createContext<
  React.Dispatch<OptionActions> | undefined
>(undefined);

export function OptionProvider({ children }: React.PropsWithChildren<unknown>) {
  const [option, dispatch] = useReducer(optionReducer, []);

  return (
    <OptionDispatchContext.Provider value={dispatch}>
      <OptionContext.Provider value={option}>{children}</OptionContext.Provider>
    </OptionDispatchContext.Provider>
  );
}

export function useOption() {
  const state = useContext(OptionContext);
  if (state === undefined) {
    throw new Error('OptionContextProvider can not found');
  }
  return state;
}

export function useOptionDispatch() {
  const dispatch = useContext(OptionDispatchContext);
  if (dispatch === undefined) {
    throw new Error('OptionDispatchContextProvider can not found');
  }
  return dispatch;
}
