import React, { useState } from 'react';

export default function RoleSelection() {
  const [activeButton, setActiveButton] = useState('mission');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <div className="btn-group role-selection" role="group">
        <button
          type="button"
          className={`btn ${activeButton === 'mission' ? 'active' : ''} border-0 size-6`}
          onClick={() => handleButtonClick('mission')}
        >
          找任務
          {activeButton === 'mission' && <span className="underline"></span>}
        </button>
        <button
          type="button"
          className={`btn ${activeButton === 'helper' ? 'active' : ''} border-0 size-6`}
          onClick={() => handleButtonClick('helper')}
        >
          找幫手
          {activeButton === 'helper' && <span className="underline"></span>}
        </button>
      </div>
    </>
  );
}
