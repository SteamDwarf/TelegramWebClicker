import { useNotificationsActions } from "shared/state/NotificationState/hooks"
import { AchievementModalContent } from "./AchievementModalContent";
import { useAchievements, useAchievementsActions } from "shared/state/AchievementsState/hooks";

export const useAchievementModal = () => {
    const { setModalState } = useNotificationsActions();
    const { addAchievement } = useAchievementsActions();
    const { achievementsMetadata } = useAchievements();
 
    const showModal = (id: number) => {
        if(achievementsMetadata.length === 0) return; 
        
        setModalState({
            modalIsOpened: true,
            modalTitle: 'Achievement recieved!',
            modalContent: <AchievementModalContent achievementData={achievementsMetadata[id]}/>,
            modalOnCancel: () => addAchievement(id.toString()),
            modalOnConfirm: () => addAchievement(id.toString())
        })
    }

    return showModal;
}