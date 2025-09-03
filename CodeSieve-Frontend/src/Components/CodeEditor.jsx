import Editor from "@monaco-editor/react";

export default function CodeEditor({ value, onChange }) {
  return (
    <div className="editor-wrapper">
      <Editor height="520px" defaultLanguage="javascript" theme="vs-dark" value={value} onChange={onChange}
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          wordWrap: "on",
        }}
      />
    </div>
  );
}
