import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./types";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<AppState> = useSelector;