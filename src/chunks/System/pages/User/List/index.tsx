import React, { useEffect, useState, useMemo } from "react";
import Page from "@/components/Page";
import {
  Card,
  Typography,
  Form,
  Button,
  Space,
  Table,
  Divider,
  Pagination,
  TableColumnType,
  Modal,
  message,
} from "antd";
import SearchForm from "./SearchForm";
import { usePagination, useRowSelection } from "@/utils/hooks/common";
import { ExpandOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import * as API from "@/services/system/user";
import * as Formatter from "@/utils/Formatter";

export default function () {
  const history = useHistory();
  // 表单
  const [form] = Form.useForm();
  const [full, setFull] = useState(false);
  // 表格数据 请按照类型替换 unknown ！
  const [list, setList] = useState<DTOs.User.UserDTO[]>([]);
  // 分页器
  const [pagination, setPagination, paginationProps] = usePagination();
  // 选择器
  const { selectionProps, showDetail, reset } = useRowSelection();

  const { dropPage } = Page.useTabController();

  useEffect(() => {
    getData(1);
  }, []);

  // 获取数据函数
  async function getData(
    pageNum = pagination.pageNum,
    pageSize = pagination.pageSize
  ) {
    // 获取查询条件
    const params = form.getFieldsValue();
    const { record, ...page } = await API.query({
      ...params,
      page_num: pageNum,
      page_size: pageSize,
    });
    setList(record);
    reset();
    setPagination({
      pageNum: page.current,
      pageSize: page.pageSize,
      total: page.total,
    });
  }

  // 点击新增
  function onAddNew() {
    history.push(`/f/sys/user/add`);
    dropPage();
  }

  function onDel(id: number) {
    Modal.confirm({
      title: "二次确认",
      content: "确认要删除吗？",
      onOk() {
        API.deleteUserById({ id }).then((res) => {
          res.data.code === 200 && getData(1);
        });
      },
    });
  }

  function onEdit(id: number) {
    history.push(`/f/sys/user/edit/${id}`);
  }

  function onEnabledChange(id: number, enabled: boolean) {
    API.enabledUser({
      id: id,
      enabled: enabled ? 1 : 0,
    }).then((res) => {
      if (res.data.code === 200) {
        message.success("修改成功");
        getData(1);
      } else {
        message.error(res.data.msg);
      }
    });
  }

  const columns: any[] = useMemo(() => {
    return getColumns({
      onDel,
      onEdit,
      onEnabledChange,
    });
  }, []);

  return (
    <Page>
      {/* 标题 */}
      <Typography.Title level={5}>列表页</Typography.Title>
      {/* 数据过滤 */}
      <Card style={{ marginBottom: "16px" }}>
        {/* 复杂查询框可以拆分文件 */}
        <SearchForm form={form} onSubmit={() => getData()} />
      </Card>
      <div className={full ? "full-page" : ""}>
        {/* 数据列表 */}
        <Card>
          <div className="f-r j-between">
            <Typography.Title level={5}>数据列表</Typography.Title>
            {/* 按钮组 */}
            <div>
              <Space>
                <Button>导出</Button>
                <Button type="primary" onClick={onAddNew}>
                  新建数据
                </Button>
              </Space>
              <Divider type="vertical" />
              <Space>
                <Button type="link" onClick={() => setFull(!full)}>
                  <ExpandOutlined />
                </Button>
              </Space>
            </div>
          </div>
        </Card>
        {/* table */}
        <Table
          rowKey="id"
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={list}
          pagination={false}
          rowSelection={selectionProps}
        />
        <div style={{ height: "57px" }}></div>
      </div>

      {/* 批量操作 */}
      <Card className="rvt-page-bottom">
        <div className="f-r j-between" style={{ width: "100%" }}>
          {showDetail}
          <Space>
            <Button danger>批量删除</Button>
            <Button>批量导出</Button>
            <Pagination {...paginationProps} />
          </Space>
        </div>
      </Card>
    </Page>
  );
}

// 传入上下文，获取表头配置
function getColumns(ctx: any): TableColumnType<DTOs.User.UserDTO>[] {
  return [
    { title: "用户名", width: 120, dataIndex: "uname" },
    { title: "用户姓名", width: 240, dataIndex: "nickname" },
    { title: "性别", width: 120, dataIndex: "sex", render: Formatter.sex },
    { title: "手机号", width: 180, dataIndex: "mobile" },
    { title: "邮箱", width: 300, dataIndex: "email" },
    {
      title: "启用状态",
      width: 120,
      dataIndex: "enabled",
      render: Formatter.enabled,
    },
    { title: "创建时间", width: 300, dataIndex: "createdAt" },
    { title: "创建人ID", width: 300, dataIndex: "createdBy" },
    { title: "修改时间", width: 300, dataIndex: "updatedAt" },
    { title: "修改人ID", width: 300, dataIndex: "updatedBy" },
    {
      title: "操作",
      width: 180,
      fixed: "right",
      render(text, record, index) {
        return (
          <Space>
            <a onClick={() => ctx.onEdit(record.id)}>编辑</a>
            <a onClick={() => ctx.onEnabledChange(record.id, !record.enabled)}>
              {record.enabled ? "禁用" : "启用"}
            </a>
            <a onClick={() => ctx.onDel(record.id)}>删除</a>
          </Space>
        );
      },
    },
  ];
}
