import React, { useState } from 'react';
import DocComponent from './DocComponent'; // Adjust the import path based on your project structure

const MyDocumentation: React.FC = () => {
  const [isDocumentationVisible, setDocumentationVisible] = useState(false);

  const toggleDocumentation = () => {
    setDocumentationVisible(!isDocumentationVisible);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={toggleDocumentation}
        >
          {isDocumentationVisible ? 'Hide Docs' : 'Show Docs'}
        </button>
        {isDocumentationVisible && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setDocumentationVisible(false)}
          >
            Close
          </button>
        )}
      </div>

      {isDocumentationVisible && (
        <div>
          <h1 className="text-4xl font-bold mb-8">My Documentation</h1>

          <DocComponent title="Introduction" description="Get started with MyDocumentation.">
            <p>
              MyDocumentation is a simple and customizable documentation component for your React
              applications. It's designed to provide an easy way to create beautiful documentation
              pages.
            </p>
          </DocComponent>

          {/* Add more DocComponent instances for other sections of your documentation */}
        </div>
      )}
    </div>
  );
};

export default MyDocumentation;
