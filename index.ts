export type {
  IDocument,
  ITypeValueTuple,
  IDimensionTuple,
  ICreationTuple,
  IDescriptionValueTuple,
  IPlaceTuple,
  IAddress,
  IContact,
  IRelatedMap,
  IPerson,
  IInstitution,
  ITag,
  IBaseEntity,
  IPhysicalEntity,
  IDigitalEntity,
  IStrippedUserData,
  IUserData,
  IGroup,
  IAnnotation,
  IAgent,
  IBody,
  IContent,
  ICameraPerspective,
  IVector3,
  ITarget,
  ISource,
  ISelector,
  IFile,
  IWhitelist,
  IColor,
  IPosition,
  IEntitySettings,
  IEntityLight,
  IEntity,
  ICompilation,
  ISizedEvent,
} from './interfaces';

export { UserRank, Collection } from './enums';

export {
  isUnresolved,
  isGroup,
  isTag,
  isMetadataEntity,
  isCompilation,
  isEntity,
  isResolvedEntity,
  isAnnotation,
  isDigitalEntity,
  isPhysicalEntity,
  isPerson,
  isInstitution,
  isAddress,
  isContact,
  hasExtensions,
  areDocumentsEqual,
} from './typeguards';
