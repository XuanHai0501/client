import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../../constant/route";
import orderApi from "../../../api/orderApi";
import { formatPrice } from "../../../utils/common";
import { STATUS_ORDER } from "../../../constant/common";
import dayjs from "dayjs";

const ListOrder = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Thông tin KH",
      key: "customer",
      render: (_, record) => (
        <>
          <p>Tên KH: {record.customerName}</p>
          <p>Email: {record.customerEmail}</p>
          <p>Phone: {record.customerPhone}</p>
          <p>Address: {record.address}</p>
        </>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => {
        return <p>{formatPrice(totalPrice)}</p>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return <Tag color={status === "CANCELED" ? "red" : "green"}>{STATUS_ORDER[status]}</Tag>;
      },
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        return <p>{dayjs(date).format("DD/MM/YYYY HH:mm:ss")}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={ROUTE_PATH.ORDER_DETAIL(record?._id)}>
            <Button type="primary">Detail</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const { data } = await orderApi.getAllOrders();
      const tableData = data.map((it) => {
        return {
          key: it._id,
          ...it,
        };
      });
      setTableData(tableData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="font-semibold text-xl mb-6">Danh sách đơn đặt hàng</h1>

      <Table columns={columns} dataSource={tableData} />
    </>
  );
};

export default ListOrder;
