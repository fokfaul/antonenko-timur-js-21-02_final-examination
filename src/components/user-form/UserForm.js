import './UserForm.css';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import {defaultAvatar} from '../../constants/api/common';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const validateMessages = {
  required: '${label} is required!',
  types: {
    name: '${label} is not a valid name!',
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
    string: {
      len: "'${label}' must be exactly ${len} characters",
      min: "'${label}' must be at least ${min} characters",
      max: "'${label}' cannot be longer than ${max} characters",
      range: "'${label}' must be between ${min} and ${max} characters",
    },
  pattern: {
      mismatch: "поле неверно заполнено",
  }
};

export const UserForm = ({callback, mini, user}) => {
  const { t } = useTranslation();
  const submitName = mini? t("user.save") : t("user.reg");
  const layout = {
    labelCol: { span: mini? 9 : 5 },
    wrapperCol: { span: mini? 12 : 15 },
  };
  const initialValues = user? {
    name: user.firstName || "",
    prefix: user.title || "",
    addName: user.lastName || "",
    gender: user.gender || "",
    email: user.email || "",
    birth: user.dateOfBirth ? moment(user.dateOfBirth) : "",
    phone: user.phone || "",
  } : {};
  const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 80 }}>
          <Option value=""> </Option>
          <Option value="mr">{t("user.title.mr")}.</Option>
          <Option value="ms">{t("user.title.ms")}.</Option>
          <Option value="mrs">{t("user.title.mrs")}.</Option>
          <Option value="miss">{t("user.title.miss")}.</Option>
          <Option value="dr">{t("user.title.dr")}.</Option>
        </Select>
      </Form.Item>
  );
  const onFinish = (form) => {
    const [firstName, lastName] = mini? [form.name, form.addName] : form.name.split(" ");
    const prefix = mini? user? user.prefix : "" : form.prefix;
    if((new Date(form.birth)) > new Date())
        alert("Упс, вы ещё не родились");
    else
    {
        const date = form.birth? (new Date(form.birth)).toISOString() : "";
        callback({
            title: prefix,
            firstName: firstName,
            lastName: lastName,
            gender: form.gender,
            email: form.email,
            dateOfBirth: date,
            phone: form.phone,
            picture: defaultAvatar,
        });
    }
  };

  return (
    <Form {...layout}
        name="user-info-form"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={initialValues}
    >
      <Form.Item name='name' label={mini? t("user.name") : t("user.name")+" "+t("user.surname")} rules={[{
        required: true ,
        pattern: mini? "^[A-Za-zА-Яа-я]{2,50}$" : "^[A-Za-zА-Яа-я]{2,50} [A-Za-zА-Яа-я]{2,50}$"}
      ]}>
        <Input addonBefore={prefixSelector} />
      </Form.Item>
      {mini?
          <Form.Item name='addName' label={t("user.surname")} rules={[{
            required: true ,
            pattern: "^[A-Za-zА-Яа-я]{2,50}$"}
          ]}>
            <Input/>
          </Form.Item>
      : ""}
      <Form.Item name='email' label={t("user.email")} rules={[{ type: 'email', required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='gender' label={t("user.gender")}>
        <Select style={{ width: 90 }}>
          <Select.Option value=""> </Select.Option>
          <Select.Option value="female">{t("userForm.gender.female")}</Select.Option>
          <Select.Option value="male">{t("userForm.gender.male")}</Select.Option>
          <Select.Option value="other">{t("userForm.gender.other")}</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name='birth' label={t("user.birth")}>
        <DatePicker />
      </Form.Item>
      <Form.Item name='phone' label={t("user.phone")} rules={[{
         pattern: "^[+]?[0-9]{6,12}$"}
      ]}>
        <Input />
      </Form.Item>
      <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit">
          {submitName}
        </Button>
      </Form.Item>
    </Form>
  );
};
