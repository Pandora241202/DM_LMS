import { SubjectType } from "@prisma/client";

export const FUNDAMENTAL = {
  type: SubjectType.FUNDAMENTAL,
  start: 1,
  end: 35,
};

export const DATA_SCIENTIST = {
  type: SubjectType.DATA_SCIENTIST,
  start: 36,
  end: 83,
};

export const MACHINE_LEARNING = {
  type: SubjectType.MACHINE_LEARNING,
  start: 84,
  end: 217,
};

export const DEEP_LEARNING = {
  type: SubjectType.DEEP_LEARNING,
  start: 128,
  end: 174,
};

export const DATA_ENGINEER = {
  type: SubjectType.DATA_ENGINEER,
  start: 175,
  end: 186,
};

export const BIG_DATA_ENGINEER = {
  type: SubjectType.BIG_DATA_ENGINEER,
  start: 187,
  end: 217,
};

export const getStartEnd = (type: SubjectType): {start: number, end: number} => {
  if (type === SubjectType.FUNDAMENTAL) return  {start: FUNDAMENTAL.start, end: FUNDAMENTAL.end};
  if (type === SubjectType.DATA_SCIENTIST) return  {start: DATA_SCIENTIST.start, end: DATA_SCIENTIST.end};
  if (type === SubjectType.MACHINE_LEARNING) return  {start: MACHINE_LEARNING.start, end: MACHINE_LEARNING.end};
  if (type === SubjectType.DEEP_LEARNING) return  {start: DEEP_LEARNING.start, end: DEEP_LEARNING.end};
  if (type === SubjectType.DATA_ENGINEER) return  {start: DATA_ENGINEER.start, end: DATA_ENGINEER.end};
  if (type === SubjectType.BIG_DATA_ENGINEER) return  {start: BIG_DATA_ENGINEER.start, end: BIG_DATA_ENGINEER.end};
  throw new Error("Invalid SubjectType");
}