import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setRedirect } from "../../store/slices/authSlice";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      dispatch(setRedirect(location.pathname));
    }
  }, [token, location.pathname, dispatch]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
