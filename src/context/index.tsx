import { createContext, ReactNode, useState } from "react";
import { ContextType } from "../types";

export const Context = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
  refetchState: false,
  setRefetchState: () => {},
});

export default function Provider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContextType>({
    loading: false,
    refetchState: false,
  });

  function setLoading(loading: boolean) {
    setState((prev) => ({ ...prev, loading }));
  }

  function setRefetchState() {
    setState((prev) => ({ ...prev, refetchState: !prev.refetchState }));
  }

  return (
    <Context.Provider value={{ ...state, setLoading, setRefetchState }}>
      {children}
    </Context.Provider>
  );
}
