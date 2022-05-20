import React, { useEffect, useState, useRef, createRef } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/API";
import { Button, Form, Input, Select, Table } from "antd";
import { RedoOutlined } from "@ant-design/icons";

const fieldValue = [
  {
    id: 0,
    title: "title",
  },
  {
    id: 1,
    title: "status",
  },
  {
    id: 2,
    title: "content",
  },
  {
    id: 3,
    title: "created_at",
  },
];

const Posts = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [posts, setPosts] = useState([]);
  const [searchItem, setSearch] = useState([]);
  const token = window.localStorage.getItem("accessToken");
  const fetchData = async (type, search) => {
    const response = await getPosts(token, type, search);
    setPosts(response?.items);
  };
  useEffect(() => {
    if (token) {
      fetchData("list");
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  const handleSearch = () => {
    const { value, field } = form.getFieldValue();
    const fieldName = fieldValue?.filter((item) => item.id === +field)?.[0]
      ?.title;
    setSearch({
      fieldName: fieldName,
      searchValue: value,
    });
    fetchData("search", searchItem);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: "content",
      dataIndex: "content",
      key: "content",
      sorter: (a, b) => a.content.localeCompare(b.content),
    },
  ];

  const refreshPage = () => {
    fetchData("list");
    form.resetFields();
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form
          form={form}
          style={{ marginBottom: "5px" }}
          onFinish={handleSearch}
          layout="inline">
          <Form.Item
            name="field"
            label="Select field for search"
            rules={[{ required: true }]}>
            <Select
              placeholder="Select field for search"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {fieldValue?.map(({ id, title }) => (
                <Select.Option key={id} children={title}>
                  {title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="value"
            label="Please Enter "
            rules={[{ required: true }]}>
            <Input placeholder="Search in posts ..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" shape="circle" onClick={() => refreshPage()}>
          <RedoOutlined />
        </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={posts} />
      </div>
    </div>
  );
};

export default Posts;
