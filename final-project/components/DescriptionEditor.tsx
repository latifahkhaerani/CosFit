"use client";

import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DescriptionEditor({
  value,
  onChange,
}: Props) {
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
          "input-soft min-h-[220px] w-full p-4 focus:outline-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
}