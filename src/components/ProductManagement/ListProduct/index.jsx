import { Button, Image, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTE_PATH } from "../../../constant/route";
import productApi from "../../../api/productApi";
import { formatPrice } from "../../../utils/common";

const ListProduct = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <Image src={image} height={150} width={150} className="object-cover" />;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <p>{formatPrice(price)}</p>,
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Lượt xem",
      dataIndex: "view",
      key: "view",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return <p>{category?.name}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={ROUTE_PATH.EDIT_PRODUCT(record?.slug)}>Edit</Link>

          <Popconfirm
            title="Xoá sản phẩm"
            description="Bạn có chắc muốn xoá SP này?"
            onConfirm={async () => {
              await productApi.deleteProduct(record._id);
              toast.success("Xoá sản phẩm thành công");
              fetchData();
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const { data } = await productApi.getAllProducts();
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
      <h1 className="font-semibold text-xl mb-6">Danh sách SP</h1>

      <Table columns={columns} scroll={{ x: 1000 }} dataSource={tableData} />
    </>
  );
};

export default ListProduct;
