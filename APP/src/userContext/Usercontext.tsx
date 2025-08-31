import { createContext } from "react";

type User = {
  username?: String;
  email?: String;
};

export const UserContext = createContext<{
  user?: User;
  setUser?: (user?: User) => void;
}>({});
