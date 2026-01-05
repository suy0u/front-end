import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import AppRouter from "./router/AppRouter";
import { ScrollToTop } from "./router/ScrollToTop";
import { ModalRouteListener } from "./router/ModalRouteListener";

import { useNotificationsWS } from "./hooks/useNotificationsWS";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { closeModal } from "./store/slices/uiSlice";

import { NotificationToastStack } from "./components/Notifications/NotificationToastStack";
import ListsModal from "./components/Modals/ListsModal";

const App: React.FC = () => {
  useNotificationsWS();

  const dispatch = useAppDispatch();
  const { activeModal, modalPayload } = useAppSelector((s) => s.ui);

  return (
    <BrowserRouter>
      <Layout>
        <NotificationToastStack />
        <ModalRouteListener />

        <ListsModal
          open={!!activeModal}
          type={activeModal}
          companyId={modalPayload?.companyId}
          isOwner={modalPayload?.isOwner}
          onClose={() => dispatch(closeModal())}
        />

        <ScrollToTop />

        <AppRouter />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
