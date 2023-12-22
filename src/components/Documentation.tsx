import React, { useState } from 'react';

  
interface JQDocsProps {
    closeModal: () => void;
  }

const JQDocs: React.FC<JQDocsProps> = ({ closeModal }) => {
   // Sample JSON data for jq examples
   const sampleJson = '{"name": "John", "age": 30, "city": "New York"}';

   // jq examples
   const jqExamples = [
     { title: 'Selecting Fields', filter: '.name' },
     { title: 'Filtering Arrays', filter: '.fruits[]', json: '{"fruits": ["apple", "banana", "orange"]}' },
     { title: 'Conditional Statements', filter: 'if .status == "success" then "OK" else "Error" end', json: '{"status": "success", "code": 200}' },
     { title: 'Mapping and Formatting', filter: '.people[] | "Name: \(.name), Age: \(.age)"', json: '{"people": [{"name": "Alice", "age": 25}, {"name": "Bob", "age": 30}]}' },
   ];
  
 
   return (
     <div className={`fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-5`}>
       <div className="max-h-full w-full overflow-y-auto sm:rounded-2xl bg-white">
         <div className="w-full">
           <div className="my-10 max-w-[400px] mx-auto">
             <div className="mb-4">
               <h1 className="mb-2 font-extrabold">jq Docs</h1>
               <p className="text-gray-600">jq is a lightweight and flexible JSON processor. Use it to manipulate and transform JSON data.</p>
             </div>
 
             {/* jq Examples */}
             {jqExamples.map((example, index) => (
               <div key={index} className="mb-6">
                 <h2 className="mb-2 text-lg font-semibold">{example.title}</h2>
                 <pre className="bg-gray-100 p-2 rounded">
                   <code className="text-xs">{example.json ? example.json : sampleJson} | jq '{example.filter}'</code>
                 </pre>
               </div>
             ))}
 
             {/* Close Button */}
             <div className="space-y-2">
               <button className="p-2 bg-black rounded-full text-white w-full font-semibold" onClick={closeModal}>
                 Close
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
};

export default JQDocs;
