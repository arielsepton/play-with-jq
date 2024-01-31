import { runJQ } from '../common/helper';
import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { draculaTheme } from '../common/utils/DraculaTheme';
import * as monacoEditor from 'monaco-editor';
import Editor from './Editor';
import useJQ from '../common/useJQ';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './Resizable';

monaco.editor.defineTheme('dracula-theme', draculaTheme);

interface JQDocsProps {
  toggleModal: () => void;
}

const JQEditor: React.FC<JQDocsProps> = ({ toggleModal }) => {
  const [jsonCode, setJsonCode] = useState<string>(
    JSON.stringify(
      JSON.parse(
        `{ "beautify": "Press Alt + b", "help": "Press ctrl + enter", "switch_theme": "Press Alt + t" }`,
      ),
      null,
      2,
    ),
  );
  const [jqCode, setJqCode] = useState<string>();
  const [jqFilter, setJqFilter] = useState<string>('.help');

  const { result, error, loading } = useJQ(jqFilter, jsonCode);

  useEffect(() => {
    if (result !== null) {
      setJqCode(result);
    }
  }, [result]);

  const availableThemes = [
    { name: 'dracula-theme', bg: 'bg-[#282a36]', text: '#ffffff' },
    { name: 'vs', bg: 'bg-[#ffffff]', text: '#000000' },
    { name: 'vs-dark', bg: 'bg-[#1e1e1e]', text: '#ffffff' },
    { name: 'hc-black', bg: 'bg-[#000000]', text: '#ffffff' },
    { name: 'hc-light', bg: 'bg-[#ffffff]', text: '#000000' },
  ];
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const editorWillMount = (monaco: any) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: 'http://myserver/foo-schema.json',
          schema: {
            type: 'object',
            properties: {
              p1: {
                enum: ['v1', 'v2'],
              },
              p2: {
                $ref: 'http://myserver/bar-schema.json',
              },
            },
          },
        },
        {
          uri: 'http://myserver/bar-schema.json',
          schema: {
            type: 'object',
            properties: {
              q1: {
                enum: ['x1', 'x2'],
              },
            },
          },
        },
      ],
    });
  };

  const editorDidMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor,
    monaco: typeof monacoEditor,
  ) => {
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      toggleModal,
    );
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.KeyT, () => {
      switchTheme();
    });
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.KeyB, () => {
      const obj = JSON.parse(jsonCode);
      setJsonCode(JSON.stringify(obj, null, 2));
    });
  };

  const switchTheme = () => {
    setCurrentThemeIndex(
      (prevIndex) => (prevIndex + 1) % availableThemes.length,
    );
  };

  const currentTheme = availableThemes[currentThemeIndex];
  return (
    <div className={`w-screen h-screen ${currentTheme.bg}`}>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={20}>
          <textarea
            className={`p-2 text-base w-full h-full ${currentTheme.bg} resize-none w-screen flex-none`}
            value={jqFilter}
            onChange={(event: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setJqFilter(event.target.value);
            }}
            placeholder="Enter JQ filter..."
            style={{
              color: `${currentTheme.text}`,
              fontFamily: "'Consolas', 'Courier New', 'monospace'",
            }}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} className="relative flex flex-col">
              <div className="flex-1">
                <Editor
                  language="json"
                  theme={currentTheme.name}
                  value={jsonCode}
                  editorDidMount={editorDidMount}
                  editorWillMount={editorWillMount}
                  onChange={(newValue: string) => {
                    setJsonCode(newValue);
                  }}
                />
              </div>
              <div className="flex justify-center items-end h-fit">
                <button className="middle none center p-9 m-1 rounded-lg bg-amber-400 font-sans text-xs font-bold text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none opacity-25 hover:opacity-75">
                  Beautify
                </button>
                <button className="middle none center p-9	m-1 rounded-lg bg-amber-400 font-sans text-xs font-bold text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none opacity-25 hover:opacity-75">
                  Docs
                </button>
                <button className="middle none center p-9	m-1	rounded-lg bg-amber-400 font-sans text-xs font-bold text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none opacity-25 hover:opacity-75">
                  Theme
                </button>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              {/* <MonacoEditor
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
                  minimap: {
                    enabled: false,
                  },
                }}
              /> */}
              <Editor
                language="plaintext"
                theme={currentTheme.name}
                value={jqCode}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default JQEditor;
