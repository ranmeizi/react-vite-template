import React, { useEffect, useState } from "react";
import {
  Form,
  FormInstance,
  Input,
  Space,
  Button,
  Col,
  Row,
  Typography,
  Radio,
} from "antd";
import * as API from "@/services/system/resource";

type MyFormProps = {
  form: FormInstance;
  parentNode?: DTOs.Resource.ResourceNodeDto;
  parentCode?: any;
  onSubmit?: (data: any) => void;
  onRefresh: () => void;
};

export default function ({
  form,
  onSubmit,
  parentNode,
  parentCode,
  onRefresh,
}: MyFormProps) {
  const [initial, setInitial] = useState({} as any);
  useEffect(() => {
    if (parentNode?.id !== undefined) {
      API.findById(Number(parentNode.id)).then((res) => {
        const data = res.data.data;
        setInitial({
          code: data.code,
          desc: data.desc,
          name: data.name,
          order: data.order,
          url: data.url,
          type: data.type,
          title: data.title,
        });
        form.setFieldsValue({
          code: data.code,
          desc: data.desc,
          name: data.name,
          order: data.order,
          url: data.url,
          type: data.type,
          title: data.title,
        });
      });
    } else {
      // 重置initialvalue
      setInitial({
        code: undefined,
        desc: undefined,
        name: undefined,
        order: undefined,
        url: undefined,
        type: undefined,
        title: undefined,
      });
      // 重置表单
      setTimeout(() => {
        form.resetFields();
      }, 0);
    }
  }, [parentNode?.id]);

  return (
    <Form
      onFinish={onSubmit}
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      {/* 标题 */}
      <Typography.Title level={5}>
        {parentNode ? "编辑" : "新增"}资源
      </Typography.Title>
      <Form.Item
        label="资源CODE"
        name="code"
        initialValue={initial.elemCode}
        rules={[{ required: true, message: "资源CODE不能为空" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="desc" name="desc" initialValue={initial.desc}>
        <Input />
      </Form.Item>
      <Form.Item
        label="资源名称"
        name="name"
        initialValue={initial.name}
        rules={[{ required: true, message: "资源名称不能为空" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="类型"
        name="type"
        initialValue={initial.type || "1"}
        rules={[{ required: true, message: "类型不能为非空" }]}
      >
        <Radio.Group disabled={parentNode?.id !== undefined}>
          <Radio value={"1"}>普通</Radio>
          <Radio value={"2"}>菜单</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="页面Title" name="title" initialValue={initial.title}>
        <Input />
      </Form.Item>
      <Form.Item label="页面Url" name="url" initialValue={initial.url}>
        <Input />
      </Form.Item>
      <Form.Item label="排序" name="order" initialValue={initial.order}>
        <Input type="number" min={0} />
      </Form.Item>
      <Row justify="center" className="mt-16">
        <Space>
          <Button htmlType="reset">重置</Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Space>
      </Row>
    </Form>
  );
}
