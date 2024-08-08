

import { Layout } from 'antd';
import AppHeader from './Layout/AppHeader'
import AppContent from './Layout/AppContent'
import AppTable from './tabl';

function App() {
  

  return (
    <>
    
     <Layout style={layoutStyle}>
       <AppHeader></AppHeader>
       <AppContent>
        <AppTable></AppTable>
         
       </AppContent>
     </Layout>
           
    </>
  )
}
const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
};
export default App
