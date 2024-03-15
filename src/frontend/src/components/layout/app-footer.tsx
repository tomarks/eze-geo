import React from 'react';

export const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const version = '1.0.0'; // Replace with your actual version

  return (
    <footer
      style={{
        height: '16px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: '12px', margin: '0' }}>
        &copy; {currentYear} EzeGeo. All rights reserved. | Version {version}
      </p>
    </footer>
  );
};
