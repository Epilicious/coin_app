import { Line } from "@ant-design/charts";
import { Col, Row, Space, Spin } from "antd";
import { format } from "date-fns";
import React, { ReactElement, useRef } from "react";
import { useParams } from "react-router-dom";
import useCoinApi from "../shared/useCoinApi";
import { CoinDetail } from "../types/CoinDetail";
import CoinHistory from "../types/CoinHistory";
import { Radio, RadioChangeEvent } from "antd";

function CoinDetails(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const [coin] = useCoinApi<CoinDetail.RootObject>("get", `/coins/${id}`);
  const [time, setTime] = React.useState<string>("1");
  const [coinHistory] = useCoinApi<CoinHistory>(
    "get",
    `/coins/${id}/market_chart?vs_currency=eur&days=${time}`
  );

  if (!coin) return <Spin />;
  if (!coinHistory) return <Spin />;

  const handleSizeChange = (e: RadioChangeEvent) => {
    setTime(e.target.value);
  };

  const data = coinHistory.prices.map((history) => {
    if (time === "1") {
      const date = `${format(new Date(history[0]), "kk:mm")}`;
      return { date, value: Number(history[1].toFixed(2)) };
    }
    if (time === "7" || "14") {
      const date = `${format(new Date(history[0]), "dd.LL.y kk:mm")}`;
      return { date, value: Number(history[1].toFixed(2)) };
    }
    return {};
  });

  console.log(data);
  const config = {
    data,
    height: 300,
    xField: "date",
    yField: "value",
    xAxis: { tickCount: 6 },
    yAxis: {
      min: 0.9 * Number(coinHistory.prices[0][1]),
    },
  };

  return (
    <div>
      <Row justify="center">
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Space>
            <img src={coin.image.small} alt={coin.name} />
            <h1>{coin.name}</h1>
            <h1>{`(${coin.symbol.toUpperCase()})`}</h1>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col>
          <span
            dangerouslySetInnerHTML={{ __html: coin.description.en }}
          ></span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Radio.Group value={time} onChange={handleSizeChange}>
            <Radio.Button value="1">24h </Radio.Button>
            <Radio.Button value="7">7d</Radio.Button>
            <Radio.Button value="14">14d</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Line {...config} />
        </Col>
      </Row>
    </div>
  );
}

export default CoinDetails;
