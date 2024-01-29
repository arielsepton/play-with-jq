import { runJQ } from '../common/helper';
import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { draculaTheme } from '../common/utils/DraculaTheme';
import * as monacoEditor from 'monaco-editor';

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
    `{ "beautify": "Press Alt + b", "help": "Press ctrl + enter", "switch_theme": "Press Alt + t" }`,
  );
  const [jqCode, setJqCode] = useState<string>();
  const [jqFilter, setJqFilter] = useState<string>('.help');

  const handleJsonChange = (newValue: string) => {
    try {
      setJsonCode(newValue);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  const handleJqFilterChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    try {
      setJqFilter(event.target.value);
    } catch (error) {
      console.error('Error with filter:', error);
    }
  };

  const runJQQuery = () => {
    console.log('jqProps changed:', {
      jqFilter: jqFilter,
      jsonCode: jsonCode,
    });

    try {
      runJQ(jqFilter, JSON.parse(jsonCode)).then((result) => {
        console.log('result: ' + result);
        setJqCode(result);
      });
    } catch (error) {
      console.log('here is the problem:');

      console.log(error.message);
    }
  };

  useEffect(runJQQuery, [jqFilter, jsonCode]);

  const availableThemes = [
    { name: 'dracula-theme', bg: 'bg-[#282a36]', text: '#ffffff' },
    { name: 'vs', bg: 'bg-[#ffffff]', text: '#000000' },
    { name: 'vs-dark', bg: 'bg-[#1e1e1e]', text: '#ffffff' },
    { name: 'hc-black', bg: 'bg-[#000000]', text: '#ffffff' },
    { name: 'hc-light', bg: 'bg-[#ffffff]', text: '#000000' },
  ];
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const editorDidMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor,
    monaco: typeof monacoEditor,
  ) => {
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      toggleModal,
    );
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.KeyT, () => {
      setCurrentThemeIndex(
        (prevIndex) => (prevIndex + 1) % availableThemes.length,
      );
    });
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.KeyB, () => {
      const obj = JSON.parse(jsonCode);
      setJsonCode(JSON.stringify(obj, null, 2));
    });

    editor.onDidChangeModelDecorations(() => {
      const model = editor.getModel();

      // Check if model is not null before using it
      if (model) {
        const markers = monaco.editor.getModelMarkers(
          model as {
            owner?: string;
            resource?: monaco.Uri;
            take?: number;
          },
        );
        console.log({ markers });
      }
    });
  };

  const currentTheme = availableThemes[currentThemeIndex];
  // const editorWillMount = (monaco: any) => {
  //   monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  //     validate: true,
  //   });
  // };
  return (
    <div className={`w-screen h-screen ${currentTheme.bg}`}>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={20}>
          <textarea
            className={`p-2 text-base w-full h-full ${currentTheme.bg} resize-none w-screen flex-none`}
            value={jqFilter}
            onChange={handleJqFilterChange}
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
            <ResizablePanel defaultSize={50}>
              <MonacoEditor
                width="100%"
                height="100%"
                language="json"
                theme="vs"
                value={jsonCode}
                editorDidMount={editorDidMount}
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
                onChange={handleJsonChange}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <MonacoEditor
                width="100%"
                height="100%"
                language="html"
                theme={currentTheme.name}
                value={jqCode}
                editorDidMount={editorDidMount}
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
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default JQEditor;
