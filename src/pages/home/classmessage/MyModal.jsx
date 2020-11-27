import React from 'react';
import { Modal, Form } from 'antd';
import AppLyForm from './ApplyForm'

const MyModal = ({ visible, handleOk, handleCancel, options, classroomName}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="申请教室"
      closable={false}
      visible={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleOk(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={handleCancel}
    >
      <AppLyForm form={form} options={options} classroomName={classroomName}/>
    </Modal>
  )
}

export default MyModal;
