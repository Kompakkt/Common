import type { IWikibaseItem } from './types';

export const getWikibaseItemID = (item: IWikibaseItem | string): string => {
  if (typeof item === 'string') {
    return item;
  }
  if (item.id) {
    return item.id;
  }
  if (item.internalID) {
    return item.internalID;
  }
  throw new Error('Invalid Wikibase item: no ID or internalID found');
};

export const getPQNumberFromID = (id: string) => {
  const match = id.match(/[PQ](\d+)/i)?.at(1);
  return match ? Number.parseInt(match) : undefined;
};
