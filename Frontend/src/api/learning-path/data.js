const LOs = [];

for (let i = 1; i <= 50; i++) {
  LOs.push({
    id: i,
    topic: `Topic ${i}`,
    learningObject: `Learning Object ${i}`,
    finished: i == 20 ? 50 : i < 20 ? 100 : 0,
  });
}

export const baseInfoLearningPath = {
  "learningStyle": ["b", "a", "b", "b", "a", "a", "b", "b", "b", "b", "a", "b", "b", "b", "b", "a", "a", "b", "a", "b", "a", "b", "b", "a", "b", "a", "a", "a", "b", "a", "b", "b", "b", "a", "a", "a", "b", "b", "a", "b", "b", "b", "a", "a"],
  "backgroundKnowledge": "INTERMEDIATE",
  "qualification": "GRADUATE"
}

export {LOs};