import { Layout } from 'antd';
const { Header } = Layout; 

export default function AppHeader(){
    return(
        <Header style={headerStyle}></Header>
    )
       
}
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 20,
    paddingInline: 48,
    lineHeight: '60px',
    backgroundColor: '#B0C4DE',
};
