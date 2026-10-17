import { isDigitalEntity } from '../typeguards';
import type { WikibaseExtendedDigitalEntity } from './entities';

export const isWikibaseExtendedDigitalEntity = (
  entity: unknown,
): entity is WikibaseExtendedDigitalEntity => {
  if (!isDigitalEntity(entity)) return false;
  const asWikibaseEntity = entity as WikibaseExtendedDigitalEntity;
  return (
    'extensions' in asWikibaseEntity &&
    typeof asWikibaseEntity.extensions === 'object' &&
    asWikibaseEntity.extensions !== null &&
    'wikibase' in asWikibaseEntity.extensions
  );
};
