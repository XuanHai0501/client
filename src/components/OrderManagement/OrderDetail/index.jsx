import { Button, Image, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderApi from "../../../api/orderApi";
import { formatPrice } from "../../../utils/common";
import { E_STATUS_ORDER, STATUS_ORDER } from "../../../constant/common";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const getNextStatus = (status) => {
  if (status === E_STATUS_ORDER.INITIAL) {
    return {
      status: E_STATUS_ORDER.CONFIRMED,
      statusText: "Xác nhận đơn hàng",
    };
  } else if (status === E_STATUS_ORDER.CONFIRMED) {
    return {
      status: E_STATUS_ORDER.DELIVERING,
      statusText: "Đang giao hàng",
    };
  } else if (status === E_STATUS_ORDER.DELIVERING) {
    return {
      status: E_STATUS_ORDER.DELIVERED,
      statusText: "Giao hàng thành công",
    };
  }
};

const OrderDetail = () => {
  const params = useParams();
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    params?.id && fetchData();
  }, [params?.id]);

  const columns = [
    {
      title: "Tên SP",
      key: "name",
      render: (_, record) => <p>{record.product.name}</p>,
    },
    {
      title: "Hình ảnh",
      key: "image",
      render: (_, record) => {
        return <Image src={record.product.image} width={150} height={150} className="object-cover" />;
      },
    },
    {
      title: "Giá SP",
      key: "price",
      render: (_, record) => {
        return <p>{formatPrice(record.product.price)}</p>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng tiền",
      key: "totalPrice",
      render: (_, record) => {
        return <p>{formatPrice(record.product.price * record.quantity)}</p>;
      },
    },
  ];

  const fetchData = async () => {
    try {
      const { data } = await orderApi.getOrder(params?.id);
      const products = data.products.map((it) => {
        return {
          key: it._id,
          ...it,
        };
      });
      setOrderDetail({
        ...data,
        products,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateStatusOrder = async (status) => {
    try {
      await orderApi.updateStatus(orderDetail?._id, status);
      toast.success("Cập nhật trạng thái thành công!");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-xl mb-6">Thông tin đơn hàng</h1>

        <div className="flex items-center gap-x-2">
          {[E_STATUS_ORDER.INITIAL, E_STATUS_ORDER.CONFIRMED].includes(orderDetail?.status) && (
            <Popconfirm
              title="Huỷ đơn hàng"
              description="Bạn có chắc chắn muốn huỷ ĐH?"
              onConfirm={() => onUpdateStatusOrder(E_STATUS_ORDER.CANCELED)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="dashed" danger>
                Huỷ ĐH
              </Button>
            </Popconfirm>
          )}

          {![E_STATUS_ORDER.CANCELED, E_STATUS_ORDER.DELIVERED].includes(orderDetail?.status) && (
            <Popconfirm
              title="Cập nhật trạng thái"
              description="Xác nhận cập nhật trạng thái ĐH?"
              onConfirm={() => onUpdateStatusOrder(getNextStatus(orderDetail?.status)?.status)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">{getNextStatus(orderDetail?.status)?.statusText}</Button>
            </Popconfirm>
          )}
        </div>
      </div>

      <div className="mb-4 bg-white rounded-lg p-3">
        <div className="flex">
          <div className="w-1/2 leading-6">
            <p>Tên KH: {orderDetail?.customerName}</p>
            <p>Email: {orderDetail?.customerEmail}</p>
            <p>Số điện thoại: {orderDetail?.customerPhone}</p>
            <p>Địa chỉ nhận hàng: {orderDetail?.address}</p>
          </div>
          <div className="w-1/2">
            <p>Trạng thái ĐH: {STATUS_ORDER[orderDetail?.status]}</p>
            <p>Thời gian đặt hàng: {dayjs(orderDetail?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</p>
            <p>Ghi chú: {orderDetail?.message || "Không có"}</p>
          </div>
        </div>

        <p className="font-semibold text-center mt-2 text-xl">Tổng tiền: {formatPrice(orderDetail?.totalPrice)}</p>
      </div>

      <Table columns={columns} dataSource={orderDetail?.products} pagination={false} />
    </>
  );
};

export default OrderDetail;
