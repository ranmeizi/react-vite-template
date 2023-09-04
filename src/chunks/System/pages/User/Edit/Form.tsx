import React from "react";
import {
  Form,
  FormInstance,
  Input,
  Space,
  Button,
  Col,
  Row,
  Typography,
  Card,
  Radio,
} from "antd";
import * as C from "@/CONSTANTS";

type MyFormProps = {
  form: FormInstance;
  onSubmit?: () => void;
  onClose?: () => void;
  isEdit?: boolean;
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function ({
  form,
  onSubmit,
  onClose,
  isEdit = false,
}: MyFormProps) {
  return (
    <Form form={form}>
      <Typography.Title level={5} id="role-baseinfo">
        基本信息
      </Typography.Title>
      <Card>
        <Row>
          <Col span={6} offset={2}>
            <Form.Item
              {...layout}
              label="用户名"
              name="uname"
              rules={[
                { required: true, message: "请输入用户名!" },
                { max: 20, message: "用户名最大长度20!" },
              ]}
            >
              <Input disabled={isEdit} />
            </Form.Item>
          </Col>
          <Col span={14} offset={1}>
            <Form.Item className="hl">用户初始密码默认为：Aa123456</Form.Item>
          </Col>

          <Col span={6} offset={2}>
            <Form.Item
              {...layout}
              label="用户姓名"
              name="nickname"
              rules={[{ max: 50, message: "用户姓名最大长度50!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              label="用户手机"
              name="mobile"
              rules={[{ pattern: /^\d{11}$/, message: "用户手机为11位数字!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              label="邮箱"
              name="email"
              rules={[{ max: 100, message: "邮箱最多100字!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8} />
        </Row>
      </Card>
      <Typography.Title className="mt-16" level={5} id="role-rolelist">
        角色信息
      </Typography.Title>
      <Card>
        <Col span={16}>
          <Form.Item
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            label="用户角色"
            // rules={[{ required: true, message: "请选择用户角色!" }]}
            initialValue={[]}
            name="roleIds"
          >
            {/* <RoleSelector roleType={superManage === 1 ? 0 : 1} /> */}
          </Form.Item>
        </Col>
      </Card>
      <Row justify="center" className="mt-16">
        <Space>
          <Button
            onClick={() => {
              onClose && onClose();
            }}
          >
            取消
          </Button>
          <Button
            type="primary"
            onClick={() => {
              onSubmit && onSubmit();
            }}
          >
            提交
          </Button>
        </Space>
      </Row>
    </Form>
  );
}
