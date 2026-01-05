import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { closeModal } from "../store/slices/uiSlice";

export function ModalRouteListener() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(closeModal());
  }, [location.pathname, dispatch]);

  return null;
}
