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
} from "antd";
import SearchForm from "./SearchForm";
import { usePagination, useRowSelection } from "@/utils/hooks/common";
import { ExpandOutlined } from "@ant-design/icons";
import { Params, DTO } from "@/services/system/type.d";

export default function () {
  // 表单
  const [form] = Form.useForm();
  const [full, setFull] = useState(false);
  // 表格数据 请按照类型替换 unknown ！
  const [list, setList] = useState<DTO.User[]>([]);
  // 分页器
  const [pagination, setPagination, paginationProps] = usePagination();
  // 选择器
  const { selectionProps, showDetail, reset } = useRowSelection();

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
    const { list, ...page } = await Promise.resolve({
      // 请求接口
      list: [],
      pageNumber: 1,
      pageSize: 10,
      total: 200,
    });
    setList(list);
    reset();
    setPagination({
      pageNum: page.pageNumber,
      pageSize: page.pageSize,
      total: page.total,
    });
  }

  // 点击新增
  function onAddNew() {
    console.log("addnew")
  }

  const columns: any[] = useMemo(() => {
    return getColumns({});
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
                <Button type="primary" onClick={onAddNew}>新建数据</Button>
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
          dataSource={[]}
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
function getColumns(ctx: any): TableColumnType<DTO.User>[] {
  return [
    { title: "Id", width: 120, dataIndex: "id" },
    { title: "用户名", width: 120, dataIndex: "uname" },
    { title: "昵称", width: 120, dataIndex: "nickname" },
    { title: "性别", width: 120, dataIndex: "sex" },
    { title: "手机号", width: 120, dataIndex: "mobile" },
    { title: "邮箱", width: 120, dataIndex: "email" },
    { title: "启用状态", width: 120, dataIndex: "enabled" },
    { title: "创建时间", width: 120, dataIndex: "createdAt" },
    { title: "创建人", width: 120, dataIndex: "createdAt" },
    { title: "修改时间", width: 120, dataIndex: "updatedBy" },
    { title: "修改人", width: 120, dataIndex: "updatedAt" },
  ];
}