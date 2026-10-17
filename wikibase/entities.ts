import type { IAnnotation, IBaseEntity, IDigitalEntity, IPhysicalEntity } from '../schemas';
import type { IWikibaseAnnotationExtension, IWikibaseDigitalEntityExtension } from './types';

export type WikibaseExtendedBaseEntity = IBaseEntity & {
  extensions: IWikibaseDigitalEntityExtension;
};
export type WikibaseExtendedDigitalEntity = IDigitalEntity & {
  extensions: IWikibaseDigitalEntityExtension;
};
export type WikibaseExtendedPhysicalEntity = IPhysicalEntity & {
  extensions: IWikibaseDigitalEntityExtension;
};
export type WikibaseExtendedAnnotation = IAnnotation & {
  extensions: IWikibaseAnnotationExtension;
};
