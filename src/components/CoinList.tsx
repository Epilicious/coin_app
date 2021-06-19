import { Divider, Spin, Table } from "antd";
import React, { ReactElement, useState } from "react";
import useCoinApi from "../shared/useCoinApi";
import Coin from "../types/Coin";
import "antd/dist/antd.css";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";

function CoinList(): ReactElement {
  const [coins, setCoins] = useCoinApi<Coin[]>("get", "/coins/list");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  if (!coins) {
    return <Spin />;
  }

  const columns: ColumnsType<Coin> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Coin) => (
        <Link to={`/coins/${record.id}`}>
          <a>{text}</a>
        </Link>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={coins} />
    </>
  );
}

export default CoinList;
