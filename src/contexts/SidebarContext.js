import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, handleClose, handleOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
