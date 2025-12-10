import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import AppRouter from "./router/AppRouter";
import i18n from "./i18n";
import { useEffect } from "react";
import { useAppSelector } from "./store/hooks";

const App: React.FC = () => {
  const lang = useAppSelector((s) => s.language.current);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <BrowserRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
