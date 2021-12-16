import React from 'react';

export const Badge = ({children, type}) => (
    <span
      style={{
        backgroundColor: type === 'required' ? 'rgba(255,85,85,0.2)' : 'rgba(11, 15, 137, 0.2)',
        borderRadius: '4px',
        color: type === 'required' ? '#f55' : '#0b0f89',
        fontSize: "70%",
        fontFamily: "Barlow, sans-serif",
        fontWeight: "300",
        padding: '4px 8px',
        textTransform: 'uppercase',
        fontSize: 'max(14px)',
      }}>
      {type === 'required' ? 'Required' : children}
    </span>
  );