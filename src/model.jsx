// import React, { useState, useEffect } from 'react';
// import { Modal, Input, Button } from 'antd';

// const AppModal = () => {
//   const [modalOpen, setModalOpen] = useState(true);
//   const [inputData, setInputData] = useState('');
//   const [savedData, setSavedData] = useState('');

//   const handleInputChange = (e) => {
//     setInputData(e.target.value);
//   };

//   const handleModalClose = () => {
//     setSavedData(inputData);
//     setModalOpen(false);
//   };

  
//   useEffect(() => {
//     setModalOpen(true);
//   }, []);

//   return (
//     <div>
//       <Modal
//         title="Enter your data"
//         open={modalOpen}
//         onOk={handleModalClose}
//         onCancel={handleModalClose}
//       >
//         <Input 
//           value={inputData} 
//           onChange={handleInputChange} 
//           placeholder="Enter your data here" 
//         />
//       </Modal>

      
//     </div>
//   );
// };

// export default AppModal;
