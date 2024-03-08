export const removeRelation = () => ({ disconnect: true });
export const connectRelation = (value: number) => value && { connect: { id: value } };
export const connectManyRelation = (value: number[]) => value && { connect: value.map((id) => ({ id })) };
