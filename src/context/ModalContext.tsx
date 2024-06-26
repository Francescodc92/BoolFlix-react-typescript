import { ReactNode, createContext, useState } from "react";
import { Movie, Series } from "../types";
export interface ModalContextType {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: Movie | Series | null;
  setData: React.Dispatch<React.SetStateAction<Movie | Series | null>>;
}

export const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  setIsModalOpen: () => {},
  data: null,
  setData: () => {},
});

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<Movie | Series | null>(null);

  const contextValue: ModalContextType = {
    isModalOpen,
    setIsModalOpen,
    data,
    setData,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}
