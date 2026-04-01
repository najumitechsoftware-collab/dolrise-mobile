const memoryFeed: Record<string, any[]> = {};

export function getMemoryFeed(mode: string) {
  return memoryFeed[mode] || null;
}

export function setMemoryFeed(mode: string, posts: any[]) {
  memoryFeed[mode] = posts;
}

export function clearMemoryFeed(mode?: string) {
  if (mode) {
    delete memoryFeed[mode];
  } else {
    Object.keys(memoryFeed).forEach((key) => {
      delete memoryFeed[key];
    });
  }
}
