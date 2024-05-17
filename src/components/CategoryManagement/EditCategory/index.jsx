import { Button, Form, Image, Input, Select, Switch, Upload } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import categoryApi from "../../../api/categoryApi";
import { uploadApi } from "../../../api/uploadApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_PATH } from "../../../constant/route";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return [e?.file];
};

const EditCategory = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

  const selectImage = Form.useWatch(["image"], form);
  const selectParentId = Form.useWatch(["parentId"], form);

  const previewImage = useMemo(() => {
    const file = selectImage?.[0]?.originFileObj;

    return file ? URL.createObjectURL(file) : "";
  }, [selectImage?.[0]?.originFileObj]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!params?.slug) return;

    fetchCategory();
  }, [params?.slug]);

  const fetchCategories = async () => {
    try {
      const { data } = await categoryApi.getAllCategory();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const { data } = await categoryApi.getCategory(params?.slug);
      const categoryData = data.category;

      form.setFieldsValue({
        name: categoryData?.name,
        parentId: categoryData?.parentId,
        isShowHome: categoryData?.isShowHome,
      });

      setCategory(categoryData);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async ({ image, ...data }) => {
    try {
      let imageUrl = category.image;

      if (image) {
        imageUrl = await uploadApi(image[0].originFileObj);
      }

      await categoryApi.updateCategory({
        id: category._id,
        ...data,
        image: imageUrl,
      });
      toast.success("Cập nhật danh mục thành công");
      navigate(ROUTE_PATH.CATEGORY_MANAGEMENT);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="font-semibold text-xl mb-6">Cập nhật danh mục SP</h1>

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

          <Form.Item label={<p>Ảnh danh mục</p>} name="image" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload accept="image/*" customRequest={() => {}} showUploadList={false} listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          {(previewImage || category.image) && (
            <div className="mb-4">
              <p>Preview</p>

              <Image src={previewImage || category.image} height={200} className="rounded object-cover" />
            </div>
          )}

          <Form.Item hidden={!selectParentId} label="Hiển thị ở trang chủ" valuePropName="checked" name="isShowHome">
            <Switch />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditCategory;
