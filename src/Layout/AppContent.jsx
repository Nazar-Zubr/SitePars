import { Layout } from 'antd';
const { Content } = Layout; 
import AppTable from '../tabl';

export default  function AppContent({children}){
         return(
            <Content style={contentStyle}>
              {children}
            </Content>
         )
}


const contentStyle = {
    paddingTop: '20px',
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#B0C4DE',
};