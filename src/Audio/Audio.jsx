import { notification } from 'antd';


const playNotificationSound = () => {
  const audio = new Audio('/sounds/notification.mp3');
  audio.play();
};


const openNotificationWithSound = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    placement: 'topRight',
    onClick: () => {
      playNotificationSound(); 
    },
  });
  playNotificationSound(); 
};
