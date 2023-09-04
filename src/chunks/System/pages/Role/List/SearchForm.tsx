import React from "react";
import { Form, FormInstance, Input, Space, Button, Col, Row } from "antd";

type MyFormProps = {
  form: FormInstance;
  onSubmit?: () => void;
  expand?: boolean; // 高级搜索？
};

export default function ({ form, onSubmit, expand = false }: MyFormProps) {
  return (
    <Form className="rvt-search-form" form={form}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Form.Item name="name" label="名称">
            <Input placeholder="模糊搜索" />
          </Form.Item>
        </Col>
        <Row justify="end" className="w-100" gutter={[16, 16]}>
          <Space>
            <Button onClick={() => form.resetFields()}>重置</Button>
            <Button type="primary" onClick={() => onSubmit && onSubmit()}>
              查询
            </Button>
          </Space>
        </Row>
      </Row>
    </Form>
  );
}
