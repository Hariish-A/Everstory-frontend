import { useState, useEffect, useRef } from "react";
import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css"; // Default theme
import "@milkdown/crepe/theme/nord.css"; // Light theme
import { Save } from "lucide-react";

// Import Roboto font
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const MarkdownEditor = () => {
  // State
  const [content, setContent] = useState(
    localStorage.getItem("markdownContent") ||
      "# Welcome to Your Study Editor\n\nWrite some **Markdown**, solve equations with LaTeX:\n\n$$x^2 + 2x + 1 = 0$$\n\nOr add code:\n\n```javascript\nconsole.log('Hello, Study Buddy!');\n```"
  );
  const editorRef = useRef(null);
  const initialized = useRef(false);

  // Initialize Milkdown Editor
  useEffect(() => {
    const initEditor = async () => {
      if (editorRef.current && !initialized.current) {
        const editor = await new Crepe({
          root: editorRef.current, // DOM element
          defaultValue: content, // Initial Markdown content
          features: {
            math: true, // Enable LaTeX via KaTeX
            prism: true, // Enable code highlighting via Prism
          },
          style: {
            typography: {
              fontFamily: '"Roboto", sans-serif',
            },
          },
        }).create();

        // Listen for content changes
        editor.editor.on("update", (ctx) => {
          const markdown = ctx.getMarkdown();
          setContent(markdown);
          localStorage.setItem("markdownContent", markdown); // Autosave
        });

        initialized.current = true; // Prevent re-initialization
      }
    };

    initEditor();
  }, []); // Empty dependency array to run once on mount

  // Manual Save
  const handleSave = () => {
    localStorage.setItem("markdownContent", content);
    alert("Saved to localStorage!");
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden font-roboto">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">Study Editor</h1>
        <button
          onClick={handleSave}
          className="bg-lime-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-lime-600 transition"
        >
          <Save className="w-5 h-5 mr-2" />
          Save
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        className="flex-1 p-4 bg-white m-4 rounded-lg shadow-md overflow-auto border border-gray-200 font-roboto"
      />
    </div>
  );
};

export default MarkdownEditor;