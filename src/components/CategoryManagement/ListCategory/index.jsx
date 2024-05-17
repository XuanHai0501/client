import { Button, Image, Popconfirm, Space, Switch, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTE_PATH } from "../../../constant/route";

const ListCategory = () => {
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
      render: (image, record) => {
        return <Image src={image} height={150} width={150} className="object-cover" />;
      },
    },
    {
      title: "Danh mục cha",
      dataIndex: "parentId",
      key: "parentId",
      render: (parent) => {
        return <p>{parent?.name}</p>;
      },
    },
    {
      title: "Hiển thị ở trang chủ",
      dataIndex: "isShowHome",
      key: "isShowHome",
      render: (isShowHome) => {
        return <Switch checked={isShowHome} disabled />;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={ROUTE_PATH.EDIT_CATEGORY(record?.slug)}>Edit</Link>

          <Popconfirm
            title="Xoá danh mục"
            description="Bạn có chắc muốn xoá danh mục này?"
            onConfirm={async () => {
              await categoryApi.deleteCategory(record._id);
              toast.success("Xoá danh mục thành công");
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
      const { data } = await categoryApi.getAllCategory({ type: "ALL" });
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
      <h1 className="font-semibold text-xl mb-6">Danh sách danh mục SP</h1>

      <Table columns={columns} dataSource={tableData} />
    </>
  );
};

export default ListCategory;
