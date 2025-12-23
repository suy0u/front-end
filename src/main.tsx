import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n";
import { Auth0Provider } from "@auth0/auth0-react";

import { store } from "./store/store";
import { Provider } from "react-redux";
import "./utils/Charts/chartSetup.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </StrictMode>
);
