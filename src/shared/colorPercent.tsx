import React from "react";
import { ReactElement } from "react";
import { FallOutlined, RiseOutlined } from "@ant-design/icons";
import { Space } from "antd";

function colorPercent(percent: number): ReactElement {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (percent < 0)
    return (
      <span style={{ color: "red" }}>
        <Space>
          <FallOutlined />
          {`${formatter.format(percent)} %`}
        </Space>
      </span>
    );
  if (percent > 0)
    return (
      <span style={{ color: "green" }}>
        <Space>
          <RiseOutlined />
          {`${formatter.format(percent)} %`}
        </Space>
      </span>
    );
  return <span>{`${formatter.format(percent)} %`}</span>;
}

export default colorPercent;
