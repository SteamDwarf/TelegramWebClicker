import { AchievementItem } from "features/AchievementItem";
import { useEffect } from "react";
import { useLoadingAchievementsData } from "shared/hooks/useAchievementsData";
import { useAchievements, useAchievementsActions } from "shared/state/AchievementsState/hooks";
import './Achievements.scss';

export const Achievements = () => {
    const {achievementsMetadata, achievementsString} = useAchievements();  
    const recievedAchievementsIds = achievementsString.length > 0
        ? achievementsString.slice(2, -2).split('____').map((id) => Number(id))
        : [];

    console.log(recievedAchievementsIds);

    return (
        <div className="achievements">
            {
                recievedAchievementsIds.map((id) => <AchievementItem data={achievementsMetadata[id]}/>)
            }
        </div>
    );
}