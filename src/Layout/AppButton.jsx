// import React, { useState } from 'react';
// import { PoweroffOutlined } from '@ant-design/icons';
// import { Button, Flex } from 'antd';
// const App = () => {
//   const [loadings, setLoadings] = useState([]);
//   const enterLoading = (index) => {
//     setLoadings((prevLoadings) => {
//       const newLoadings = [...prevLoadings];
//       newLoadings[index] = true;
//       return newLoadings;
//     });
//     setTimeout(() => {
//       setLoadings((prevLoadings) => {
//         const newLoadings = [...prevLoadings];
//         newLoadings[index] = false;
//         return newLoadings;
//       });
//     }, 6000);
//   };
//   return (
//     <Flex gap="small" vertical>
//       <Flex gap="small" align="center" wrap>
//         <Button type="primary" loading>
//           Loading
//         </Button>
//         <Button type="primary" size="small" loading>
//           Loading
//         </Button>
//         <Button type="primary" icon={<PoweroffOutlined />} loading />
//       </Flex>
//       <Flex gap="small" wrap>
//         <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
//           Click me!
//         </Button>
//         <Button
//           type="primary"
//           icon={<PoweroffOutlined />}
//           loading={loadings[1]}
//           onClick={() => enterLoading(1)}
//         >
//           Click me!
//         </Button>
//         <Button
//           type="primary"
//           icon={<PoweroffOutlined />}
//           loading={loadings[2]}
//           onClick={() => enterLoading(2)}
//         />
//       </Flex>
//     </Flex>
//   );
// };
// export default App;