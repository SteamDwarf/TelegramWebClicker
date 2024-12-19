import { ReactNode } from "react";

export interface IStatItem {
    icon: ReactNode;
    value: number;
    isLoading?: boolean;
}