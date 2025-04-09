import { useContext } from "react";
import { MyContext } from "./MyContextProvider.tsx";

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("надо использовать в провайдере");
  }

  return context;
};
