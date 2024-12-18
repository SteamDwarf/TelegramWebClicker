import { reducer } from "./reducer";
import { store } from "./store";

export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;