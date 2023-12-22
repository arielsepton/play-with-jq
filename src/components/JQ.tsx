import { runJQ } from '../common/helper';
import React, { useState, useEffect } from 'react';
import MonacoEditor, { MonacoEditorProps } from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'; 
import {draculaTheme}  from '../common/utils/DraculaTheme' 
import * as monacoEditor from 'monaco-editor';


monaco.editor.defineTheme('dracula-theme', draculaTheme);


interface jqProps {
  jsonCode: string;
  jqFilter: string;
  jqCode: string;
}


interface JQDocsProps {
  closeModal: () => void;
}

const JQEditor: React.FC<JQDocsProps> = ({ closeModal }) => {
  const [jqProps, setJqProps] = useState<jqProps>({ jqCode: '', jqFilter: '', jsonCode: '' });

  const [jsonCode, setJsonCode] = useState<string>('Enter JSON data...\nPress ctrl + enter for help ');
  const [jqCode, setJqCode] = useState<string>('');
  const [jqFilter, setJqFilter] = useState<string>('');

  useEffect(() => {
    setJqProps({ jsonCode, jqFilter, jqCode });
  }, [jsonCode, jqFilter, jqCode]);


  const handleJsonChange = (newValue: string) => {
    try {
      setJsonCode(newValue);
      setJqProps({
        jqCode: jqCode,
        jqFilter: jqFilter,
        jsonCode: newValue
      })

    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  const handleJqFilterChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    try {
      setJqFilter(event.target.value);
      setJqProps({
        jqCode: jqCode,
        jqFilter: jqFilter,
        jsonCode: jsonCode
      })

    } catch (error) {
      console.error('Error with filter:', error);
    }
  };

  useEffect(() => {
    runJQQuery();
  }, [jqProps]);

  const runJQQuery = () => {
    if (jqProps.jqFilter && jqProps.jqFilter.trim() !== '.') {
      try {
        const result = runJQ(jqProps.jqFilter, jqProps.jsonCode);
        setJqCode(result);
      } catch (err) {
        setJqCode(err.message);
      }
    } else {
      setJqCode(''); 
    }
  
    console.log('jqProps changed:', jqProps);
  };

  const editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
    // editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, (e: monacoEditor.IKeyboardEvent) => {
    //     onRunJQ();
    // });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, closeModal);
  };

  return (
    <div className='flex flex-col w-screen'>
      <div className='h-24 w-screen'>
      <textarea
        className="bg-gray-900 text-white p-2 text-base w-full h-full"
        value={jqFilter}
        onChange={handleJqFilterChange}
        placeholder="Enter JQ filter..."
      />
      </div>
      <div className="flex-auto">
        <div className="flex flex-row w-screen h-screen">
          <div className="flex-1 w-1/2 h-full">
            <div></div>
            <MonacoEditor
              width="100%"
              height="100%"
              language="json"
              theme="dracula-theme"
              value={jsonCode}
              editorDidMount={editorDidMount}
              options={{ 
                selectOnLineNumbers: true,
                automaticLayout: true,
                scrollbar: {
                  vertical: 'hidden',
                  horizontal: 'hidden',
                },
               }}
              onChange={handleJsonChange}
            />
          </div>
          <div className="flex-1 w-1/2 h-full overflow-hidden">
            <MonacoEditor
              width="100%"
              height="100%"
              language="plaintext"
              theme="dracula-theme"
              value={jqCode}
              options={{ 
                selectOnLineNumbers: true,
                automaticLayout: true,
                scrollbar: {
                  vertical: 'hidden',
                  horizontal: 'hidden',
                },
               }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JQEditor;
