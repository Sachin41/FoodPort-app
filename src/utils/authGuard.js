import { redirect } from "react-router-dom";
import appStore from "../store/appStore";

export const requireAuth = () => {
  const { isAuthenticated } = appStore.getState().auth;

  if (!isAuthenticated) {
    return redirect("/login", { replace: true });
  }

  return null;
};
