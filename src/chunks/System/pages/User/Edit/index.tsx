import React from 'react'
import Page from '@/components/Page'
import { Form } from 'antd'
import Myform from './Form'

export default function () {
    const [form] = Form.useForm()
    const { closeCurrentPage } = Page.useTabController()
    async function onSubmit() {
        const data = await form.validateFields()

        console.log(data)
    }
    return <Page>
        {/* 内容 */}
        <Myform form={form} onSubmit={onSubmit} onClose={closeCurrentPage} />
    </Page>
}
