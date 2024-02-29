export const removeRelation = () => ({ disconnect: true });
export const connectRelation = (value: number) => value && { connect: { id: value } };
