import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setRedirect } from "../../store/slices/authSlice";
import type React from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (!token) {
    dispatch(setRedirect(location.pathname));
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
