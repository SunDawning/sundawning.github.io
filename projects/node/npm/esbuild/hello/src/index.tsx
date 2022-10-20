import * as React from "react";
import { createRoot } from "react-dom/client";
function Index() {
  return <h1>拼</h1>;
}
createRoot(document.body.appendChild(document.createElement("div"))).render(
  <Index></Index>
);
