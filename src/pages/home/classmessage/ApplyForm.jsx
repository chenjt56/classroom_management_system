import React from 'react'
import { Form, Input, Cascader } from 'antd';

const { Item } = Form;
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}

class ApplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classroomName: props.classroomName,
      options: props.options
    }
  }
  render() {
    return (
      <Form
        form={this.props.form}
        {...layout}
        initialValues={{classroom: this.state.classroomName}}
      >
        <Item label="姓名" name="username"
          rules={[
            {
              required: true,
              message: '请输入姓名',
            }
          ]}
        >
          <Input />
        </Item>
        <Item label="学号" name="studentid"
          rules={[
            {
              required: true,
              message: '请输入学号',
            }
          ]}
        >
          <Input />
        </Item>
        <Item label="教室" name="classroom" >
          <Input disabled={true} />
        </Item>
        <Item label="时间" name="time"
          rules={[
            {
              required: true,
              message: '请选择时间',
            }
          ]}
        >
          <Cascader options={this.state.options} placeholder="" expandTrigger="hover" />
        </Item>
        <Item label="申请原因" name="reason"
          rules={[
            {
              required: true,
              message: '请输入申请原因',
            }
          ]}
        >
          <TextArea autoSize maxLength={500} allowClear />
        </Item>
      </Form>
    )
  }
}

export default ApplyForm;
