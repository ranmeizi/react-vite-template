import { setToken } from "@/redux/actions/app";
import { login } from "@/services/auth";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Typography, message, notification } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import MyForm from "./Form";
import "./style.less";

const pics: any = {
  1: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fb1b60573aa96fd343c950acfb92b056626692759.jpg&refer=http%3A%2F%2Fi1.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653545624&t=2b48269fc26263aec4c92627b79fbfa8",
  2: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.leikeji.com%2Fresource%2Fimg%2Fd98a11cba6cb44b999a71a906b479af5.jpg&refer=http%3A%2F%2Fimg.leikeji.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653554317&t=95daa8ffd292b0a5baaf67c01cdd57b1",
  3: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190214%2Fa075a0eafdb546d7bf230debd3f54db5.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653549800&t=0a6a85845290ec3304b65752f4766b5e",
};

function fakeGet(id: string): Promise<{ url: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        url: pics[id],
      });
    }, 2000);
  });
}

/**
 * 使用客户id获取config配置
 * 后续有可能将config存入localstorage
 * 并提供一个清除localstorage的按钮
 */
export default function () {
  const history = useHistory();
  const [config, setConfig] = useState<Record<string, any> | undefined>(
    undefined
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // 获取客户配置
  async function getConfig() {
    const id = Math.ceil(Math.random() * Object.keys(pics).length);
    setConfig(await fakeGet(id + ""));
  }

  useEffect(() => {
    getConfig();
  }, []);

  const bgStyle = useMemo<React.CSSProperties>(() => {
    if (config?.url) {
      return {
        backgroundImage: `url(${config.url})`,
      };
    } else {
      return {};
    }
  }, [config]);

  function onSubmit(data: any) {
    login(data).then((res) => {
      if (res.data.code === 200) {
        // 提示登录成功
        notification.open({
          message: "登录成功",
          placement: "bottomRight",
          description: (
            <div>
              <div>管理员,欢迎您使用</div>
              <div>《React-Vite-Template》</div>
            </div>
          ),
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        // 存数据
        dispatch(setToken(res.data.data.access_token));
        // 跳转
        history.replace("/");
      } else {
        message.error(res.data.msg);
      }
    });
  }

  return (
    <div className="login">
      {/* 模糊背景 */}
      <div className="login-bg" style={bgStyle} />
      {/* 中心块 */}
      <div className="login-center">
        {/* 左边图片 */}
        <div className="login-img" style={bgStyle}>
          {/* 平台名 */}
          <div className="login-sys-name">React-Vite-Template</div>
        </div>
        {/* 右边登录框 */}
        <div className="login-form f-c a-center j-center">
          <Typography.Title level={2} style={{ marginBottom: "40px" }}>
            用户登陆
          </Typography.Title>
          {/* 用户登陆 */}
          <MyForm form={form} onSubmit={onSubmit} />
        </div>
      </div>
      {/* 写一些什么小字 */}
      <div className="login-text">
        <div>
          这一晃啊，这个系统就快开发完了。谁说不是呢。哎你说今天食堂有什么好吃的呀
        </div>
        <div>吃点哪个萝卜丝饼吧。我可不爱吃胡萝卜</div>
      </div>
    </div>
  );
}

function Loading() {
  return 1;
}
