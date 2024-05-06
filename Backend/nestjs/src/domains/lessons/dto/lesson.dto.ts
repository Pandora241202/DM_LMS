import { LearningMaterial, Prisma } from "@prisma/client";

export class LessonDTO {
    title: string;
    learningMaterial: {
        id: number;
        name: string;
    }[]
    amountOfTime: number;
    visibility: boolean;

    static fromEntity(entity: Prisma.LessonGetPayload<{include: {LearningMaterial: true}}>): LessonDTO{
        const learningMaterial = entity.LearningMaterial.map(lm => ({id: lm.id, name: lm.name}))
        return{
            title: entity.title,
            learningMaterial: learningMaterial,
            amountOfTime: entity.amountOfTime,
            visibility: entity.visibility
        }
    }
}