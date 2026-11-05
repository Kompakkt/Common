import type { IAnnotation, IBaseEntity, IBaseEntityResolved, IDigitalEntity, IDigitalEntityResolved, IPhysicalEntity, IPhysicalEntityResolved } from '../schemas';
import type { IWikibaseAnnotationExtension, IWikibaseDigitalEntityExtension } from './types';

export type WikibaseExtendedBaseEntity = IBaseEntity & {
  extensions: IWikibaseDigitalEntityExtension;
};
export type WikibaseExtendedBaseEntityResolved = IBaseEntityResolved & {
  extensions: IWikibaseDigitalEntityExtension;
};
export type WikibaseExtendedDigitalEntity = IDigitalEntity & {
  extensions: IWikibaseDigitalEntityExtension;
};
export type WikibaseExtendedDigitalEntityResolved = IDigitalEntityResolved & {
  extensions: IWikibaseDigitalEntityExtension;
};
export type WikibaseExtendedPhysicalEntity = IPhysicalEntity & {
  extensions: IWikibaseDigitalEntityExtension;
};
export type WikibaseExtendedPhysicalEntityResolved = IPhysicalEntityResolved & {
  extensions: IWikibaseDigitalEntityExtension;
};
export type WikibaseExtendedAnnotation = IAnnotation & {
  extensions: IWikibaseAnnotationExtension;
};
