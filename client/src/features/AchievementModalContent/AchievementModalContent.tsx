import { FC } from "react"
import { AchievementsMetadata } from "shared/state/AchievementsState/types";
import './AchievementModalContent.scss';

interface AchievementModalContentProps {
    achievementData: AchievementsMetadata
}

export const AchievementModalContent:FC<AchievementModalContentProps> = ({achievementData}) => {
    return (
        <div className="achievement-modal__container">
            <h3 className="achievement-modal__name">{achievementData.name}</h3>
            <img className="achievement-modal__image" src={achievementData.image} alt={achievementData.name} />
            <p className="achievement-modal__description">{achievementData.description}</p>
        </div>
    )
}