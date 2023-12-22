
import React, { useState } from 'react';
import JQDocs from './Documentation';
import JQEditor from './JQ'

const App = () => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const toggle: () => void = () => {
    setOpenModal(!openModal);
  };

  return (
    <div>
    {openModal ? (
      <JQDocs closeModal={closeModal} />
    ) : (
      <JQEditor closeModal={toggle} />
    )}
  </div>
    
  );
};

export default App;
