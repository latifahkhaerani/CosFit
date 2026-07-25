"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ReplyEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value,

    immediatelyRender: false,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "input-soft min-h-[120px] w-full rounded-xl p-3 focus:outline-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
}