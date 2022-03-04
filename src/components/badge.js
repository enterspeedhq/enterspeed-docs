import React from 'react';

export const Badge = ({children, type}) => (
    <span
      style={{
        backgroundColor: type === 'required' ? '#FED7D7' : '#dbe6fe',
        borderRadius: '4px',
        color: type === 'required' ? '#63171B' : '#043cc7',
        fontSize: "70%",
        fontWeight: "300",
        padding: '4px 8px',
        textTransform: 'uppercase',
        fontSize: 'max(14px)',
      }}>
      {type === 'required' ? 'Required' : children}
    </span>
  );