import { AchievementsMetadata } from "shared/state/AchievementsState/types";
import { useMassiveFetch } from "./useFetch";
import { useEffect } from "react";
import { achievementsIDs } from "shared/state/AchievementsState/constants";

export const useLoadingAchievementsData = () => {
    const achievementsMetadataUrl = import.meta.env.VITE_ACHIEVEMENTS_METADATA_URL;
    const {
        sendRequest,
        info
    } = useMassiveFetch<AchievementsMetadata>();
    const links = achievementsIDs.map((id) => `${achievementsMetadataUrl}${id}.json`);


    useEffect(() => {
        sendRequest(links)
    }, []);

    return info;
}