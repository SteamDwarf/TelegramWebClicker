export interface AchievementData {
    id: string;
    name: string;
    image: string;
}

interface AchievementsMetadataAttribute {
    trait_type: string;
    value: string;
}

export interface AchievementsMetadata {
    name: string,
    description: string, 
    attributes: AchievementsMetadataAttribute[] 
    image: string;
}