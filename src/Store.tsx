import React, {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useReducer,
} from "react";
import { Coin } from "./types/Coin";

export interface Store {
  favorites: Coin.RootObject[];
}

export const initialStore: Store = {
  favorites: [],
};

interface AddToFavorites {
  type: "ADD_TO_FAVORITES";
  coin: Coin.RootObject;
}

interface DeleteFromFavorites {
  type: "DELETE_FROM_FAVORITES";
  coin: Coin.RootObject;
}

export type Actions = AddToFavorites | DeleteFromFavorites;

export function reducer(store: Store, action: Actions): Store {
  switch (action.type) {
    case "ADD_TO_FAVORITES": {
      return { ...store, favorites: [...store.favorites, action.coin] };
    }
    case "DELETE_FROM_FAVORITES": {
      const index = store.favorites
        .map((coin) => coin.id)
        .indexOf(action.coin.id);
      return {
        ...store,
        favorites: store.favorites.filter((_coin, _index) => _index !== index),
      };
    }
  }
}

interface StoreContext {
  store: Store;
  dispatch: Dispatch<Actions>;
}

export const StoreContext = createContext({} as StoreContext);

export const useStore = (): StoreContext => useContext(StoreContext);

export function StoreProvider(props: { children: ReactElement }): ReactElement {
  const [store, dispatch] = useReducer(reducer, initialStore);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}
