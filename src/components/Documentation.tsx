import React from 'react';

  
interface JQDocsProps {
    closeModal: () => void;
  }

const JQDocs: React.FC<JQDocsProps> = ({ closeModal }) => {
   // jq examples
   const jqExamples = [
      { 
        title: 'Getting an object property', 
        json: 
`{
  "ticket_event": {
    "ticket": {
      "id": 27642,
      "subject": ["enterprise", "production"]
    }
  }
}`, 
        filter: '.ticket_event.ticket.id', 
        output: `27642` 
      },
      { 
        title: 'Getting an array element', 
        json: 
`{
  "ticket_event": {
    "ticket": {
      "follower_ids": [35334, 234, 123456]
    }
  }
}`
        , 
        filter:  '.ticket_event.ticket.follower_ids[0]', 
        output: `35334` 
      },
      { 
        title: "Getting an array element's object property", 
        json: 
`{
  "ticket_event": {
    "ticket": {
      "custom_fields": [
        {
          "id": 12345,
          "value": "745"
        },
        {
          "id": 27648,
          "value": "yes"
        }
      ]
    }
  }
}`, 
        filter: '.ticket_event.ticket.custom_fields[1].id', 
        output: `27648`
      },
      { 
        title: 'Creating an object', 
        filter:  '{ "shop_level": .shop.level, "user_id": .user.id }',
        json:
`{
  "shop": {
    "level": "platinum"
  },
  "user": {
    "id": 12345
  }
}`,
        output: 
`{
  "shop_level": "platinum",
  "user_id": 12345
}` 
      },
      { 
        title: 'Creating an array', 
        json: 
`{
  "ticket": {
    "collaborator_ids": [35334, 234],
    "submitter_id": 76872
  }
}`, 
        filter: '[ .ticket.collaborator_ids[], .ticket.submitter_id ]', 
        output: '[35334, 234, 76872]' 
      },
      { 
        title: 'Checking an array for a specific element', 
        json: 
`{
  "ticket": {
    "tags": ["enterprise", "production"]
  }
}`, 
        filter: '.ticket.tags | any(index("enterprise"))', 
        output: 'true' 
      },
      { 
        title: 'Comparing a flat array to an array of objects', 
        json: 
`{
  "ticket": {
    "follower_ids": [389861386794, 389867211733]
  },
  "users": [
    {
      "id": 7123854387,
      "name": "John Doe",
      "role": "admin"
    },
    {
      "id": 389861386794,
      "name": "Jane Roe",
      "role": "agent"
    },
    {
      "id": 389867211733,
      "name": "Mary Major",
      "role": "agent"
    }
  ]
}`, 
        filter: '[ .ticket.follower_ids as $id_list | .users[] | select( .id as $id | $id_list | index($id) )]', 
        output: 
`[
  {
    "id": 389861386794,
    "name": "Jane Roe",
    "role": "agent"
  },
  {
    "id": 389867211733,
    "name": "Mary Major",
    "role": "agent"
  }
]` 
      },
      { 
        title: 'Converting a number to a string', 
        json: 
`{
  "ticket": {
    "id": 35436
  }
}`, 
        filter: '.ticket.id | tostring', 
        output: '"35436"' 
      },
      { 
        title: 'Converting a flat array into an array of objects', 
        json: 
`{
  "ids": [1, 2, 3]
}`, 
        filter: '[ .ids[] | { "action": "delete", "id": . }]', 
        output: 
`[
  {
    "action": "delete",
    "id": 1
  },
  {
    "action": "delete",
    "id": 2
  },
  {
    "action": "delete",
    "id": 3
  }
]` 
      },
      { 
        title: 'Converting an array of objects into a flat object', 
        json: 
`{
  "ticket": {
    "custom_fields": [
      {
        "id": 4413535756049,
        "value": 123
      },
      {
        "id": 4413550635025,
        "value": 456
      },
      {
        "id": 4413558696721,
        "value": null
      },
      {
        "id": 4413643104785,
        "value": null
      }
    ]
  }
}`, 
        filter: '[ .ticket.custom_fields[] | { (.id|tostring): .value }]', 
        output: 
`{
  "4413535756049": 123,
  "4413550635025": 456,
  "4413558696721": null,
  "4413643104785": null
}` 
      },
      { 
        title: 'Encoding a string as a URI', 
        json: 
`{
  "username": "john+doe"
}`, 
        filter: '.username | @uri', 
        output: `"john%2Bdoe"` 
      },
      { 
        title: 'Extracting a pattern from a string', 
        json: 
`{
  "ticket": {
    "description": "My email address is john+doe@example.com."
  }
}`, 
        filter: '.ticket.description | match("([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9_-]+)"; "i") | .string', 
        output: '"john+doe@example.com"' 
      },
      { 
        title: 'Extracting numbers from a string', 
        json: 
`{
  "ticket": {
    "subject": "Printer 12345 is on fire!"
  }
}`, 
        filter: '.ticket.subject | match("\\d+") | .string', 
        output: '"12345"' 
      },
      { 
        title: 'Getting the current date', 
        json: `
        {}
        `,  
        filter: 'now | strftime("%Y-%m-%d")', 
        output: '"2099-05-06"' 
      },
      { 
        title: 'Getting the difference between two arrays', 
        json: 
`{
  "email_cc_ids": [1, 2, 3, 7],
  "user_ids": [1, 3, 4, 5]
}`, 
        filter: '.email_cc_ids - .user_ids', 
        output: '[2, 7]' 
      },
      { 
        title: 'Getting the intersection of two arrays', 
        json: 
`{
  "email_cc_ids": [1, 2, 3, 7],
  "user_ids": [1, 3, 4, 5]
}`, 
        filter: '.email_cc_ids - (.email_cc_ids - .user_ids)', 
        output: '[1, 3]' 
      },
      { 
        title: 'Replacing substrings in a string', 
        json: 
`{
  "email": "john+doe@example.com"
}`, 
        filter: '.email | sub("john";"richard";"i")', 
        output: '"richard+doe@example.com"' 
      },
      { 
        title: 'Replacing a missing or null property', 
        json: 
`{
  "users": [
    {
      "name": "Joseph Doe",
      "alias": "Joe"
    },
    {
      "name": "Jane Doe",
      "alias": null
    },
    {
      "name": "John Doe"
    }
  ]
}`, 
        filter: '.users[] | if (.alias) then . else . + {"alias": ""} end', 
        output: 
`{
  "name": "Joseph Doe",
  "alias": "Joe"
}
{
  "name": "Jane Doe",
  "alias": ""
}
{
  "name": "John Doe",
  "alias": ""
}` 
      }
   ];
  
 
   return (
     <div className={`fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-5`}>
       <div className="max-h-full w-full overflow-y-auto sm:rounded-2xl bg-white">
         <div className="w-full">
           <div className="my-10 max-w-[1000px] mx-auto">
             <div className="mb-4">
               <h1 className="mb-2 font-extrabold">jq cheat sheet</h1>
               <p className="text-gray-600">jq is a lightweight and flexible JSON processor. Use it to manipulate and transform JSON data.</p>
             </div>
 
             {jqExamples.map((example, index) => (
               <div key={index} className="mb-6">
                 <h2 className="mb-2 text-lg font-semibold">{example.title}</h2>
                 <h4 className="mb-2 font-semibold">jq expression:</h4>
                 <pre className="bg-gray-100 p-2 rounded mb-2">
                  <code className="text-xs">{example.filter}</code>
                 </pre>
                 <h4 className="mb-2 font-semibold">Input:</h4>
                 <pre className="bg-gray-100 p-2 rounded mb-2">
                  <code className="text-xs">{example.json}</code>
                 </pre>
                 <h4 className="mb-2 font-semibold">Result:</h4>
                 <pre className="bg-gray-100 p-2 rounded mb-2">
                  <code className="text-xs">{example.output}</code>
                 </pre>
               </div>
             ))}
 
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
