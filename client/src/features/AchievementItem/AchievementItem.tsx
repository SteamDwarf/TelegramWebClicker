import { FC } from "react";
import { AchievementsMetadata } from "shared/state/AchievementsState/types"
import './AchievementItem.scss';
import { Tooltip } from "antd";

interface AchievementItemProps {
    data: AchievementsMetadata;
}

export const AchievementItem:FC<AchievementItemProps> = ({data}) => {
    return (
        <Tooltip 
            title={
                <>
                    <h4>{data.name}</h4>
                    <p>{data.description}</p>
                </>
            } 
            trigger='hover'
        >
            <div className="achievement-item">
                <img src={data.image} alt={data.name} className="achievement-item__image"/>
            </div>
        </Tooltip>
    )
}