import React from 'react';
import axios from 'axios';
import Mock from '../../../mock/mock'
import { Table } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import MyModal from './MyModal';

Mock.mock("/classroomMessage.json",
  [{
    key: "1",
    classroomName: "A101",
    Mon: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Tues: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Wed: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Thur: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Fri: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Sat: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Sun: ["8:00 ~ 10:00", "15:00 ~ 16:00"]
  },
  {
    key: "2",
    classroomName: "A102",
    Mon: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Tues: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Wed: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Thur: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Fri: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Sat: ["19:00 ~ 20:00", "15:00 ~ 16:00"],
    Sun: ["8:00 ~ 10:00", "15:00 ~ 16:00"]
  },
  {
    key: "3",
    classroomName: "A103",
    Mon: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Tues: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Wed: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Thur: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Fri: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Sat: ["8:00 ~ 10:00", "15:00 ~ 16:00"],
    Sun: ["8:00 ~ 10:00", "15:00 ~ 16:00"]
  }]
);

Mock.mock("/apply", "application form commit success!!!");

const { Column, ColumnGroup } = Table;

const options = [
  {
    value: 'Mon',
    label: '星期一',
  },
  {
    value: 'Tues',
    label: '星期二',
  },
  {
    value: 'Wed',
    label: '星期三',
  },
  {
    value: 'Thur',
    label: '星期四',
  },
  {
    value: 'Fri',
    label: '星期五',
  },
  {
    value: 'Sat',
    label: '星期六',
  },
  {
    value: 'Sun',
    label: '星期日',
  }
];

class MyIcon extends React.Component {
  clickEvent = () => {
    this.props.showModal(this.props.record);
  }

  render() {
    return (
      <FormOutlined onClick={this.clickEvent} />
    )
  }
}

class ClassroomMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      options,
      classroomName: '',
      dataSource: null
    }
  }

  componentDidMount() {
    const _this = this;
    // console.log("component did mount");
    // 为给定 ID 的 user 创建请求
    axios.get('/classroomMessage.json')
      .then(function (response) {
        console.log(response);
        let dataSource = response.data;
        for (let i = 0; i < dataSource.length; i++) {
          for (let key in dataSource[i]) {
            if (dataSource[i][key] instanceof Array) {
              dataSource[i][key] = dataSource[i][key].join("\n");
            }
          }
        }
        _this.setState({
          dataSource
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showModal = (record) => {
    let { classroomName, options, visible } = this.state;
    visible = true;
    classroomName = record.classroomName;

    for (let key in record) {
      if (key !== "key" && key !== "classroomName") {
        let freeTimes = record[key].split("\n");
        let everyDay = [];
        for (let i = 0; i < freeTimes.length; i++) {
          everyDay.push({
            value: freeTimes[i],
            label: freeTimes[i]
          })
        }
        options.find(item => item.value === key)["children"] = everyDay;
      };
    }
    this.setState({
      visible,
      classroomName,
      options
    });
  };

  handleOk = (values) => {
    console.log(values);
    values["state"] = "待审核";
    axios.post("/apply", values)
      .then(response => {
        console.log(response);
        this.setState({
          visible: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Table dataSource={this.state.dataSource} bordered={true}>
          <Column title="教室名称" dataIndex="classroomName" key="classroomName" align="center" />
          <ColumnGroup title="空闲时间" align="center">
            <Column title="星期一" dataIndex="Mon" key="Mon" align="center" />
            <Column title="星期二" dataIndex="Tues" key="Tues" align="center" />
            <Column title="星期三" dataIndex="Wed" key="Wed" align="center" />
            <Column title="星期四" dataIndex="Thur" key="Thur" align="center" />
            <Column title="星期五" dataIndex="Fri" key="Fri" align="center" />
            <Column title="星期六" dataIndex="Sat" key="Sat" align="center" />
            <Column title="星期日" dataIndex="Sun" key="Sun" align="center" />
          </ColumnGroup>
          <Column title="申请教室" dataIndex="apply" key="apply" align="center"
            render={(text, record, index) => {
              return (<MyIcon record={record} showModal={this.showModal} />);
            }}
          />
        </Table>
        <MyModal
          key={this.state.classroomName}
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          options={this.state.options}
          classroomName={this.state.classroomName}
        />
      </>
    )
  }
}

export default ClassroomMessage;
