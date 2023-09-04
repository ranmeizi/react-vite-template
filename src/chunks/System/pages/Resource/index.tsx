import Page from "@/components/Page";
import * as API from "@/services/system/resource";
import { Button, Card, Form, Typography } from "antd";
import React, { useRef, useState } from "react";
import MyForm from "./MyForm";
import Tree from "./Tree";

export default function () {
  const [selectedNode, setSelectedNode] =
    useState<DTOs.Resource.ResourceNodeDto>();

  const [parentCode, setParentCode] = useState<string>();

  const [form] = Form.useForm();
  const apiRef = useRef<any>({});

  function rootAdd() {
    setParentCode("root");
    setSelectedNode(undefined);
  }

  function onAdd({ code }: any) {
    setParentCode(code);
    setSelectedNode(undefined);
  }

  function onSubmit(data: any) {
    if (data.order) {
      data.order = Number(data.order);
    }

    // 编辑还是新增
    const promise = selectedNode
      ? API.updateResource({
          id: selectedNode.id,
          ...data,
        })
      : API.createResource({
          ...data,
          parent: parentCode,
        });
    promise.then((res) => {
      if (res.data.code === 200) {
        apiRef.current.getData();
        setSelectedNode(undefined);
      }
    });
  }

  function onDel({ id }: any) {
    // 到时候再写
    API.deleteById(Number(id)).then((res: any) => {
      if (res.data.code === 200) {
        apiRef.current.getData();
      }
    });
  }

  return (
    <Page>
      {/* 标题 */}
      <Typography.Title level={5}>页面配置</Typography.Title>
      {/* 内容 */}
      <div className="f-r j-between w-100" style={{ overflow: "hidden" }}>
        <div
          style={{
            marginBottom: "-9999px",
            paddingBottom: "9999px",
            flex: 1,
            marginRight: "16px",
          }}
        >
          <Card style={{ height: "100%" }}>
            {/* 标题 */}
            <Typography.Title level={5}>资源目录</Typography.Title>
            <div className="f-r j-between a-center">
              <div>当前节点：{selectedNode?.name}</div>
              <div>
                <Button onClick={rootAdd}>根目录添加节点</Button>
              </div>
            </div>
            <Tree
              apiRef={apiRef}
              value={selectedNode}
              onChange={setSelectedNode}
              onAdd={onAdd}
              onDel={onDel}
            />
          </Card>
        </div>
        <div style={{ marginBottom: "-9999px", paddingBottom: "9999px" }}>
          <Card style={{ height: "100%" }}>
            <MyForm
              form={form}
              parentNode={selectedNode}
              onRefresh={apiRef.current?.getData}
              onSubmit={onSubmit}
            />
          </Card>
        </div>
      </div>
    </Page>
  );
}
