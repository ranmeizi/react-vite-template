import React from 'react'
import { Form, FormInstance, Input, Space, Button, Col, Row, Typography, Card } from 'antd'

type MyFormProps = {
    form: FormInstance
    onSubmit?: () => void
    onClose?: () => void
}

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
}

export default function ({
    form,
    onSubmit,
    onClose
}: MyFormProps) {
    return <Form
        onFinish={onSubmit}
        form={form}
    >
        {/* 标题 */}
        <Typography.Title level={5}>基本信息</Typography.Title>
        <Card>
            <Row>
                <Col span={6} offset={2}>
                    <Form.Item
                        {...layout}
                        label='角色名称'
                        name='roleName'
                        rules={[{ required: true, message: '请输入角色名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
        <Row justify='center' className='mt-16'>
            <Space>
                <Button onClick={() => onClose && onClose()}>取消</Button>
                <Button type='primary' htmlType='submit'>查询</Button>
            </Space>
        </Row>
    </Form>
}
