import { IAppData } from "shared/types";

export interface StatUpdateAction {
    stat: keyof IAppData;
    value: number;
}