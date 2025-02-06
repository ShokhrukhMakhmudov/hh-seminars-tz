import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Provider from "./context/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
  </Provider>
);
