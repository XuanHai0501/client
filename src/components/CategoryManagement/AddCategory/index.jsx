import { Button, Form, Image, Input, Select, Switch, Upload } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import categoryApi from "../../../api/categoryApi";
import { uploadApi } from "../../../api/uploadApi";
import { toast } from "react-toastify";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return [e?.file];
};

const AddCategory = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  const selectImage = Form.useWatch(["image"], form);
  const selectParentId = Form.useWatch(["parentId"], form);

  const previewImage = useMemo(() => {
    const file = selectImage?.[0]?.originFileObj;

    return file ? URL.createObjectURL(file) : "";
  }, [selectImage?.[0]?.originFileObj]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await categoryApi.getAllCategory();

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async ({ image, ...data }) => {
    try {
      const imageUrl = await uploadApi(image[0].originFileObj);
      await categoryApi.createCategory({
        ...data,
        image: imageUrl,
      });

      toast.success("Thêm danh mục thành công");
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="font-semibold text-xl mb-6">Thêm danh mục SP</h1>

      <div className="bg-white p-3 rounded-lg">
        <Form form={form} layout="vertical" className="max-w-2xl mx-auto mt-6" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên danh mục",
              },
            ]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item label="Danh mục cha" name="parentId">
            <Select placeholder="Chọn danh mục cha" allowClear>
              {categories.map((it) => (
                <Select.Option value={it._id} key={`category-item-${it._id}`}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Ảnh danh mục"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ảnh",
              },
            ]}
          >
            <Upload accept="image/*" customRequest={() => {}} showUploadList={false} listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          {previewImage && (
            <div className="mb-4">
              <p>Preview</p>

              <Image src={previewImage} height={200} className="rounded object-cover" />
            </div>
          )}

          <Form.Item hidden={!selectParentId} label="Hiển thị ở trang chủ" valuePropName="checked" name="isShowHome">
            <Switch />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddCategory;
