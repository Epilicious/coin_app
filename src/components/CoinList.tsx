import { Button, Input, Space, Spin, Table } from "antd";
import React, { ReactElement, useRef, useState } from "react";
import useCoinApi from "../shared/useCoinApi";
import { Coin } from "../types/Coin";
import "antd/dist/antd.css";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import colorPercent from "../shared/colorPercent";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  ColumnFilterItem,
  ColumnType,
  FilterConfirmProps,
} from "antd/lib/table/interface";

export interface FilterDropdownProps {
  prefixCls: string;
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: (param?: FilterConfirmProps) => void;
  clearFilters: () => void;
  filters?: ColumnFilterItem[];
  visible: boolean;
}

function CoinList(): ReactElement {
  const [coins, setCoins] = useCoinApi<Coin.RootObject[]>(
    "get",
    "coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  if (!coins) {
    return <Spin />;
  }

  const getColumnSearchProps = (dataIndex: keyof Coin.RootObject) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0] as string);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (
      filtered?: React.ReactNode | ((filtered: boolean) => React.ReactNode)
    ) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value: string, record: Coin.RootObject): boolean =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: boolean): void => {
      if (visible) {
        // @ts-ignore
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    /* render: (text: string | number) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ), */
  });

  const handleSearch = (
    selectedKeys: React.Key[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0] as string);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const columns: ColumnsType<Coin.RootObject> = [
    //@ts-ignore
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Coin.RootObject) => {
        console.log(record);
        return (
          <Link to={`/coins/${record.id}`}>
            <Space>
              <img
                src={`${record.image}`}
                alt={text}
                height="50px"
                width="50px"
              />
              <a>{text}</a>
            </Space>
          </Link>
        );
      },
      ...getColumnSearchProps("name"),
    },
    {
      title: "",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol: string) => symbol.toUpperCase(),
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
      key: "current_price",
      render: (price: number) => {
        const value = new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(price);
        return value;
      },
    },
    {
      title: "24h",
      dataIndex: "price_change_percentage_24h",
      key: "price_change_percentage_24h",
      render: (change: number) => colorPercent(change),
    },
  ];

  console.log(searchInput);
  return (
    <>
      <Table columns={columns} dataSource={coins} />
    </>
  );
}

export default CoinList;
