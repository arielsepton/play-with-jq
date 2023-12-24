import { runJQ } from '../common/helper';
import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'; 
import {draculaTheme}  from '../common/utils/DraculaTheme' 
import * as monacoEditor from 'monaco-editor';

monaco.editor.defineTheme('dracula-theme', draculaTheme);


interface JQDocsProps {
  toggleModal: () => void;
}

const JQEditor: React.FC<JQDocsProps> = ({ toggleModal }) => {

  const [jsonCode, setJsonCode] = useState<string>(`
{
  "help": "Press ctrl + enter",
  "switch_theme": "Press Alt + t" 
}
  `);
  const [jqCode, setJqCode] = useState<string>('');
  const [jqFilter, setJqFilter] = useState<string>('.help');

  const handleJsonChange = (newValue: string) => {
    try {
      setJsonCode(newValue);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  const handleJqFilterChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    try {
      setJqFilter(event.target.value);

    } catch (error) {
      console.error('Error with filter:', error);
    }
  };

  const runJQQuery = () => {
    console.log('jqProps changed:', {
      jqCode: jqCode,
      jqFilter: jqFilter,
      jsonCode: jsonCode
    });

    runJQ(jqFilter, jsonCode).then((result) => {
      console.log("result: " + result);
      setJqCode(result);
    });
  };
  
  useEffect(runJQQuery, [jqCode, jqFilter, jsonCode]);

  const availableThemes = [
    {'name': 'dracula-theme', bg: 'bg-[#282a36]', text: '#ffffff'},
    {'name': 'vs', bg: 'bg-[#ffffff]', text: '#000000'}, 
    {'name': 'vs-dark', bg: 'bg-[#1e1e1e]', text: '#ffffff'}, 
    {'name': 'hc-black',  bg: 'bg-[#000000]', text: '#ffffff'}, 
    {'name': 'hc-light',  bg: 'bg-[#ffffff]', text: '#000000'}
  ];
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);


  const editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, toggleModal);
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.KeyT, () => {
      setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % availableThemes.length);
    });  };

    const currentTheme = availableThemes[currentThemeIndex];


  return (
    <div className='flex flex-col w-screen h-screen'>
      <div className='h-24 w-screen flex-none'>
      <textarea
        className={`resize-none p-2 text-base w-full h-full ${currentTheme.bg}`}
        value={jqFilter}
        onChange={handleJqFilterChange}
        placeholder="Enter JQ filter..." 
        style={{ color: `${currentTheme.text}`, fontFamily: "'Consolas', 'Courier New', 'monospace'"}}
      />
      </div>
      <div className="grow">
        <div className="flex flex-row w-screen h-full">
          <div className="flex-1 w-1/2 h-full">
            <div></div>
            <MonacoEditor
              width="100%"
              height="100%"
              language="json"
              theme={currentTheme.name}
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
              theme={currentTheme.name}
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
