import { useContext } from "react";
import { AuthUserContext } from "./authUserContext";

export const useAuthUserContext = () => useContext(AuthUserContext);
