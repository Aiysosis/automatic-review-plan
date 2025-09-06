import { createContext } from "react";
import type { IModalCtx } from "./types";

export const ModalContext = createContext<IModalCtx>(null);