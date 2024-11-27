import { FC } from "react"
import { IStatItem } from "./types"
import './StatItem.scss';

interface StatItemProps {
    data: IStatItem;
}

export const StatItem:FC<StatItemProps> = ({data}) => {
    return (
        <div className="stat__item">
            {data.icon}
            <span>{data.value}</span>
        </div>
    )
}