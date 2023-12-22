
import React, { useState } from 'react';
import JQDocs from './Documentation';
import JqEditor from './JQ'

const App = () => {
  const [openModal, setOpenModal] = useState(true);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
    {openModal ? (
      <JQDocs closeModal={closeModal} />
    ) : (
      <JqEditor />
    )}
  </div>
    
  );
};

export default App;
