import React, { useState } from 'react';

  
interface JQDocsProps {
    closeModal: () => void;
  }

const JQDocs: React.FC<JQDocsProps> = ({ closeModal }) => {
   const sampleJson = `[ 
    { "name": "Sammy", "type": "shark", "clams": 5 }, 
    { "name": "Bubbles", "type": "orca", "clams": 3 }, 
    { "name": "Splish", "type": "dolphin", "clams": 2 },  
    { "name": "Splash", "type": "dolphin", "clams": 2 } 
]`;

   // jq examples
   const jqExamples = [
     { title: 'Step 1 — Executing Your First jq Command', filter: '.', output: `[
        {
          "name": "Sammy",
          "type": "shark",
          "clams": 5
        },
        {
          "name": "Bubbles",
          "type": "orca",
          "clams": 3
        },
        {
          "name": "Splish",
          "type": "dolphin",
          "clams": 2
        },
        {
          "name": "Splash",
          "type": "dolphin",
          "clams": 2
        }
    ]` },
     { title: 'Step 2 — Retrieving the list of all sea creatures names', filter:  '.[] | .name', output: `"Sammy"
     "Bubbles"
     "Splish"
     "Splash"` },
     { title: 'Step 3 — Computing the totalClams Value with map and add', filter: '[.[] | .clams]', output: `[
        5,
        3,
        2,
        2
      ]`},
     { title: 'Step 4 — Computing the totalDolphinClams Value with the add Filter', filter:  '[.[] | .clams]' , output: '{"people": [{"name": "Alice", "age": 25}, {"name": "Bob", "age": 30}]}' },
     { title: 'Step 5 — Transforming Data to a New Data Structure', filter: '.people[] | "Name: \(.name), Age: \(.age)"', json: '{"people": [{"name": "Alice", "age": 25}, {"name": "Bob", "age": 30}]}' },

   ];
  
 
   return (
     <div className={`fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-5`}>
       <div className="max-h-full w-full overflow-y-auto sm:rounded-2xl bg-white">
         <div className="w-full">
           <div className="my-10 max-w-[1000px] mx-auto">
             <div className="mb-4">
               <h1 className="mb-2 font-extrabold">How To Transform JSON Data with jq</h1>
               <p className="text-gray-600">jq is a lightweight and flexible JSON processor. Use it to manipulate and transform JSON data.</p>
               <pre className="bg-gray-100 p-2 rounded">
                   <code className="text-xs">{sampleJson}</code>
                 </pre>
               <p className="text-gray-600">You’ll work with this data for the rest of the tutorial.</p>
               <p className="text-gray-600">Let's start!</p>

             </div>
 
             {/* jq Examples */}
             {jqExamples.map((example, index) => (
               <div key={index} className="mb-6">
                 <h2 className="mb-2 text-lg font-semibold">{example.title}</h2>
                 <pre className="bg-gray-100 p-2 rounded">
                   <code className="text-xs">'{example.filter}'</code>
                 </pre>
                 <section className="grid mt-2">
                 <label>
                    <input className="peer/showLabel absolute scale-0" type="checkbox" />
                    <span className="block max-h-14 overflow-hidden rounded-lg bg-gray-100 px-4 py-0 text-cyan-800 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                        <h3 className="flex h-14 cursor-pointer items-center font-bold">Click To See Output 😎</h3>
                        <pre className="mb-2 max-h-32 overflow-y-auto">
                        <code className="text-xs overflow-y-hidden">'{example.output}'</code>
                        </pre>
                    </span>
                    </label>
                </section>
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
