const DFS = (stack: number[], currentPath: number[], paths: number[][], topicLink: any, start?: number, end?: number) => {
  if (stack.length === 0) {
    stack.push(start);
    currentPath.push(start);
    DFS(stack, currentPath, paths, topicLink);
  } else {
    if (currentPath.length !== 0 && currentPath[-1] === end) {
      paths.push(currentPath);
      return;
    }

    for (let i = 0; i < topicLink; i++) {
      if (topicLink[i].start !== stack[-1]) continue;

      for (let j = 0; j < topicLink[i].link.length; j++) {
        const index = topicLink[i].link[j];

        stack.push(index);
        currentPath.push(index);
        DFS(stack, currentPath, paths, topicLink);
        stack.pop();
        currentPath.pop();
      }
    }
  }
};

function transformData(data: { startId: number; endId: number }[]): { start: number; link: number[] }[] {
  const transformedData: { [startId: number]: number[] } = {};

  for (const item of data) {
    if (!(item.startId in transformedData)) {
      transformedData[item.startId] = [];
    }
    transformedData[item.startId].push(item.endId);
  }
  const result: { start: number; link: number[] }[] = [];
  for (const startId in transformedData) {
    if (Object.prototype.hasOwnProperty.call(transformedData, startId)) {
      result.push({ start: parseInt(startId), link: transformedData[startId] });
    }
  }

  return result;
}

export class TopicDTO {
  static getTopicPath(topicLink: { startId: number; endId: number }[], start: number, end: number) {
    let paths = [];
    DFS([], [], paths, transformData(topicLink), start, end);
    return topicLink;
  }
}
