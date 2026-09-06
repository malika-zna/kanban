"use client";

import { useContext } from "react";
import { FormContext } from "../util/modalProvider";

export default function useFormData() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useStateData must be used within a ModalProvider");
  }
  return context;
}