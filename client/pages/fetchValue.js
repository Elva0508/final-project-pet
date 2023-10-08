import { useEffect, useState } from 'react';

function FetchValue() {
  const [localStorageValue, setLocalStorageValue] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  useEffect(() => {
    // 从LocalStorage中获取值
    const valueFromLocalStorage = localStorage.getItem('email');
    setLocalStorageValue(valueFromLocalStorage || '');

    // 发送HTTP请求到Node.js服务器
    fetch('http://localhost:3005', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: valueFromLocalStorage }),
    })
      .then((response) => response.json())
      .then((data) => {
        setServerResponse(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <p>LocalStorage中的值：{localStorageValue}</p>
      <p>从服务器收到的响应：{serverResponse}</p>
    </div>
  );
}

export default FetchValue;