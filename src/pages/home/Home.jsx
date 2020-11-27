import { Layout } from 'antd';
import MyHeader from './MyHeader';
import MyContent from './MyContent';
import { useHistory } from 'react-router-dom';
import './home.css'

export const Home = () => {
  const history = useHistory();
  return (
    <Layout>
      <MyHeader history={history}/>
      <Layout>
        <MyContent />
      </Layout>
    </Layout>
  )
}