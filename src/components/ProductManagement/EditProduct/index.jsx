import { Button, Form, Image, Input, InputNumber, Select, Upload } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import categoryApi from "../../../api/categoryApi";
import { uploadApi } from "../../../api/uploadApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_PATH } from "../../../constant/route";
import TextArea from "antd/es/input/TextArea";
import productApi from "../../../api/productApi";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return [e?.file];
};

const EditProduct = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});

  const selectImage = Form.useWatch(["image"], form);

  const previewImage = useMemo(() => {
    const file = selectImage?.[0]?.originFileObj;

    return file ? URL.createObjectURL(file) : "";
  }, [selectImage?.[0]?.originFileObj]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!params?.slug) return;

    fetchProduct();
  }, [params?.slug]);

  const fetchCategories = async () => {
    try {
      const { data } = await categoryApi.getAllCategory({ type: "SUB_CATEGORY" });
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await productApi.getProduct(params?.slug);
      setProduct({ ...data });
      delete data.image;

      form.setFieldsValue({
        ...data,
        category: data.category._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async ({ image, ...data }) => {
    try {
      let imageUrl = product.image;

      if (image) {
        imageUrl = await uploadApi(image[0].originFileObj);
      }

      await productApi.updateProduct({
        id: product._id,
        ...data,
        image: imageUrl,
      });
      toast.success("Cập nhật sản phẩm thành công");
      navigate(ROUTE_PATH.PRODUCT_MANAGEMENT);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="font-semibold text-xl mb-6">Cập nhật sản phẩm</h1>

      <div className="bg-white p-3 rounded-lg">
        <Form form={form} layout="vertical" className="max-w-2xl mx-auto mt-6" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên sản phẩm",
              },
            ]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="category"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn danh mục SP",
              },
            ]}
          >
            <Select placeholder="Chọn danh mục sản phẩm">
              {categories.map((it) => (
                <Select.Option value={it._id} key={`category-item-${it._id}`}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá sản phẩm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá sản phẩm",
              },
            ]}
          >
            <InputNumber placeholder="1" className="w-1/2" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Số lượng sản phẩm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng sản phẩm",
              },
            ]}
          >
            <InputNumber placeholder="1" className="w-1/2" />
          </Form.Item>

          <Form.Item label="Ảnh sản phẩm" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload accept="image/*" customRequest={() => {}} showUploadList={false} listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          {(previewImage || product.image) && (
            <div className="mb-4">
              <p>Preview</p>

              <Image src={previewImage || product.image} height={200} className="rounded object-cover" />
            </div>
          )}

          <Form.Item name="description" label="Mô tả sản phẩm">
            <TextArea placeholder="Nhập mô tả SP" rows={6} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditProduct;
