import React, { useEffect } from "react";
import Page from "@/components/Page";
import { Form } from "antd";
import Myform from "./Form";
import * as API from "@/services/system/user";
import { useParams } from "react-router-dom";

export default function () {
  const [form] = Form.useForm();
  const { closeCurrentPage } = Page.useTabController();
  const { id } = useParams<any>();

  useEffect(() => {
    id && getData(id);
  }, []);

  function getData(id: string) {
    API.findById({ id: Number(id) }).then((res) => {
      if (res.data.code === 200) {
        form.setFieldsValue(res.data.data);
      }
    });
  }

  async function onSubmit() {
    const data = await form.validateFields();

    console.log(data);
  }

  return (
    <Page>
      {/* 内容 */}
      <Myform form={form} onSubmit={onSubmit} onClose={closeCurrentPage} />
    </Page>
  );
}
