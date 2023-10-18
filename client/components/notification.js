import React from "react";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("您有新訊息");

export default function notification() {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
}
