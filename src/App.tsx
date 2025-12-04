import "./App.css";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
};

export default App;
