import React, { useEffect } from "react";
import Page from "@/components/Page";
import { Form, message } from "antd";
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
    try {
      const data = await form.validateFields();

      const action = id
        ? API.updateUser({
            id: Number(id),
            email: data.email,
            mobile: data.mobile,
            nickname: data.nickname,
            sex: data.sex,
          })
        : API.createUser({
            uname: data.uname,
            email: data.email,
            mobile: data.mobile,
            nickname: data.nickname,
            sex: data.sex,
          });

      action.then((res) => {
        if (res.data.code === 200) {
          message.success("修改成功");
          closeCurrentPage();
        } else {
          message.error(res.data.msg);
        }
      });

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Page>
      {/* 内容 */}
      <Myform
        form={form}
        onSubmit={onSubmit}
        onClose={closeCurrentPage}
        isEdit={id !== undefined}
      />
    </Page>
  );
}
