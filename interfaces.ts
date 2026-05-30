export type {
  IAddress,
  IAgent,
  IAmbiguousVector3,
  IAnnotation,
  IBaseEntity,
  IBody,
  ICameraPerspective,
  IColor,
  ICompilation,
  IContact,
  IContent,
  ICreationTuple,
  IDescriptionValueTuple,
  IDigitalEntity,
  IDimensionTuple,
  IDocument,
  IEntity,
  IEntityLight,
  IEntitySettings,
  IFile,
  IInstitution,
  IPerson,
  IPhysicalEntity,
  IPlaceTuple,
  IPosition,
  IRelatedMap,
  ISelector,
  ISizedEvent,
  ISource,
  IStrippedUserData,
  ITag,
  ITarget,
  ITypeValueTuple,
  IUserData,
  IVector3,
  IWhitelist,
  IPublicProfile,
  DataTuple,
  AccessField,
  AccessFieldEntry,
  CreatorField,
  ProfileReference,
} from './schemas';

import type {
  IAddress,
  IAgent,
  IAmbiguousVector3,
  IAnnotation,
  IBaseEntity,
  IBody,
  ICameraPerspective,
  IColor,
  ICompilation,
  IContact,
  IContent,
  ICreationTuple,
  IDescriptionValueTuple,
  IDigitalEntity,
  IDimensionTuple,
  IDocument,
  IEntity,
  IEntityLight,
  IEntitySettings,
  IFile,
  IInstitution,
  IPerson,
  IPhysicalEntity,
  IPlaceTuple,
  IPosition,
  IRelatedMap,
  ITag,
  IUserData,
  IVector3,
  ProfileReference,
  AccessFieldEntry,
  AccessField,
  CreatorField,
} from './schemas';

export type IUserDataWithoutData = Omit<IUserData, 'data'>;

export type { IRelatedMap as IRelatedMapType };

export interface IRelatedMap<T, TNonNullable extends boolean = true> {
  [relatedEntityId: string]: TNonNullable extends true ? T : T | undefined;
}

export interface IPerson<TResolved extends boolean = false> extends IDocument {
  prename: string;
  name: string;
  roles: IRelatedMap<string[]>;
  institutions: TResolved extends false
    ? IRelatedMap<Array<IInstitution | IDocument>>
    : IRelatedMap<IInstitution<true>[], true>;
  contact_references: TResolved extends false
    ? IRelatedMap<IContact | IDocument>
    : IRelatedMap<IContact, true>;
}

export interface IInstitution<TResolved extends boolean = false> extends IDocument {
  name: string;
  university: string;
  roles: IRelatedMap<string[]>;
  notes: IRelatedMap<string>;
  addresses: TResolved extends false
    ? IRelatedMap<IAddress | IDocument>
    : IRelatedMap<IAddress, true>;
}

export interface IPhysicalEntity<
  TExtensionData = Record<string, unknown>,
  TResolved extends boolean = false,
> extends IBaseEntity<TExtensionData, TResolved> {
  place: IPlaceTuple;
  collection: string;
  dimensions: IDimensionTuple[];
}

export interface IDigitalEntity<
  TExtensionData = Record<string, unknown>,
  TResolved extends boolean = false,
> extends IBaseEntity<TExtensionData, TResolved> {
  type: string;
  licence: string;
  discipline: string[];
  tags: TResolved extends false ? (IDocument | ITag)[] : ITag[];
  dimensions: IDimensionTuple[];
  creation: ICreationTuple[];
  files: IFile[];
  statement: string;
  objecttype: string;
  phyObjs: TResolved extends false
    ? (IDocument | IPhysicalEntity<TExtensionData>)[]
    : IPhysicalEntity<TExtensionData, true>[];
}

export type DataTuple = ITypeValueTuple | IDimensionTuple | ICreationTuple | IDescriptionValueTuple;

export type UserDataCollectionDocumentType<C extends Collection> = C extends Collection.address
  ? IAddress
  : C extends Collection.annotation
    ? IAnnotation
    : C extends Collection.compilation
      ? ICompilation
      : C extends Collection.contact
        ? IContact
        : C extends Collection.digitalentity
          ? IDigitalEntity
          : C extends Collection.entity
            ? IEntity
            : C extends Collection.institution
              ? IInstitution
              : C extends Collection.person
                ? IPerson
                : C extends Collection.physicalentity
                  ? IPhysicalEntity
                  : C extends Collection.tag
                    ? ITag
                    : IDocument;