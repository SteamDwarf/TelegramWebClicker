import { FC } from "react"
import { IStatItem } from "./types"
import './StatItem.scss';
import { Spin } from "antd";

interface StatItemProps {
    data: IStatItem;
}

export const StatItem:FC<StatItemProps> = ({data}) => {
    return (
        <div className="stat__item">
            {data.icon}
            {
                data.isLoading 
                    ? <Spin style={{color: 'yellow'}}/>
                    : <span>{data.value}</span>
            }
        </div>
    )
}