"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/redux";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const ReduxProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};
