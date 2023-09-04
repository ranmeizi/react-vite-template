import React, { useEffect, useState } from "react";
import { Tree, Space, Button, message, Modal } from "antd";
import * as API from "@/services/system/resource";
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

type Props = {
  value?: DTOs.Resource.ResourceNodeDto;
  onChange?: (value: DTOs.Resource.ResourceNodeDto | undefined) => void;
  onAdd: (value: DTOs.Resource.ResourceNodeDto) => void;
  onDel: (value: DTOs.Resource.ResourceNodeDto) => void;
  apiRef: any;
};

export default function ({ value, onChange, onAdd, onDel, apiRef }: Props) {
  const [tree, setTree] = useState<DTOs.Resource.ResourceNodeDto[]>([]);
  const [selecteds, setSelecteds] = useState<DTOs.Resource.ResourceNodeDto[]>(
    value ? [value] : []
  );

  useEffect(() => {
    setSelecteds(value ? [value] : []);
  }, [value]);

  useEffect(() => {
    apiRef.current.getData = getData;
    getData();
  }, []);

  // 获取数据
  async function getData() {
    setTree(await API.getResourceTree());
  }

  // 渲染treenode
  function renderTreeNode(nodes: DTOs.Resource.ResourceNodeDto[] = []) {
    return nodes.map((node) => (
      <Tree.TreeNode
        key={node.code}
        title={
          <div className="f-r">
            <div>{node.name}</div>
            {selecteds?.[0]?.code === node.code ? (
              <Space style={{ marginLeft: "16px" }}>
                <Button
                  type="text"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(node);
                  }}
                >
                  <PlusOutlined style={{ color: "#1890ff" }} />
                </Button>
                <Button
                  type="text"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (node.children.length > 0) {
                      message.error("请先删除子节点");
                    } else {
                      Modal.confirm({
                        title: `操作确认`,
                        icon: <ExclamationCircleOutlined />,
                        content: `确认要删除<${node.name}>吗?`,
                        onOk() {
                          onDel(node);
                        },
                      });
                    }
                  }}
                >
                  <DeleteOutlined style={{ color: "#f5222d" }} />
                </Button>
              </Space>
            ) : null}
          </div>
        }
        data={node as any}
      >
        {renderTreeNode(node.children)}
      </Tree.TreeNode>
    ));
  }
  // 选择节点
  function onSelect(selectedKeys: any[], e: any) {
    if (onChange) {
      onChange(e.node.data);
    } else {
      setSelecteds([e.node.data]);
    }
  }
  return (
    <div>
      <Tree
        showLine
        showIcon
        selectedKeys={selecteds.map((item) => item.code)}
        autoExpandParent
        onSelect={onSelect}
      >
        {renderTreeNode(tree)}
      </Tree>
    </div>
  );
}
