// Editor.tsx
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monacoEditor from 'monaco-editor';

interface EditorProps {
  language: string;
  theme: string;
  value: string | undefined;
  editorDidMount?: (
    editor: monacoEditor.editor.IStandaloneCodeEditor,
    monaco: typeof monacoEditor,
  ) => void;
  editorWillMount?: (monaco: typeof monacoEditor) => void;
  onChange?: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  language,
  theme,
  value,
  editorDidMount,
  editorWillMount,
  onChange,
}) => {
  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language={language}
      theme={theme}
      value={value}
      editorWillMount={editorWillMount}
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
      onChange={onChange}
    />
  );
};

export default Editor;
