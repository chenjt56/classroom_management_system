import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
import Mock from '../../../mock/mock'

const { Column } = Table;

Mock.mock("/applyresult.json",
  [
    {
      classroom: "A101",
      reason: "开班会",
      state: "待审核",
      studentid: "17341016",
      time: ["Tues", "15:00 ~ 16:00"],
      username: "陈剑涛"
    },
    {
      classroom: "A101",
      reason: "开班会",
      state: "待审核",
      studentid: "17341016",
      time: ["Tues", "15:00 ~ 16:00"],
      username: "陈剑涛"
    }
  ]
)
class ApplyResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null
    }
  }

  componentDidMount() {
    axios.get("/applyresult.json")
      .then(response => {
        console.log(response.data);
        const dataSource = response.data;
        for(let i = 0; i < dataSource.length; i++) {
          dataSource[i]["key"] = i + "";
          dataSource[i].time = dataSource[i].time.join(" ");
        }
        this.setState({
          dataSource
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Table bordered={true} dataSource={this.state.dataSource}>
        <Column title="姓名" dataIndex="username" key="username" align="center" />
        <Column title="学号" dataIndex="studentid" key="studentid" align="center" />
        <Column title="教室" dataIndex="classroom" key="classroom" align="center" />
        <Column title="时间" dataIndex="time" key="time" align="center" />
        <Column title="申请原因" dataIndex="reason" key="reason" align="center" />
        <Column title="审核结果" dataIndex="state" key="state" align="center" />
      </Table>
    )
  }
}

export default ApplyResult;
