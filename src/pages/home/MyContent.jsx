import React from 'react'
import { Layout } from 'antd';
import ClassroomMessage from './classmessage/ClassroomMessage'
import ApplyResult from './applyresult/ApplyResult'
import SiderBar from './SiderBar';

const { Content } = Layout;

class MyContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curTable: "1"
    }
  }

  clickEvent = (key) => {
    // console.log(key);
    let curTable = key;
    this.setState({
      curTable
    });
  }

  render() {
    const { curTable } = this.state;
    let contentElement = curTable === "1" ? <ClassroomMessage /> : <ApplyResult />;
    return (
      <Layout>
        <SiderBar clickEvent={this.clickEvent}/>
        <Content>
          {contentElement}
        </Content>
      </Layout>
    )
  }
}

export default MyContent;