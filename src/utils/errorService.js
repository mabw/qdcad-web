import { Message } from "element-ui";

export const showErrorMessage = error => {
  Message.error({
    dangerouslyUseHTMLString: true,
    message: `
    <p style="line-height: 1.5">
        信息：${error.message}<br />
        代码：${error.code}<br />
        类型: ${error.type}
    </p>`
  });
};
