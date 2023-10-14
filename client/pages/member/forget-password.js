import React from 'react'

export default function Forgetpassword() {
  return (
    <>
        <h5 style ={{color: '#ff6600'}}>訊息：</h5>
        <label>
        Email:
            <input
            type="text"
            />
          </label>
          <br/>
          <button>取得驗證碼</button>
            <br/>
            <label>
                電子郵件驗證碼:
                <input
                    type="text"
                />
            </label>
            <br/>
            <label>
                新密碼：
                <input
                    type='text'
                />
            </label>
            <br/>
            <button>重新設定密碼</button>
    </>
  )
}
