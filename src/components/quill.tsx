"use client";

import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface QuillProps {}

export const Quill = ({}: QuillProps) => {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState("");

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Tell your story"
      />
    </div>
  );
};
