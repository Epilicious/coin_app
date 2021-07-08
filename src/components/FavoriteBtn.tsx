import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useRef, useState } from "react";
import { ReactElement } from "react";
import { Store, useStore } from "../Store";
import { Coin } from "../types/Coin";

interface Props {
  coin: Coin.RootObject;
}

function FavoriteBtn(props: Props) {
  const { store, dispatch } = useStore();

  const toggleFavorites = (store: Store, coin: Coin.RootObject) => {
    if (store.favorites.map((favorite) => favorite.id).includes(coin.id)) {
      dispatch({ type: "DELETE_FROM_FAVORITES", coin });
      return;
    }
    dispatch({ type: "ADD_TO_FAVORITES", coin });
    return;
  };

  const id = props.coin.id;
  const favID = store.favorites.filter((coin) => coin.id === id);

  return (
    <Button onClick={() => toggleFavorites(store, props.coin)}>
      {favID.length === 1 ? <StarFilled /> : <StarOutlined />}
    </Button>
  );
}

export default FavoriteBtn;
