import { message } from 'antd';


export const errorNotify = (text) => {
  message.error(text);
};

export const successNotify = (text) => {
  message.success(text);
};
