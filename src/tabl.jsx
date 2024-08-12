import React, { useState, useEffect, useRef } from 'react';
import { Table, Space, Button, Modal, notification } from 'antd';
import { getData } from './api';

const playNotificationSound = () => {
  const audio = new Audio('src/Audio/2886.mp3');
  audio.play();
};

// Функция для показа уведомления
const showNotification = (message, description) => {
  notification.info({
    message: message,
    description: description,
    placement: 'topRight',
  });
};

// Определение колонок таблицы
const columns = (showDetails) => [
  {
    title: 'invest token',
    dataIndex: 'invest_token',
    key: 'invest_token',
    render: (invest_token, record) => (
      <p>
        {invest_token.symbol}, {record.invest_amount_in_token}
      </p>
    ),
  },
  {
    title: 'chain',
    dataIndex: 'logs',
    key: 'chain',
    render: (logs) => (
      <p>
        {logs.map((log, index) => (
          log.chain ? (
            <span key={index}>
              {log.chain.name}<br/>
            </span>
          ) : null
        ))}
      </p>
    ),
  },
  {
    title: 'Invest USD',
    dataIndex: 'invest_amount',
    key: 'Invest'
  },
  {
    title: 'fork',
    dataIndex: 'logs',
    key: 'logs',
    render: (logs) => {
      if (!logs || logs.length === 0) {
        return <p>No logs available</p>;
      }

      const lastElement = logs.at(-1);

      return (
        <p>
          🟢 Buy {logs[0].action === "Buy" ? logs[0].token_out.symbol : logs[0].token_in.symbol} on {logs[0].platform}<br/>
          🔴 Sell {lastElement.action === "Buy" ? lastElement.token_out.symbol : lastElement.token_in.symbol} on {lastElement.platform}<br/>
        </p>
      );
    }
  },
  {
    title: 'Path',
    dataIndex: 'logs',
    key: 'Name',
    render: (logs) => (
      <p>
        {logs.map((log) => (
          <span key={log.uuid}>
            {log.token_in.symbol}<br/>
            {log.token_out.symbol}<br/>
          </span>
        ))}
      </p>
    ),
  },
  {
    title: 'Profit',
    dataIndex: 'profit',
    key: 'profit',
    sorter: (a, b) => b.profit - a.profit,
    render: (profit) => (
      <span style={{ color: profit < 0 ? 'red' : 'green' }}>
        {profit}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={() => showDetails(record)}>Details</Button>
      </Space>
    ),
  },
];

const AppTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isUpdating, setIsUpdating] = useState(true);
  const intervalRef = useRef(null);
  const notifiedRecords = useRef(new Set());

  const fetchData = async () => {
    try {
      const result = await getData();
      console.log('Fetched data:', result);

      result.forEach(record => {
        const isProfitable = record.profit > 0;
        const isAlreadyNotified = notifiedRecords.current.has(record.uuid);

        if (isProfitable && !isAlreadyNotified) {
          // showNotification('Profit Alert', `Profit for record ${record.uuid} is greater than zero.`);
          playNotificationSound();
          notifiedRecords.current.add(record.uuid);
        } else if (!isProfitable && isAlreadyNotified) {
          // Удалить из списка уведомлений, если профит стал отрицательным или нулевым
          notifiedRecords.current.delete(record.uuid);
        }
      });

      setData(result);
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUpdating) {
      fetchData();
      intervalRef.current = setInterval(fetchData, 1000);

      return () => clearInterval(intervalRef.current);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isUpdating]);

  const showDetails = (record) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRecord(null);
  };

  const toggleUpdating = () => {
    setIsUpdating(prev => !prev);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Button onClick={toggleUpdating} style={{ marginBottom: '10px' }}>
        {isUpdating ? 'Stop Updates' : 'Start Updates'}
      </Button>
      <Table style={appStyle} columns={columns(showDetails)} dataSource={data} rowKey="uuid" />
      <Modal
        title="Token Details"
        open={modalOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
      >
        {selectedRecord && (
          <>
            <div>
              <p><strong>uuid</strong> {selectedRecord.uuid}</p>
              <p><strong>Invest Amount:</strong> {selectedRecord.invest_amount}</p>
              <p><strong>Invest Token Name:</strong> {selectedRecord.invest_token.name}</p>
              <p><strong>Invest Token Symbol:</strong> {selectedRecord.invest_token.symbol}</p>
              <p><strong>Invest Token Address:</strong> {selectedRecord.invest_token.address}</p>
              <p><strong>Logs:</strong></p>
              <ul>
                {selectedRecord.logs.map((log, index) => (
                  <div key={index}>
                    <li>{log.platform}</li>
                    <li>{log.amount_in} {log.token_in.symbol}</li>
                    <li>{log.amount_out} {log.token_out.symbol}</li>
                    ---------------------------------
                  </div>
                ))}
              </ul>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

const appStyle = {
  padding: '40px'
}

export default AppTable;
