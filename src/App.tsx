import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import AppRouter from "./router/AppRouter";
import { ScrollToTop } from "./router/ScrollToTop";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <AppRouter />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
