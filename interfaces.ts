import { Collection, EntityAccessRole, ProfileType, type UserRank } from './enums';

/**
 * Database model for any document saved in the database.
 * Should be used as a base interface for other database models.
 */
export interface IDocument {
  _id: string;
}

export interface ITypeValueTuple {
  type: string;
  value: string;
}

export interface IDimensionTuple {
  type: string;
  value: string;
  name: string;
}

export interface ICreationTuple {
  technique: string;
  program: string;
  equipment: string;
  date: string;
}

export interface IDescriptionValueTuple {
  description: string;
  value: string;
}

export interface IPlaceTuple {
  name: string;
  geopolarea: string;
  address: IAddress;
}

export type DataTuple = ITypeValueTuple | IDimensionTuple | ICreationTuple | IDescriptionValueTuple;

/**
 * Database model for addresses.
 */
export interface IAddress extends IDocument {
  building: string;
  number: string;
  street: string;
  postcode: string;
  city: string;
  country: string;

  // Internal & only used to sort addresses
  creation_date: number;
}

/**
 * Database model for contact references.
 */
export interface IContact extends IDocument {
  mail: string;
  phonenumber: string;
  note: string;

  // Internal & only used to sort contact references
  creation_date: number;
}

/**
 * Generic object-based pseudo-map (not to be confused with Map).
 * Key is always the _id of a metadata entity (DigitalEntity | PhysicalEntity)
 * Value is whatever data is connected to the entity described by key
 */
export interface IRelatedMap<T, TNonNullable extends boolean = true> {
  [relatedEntityId: string]: TNonNullable extends true ? T : T | undefined;
}

/**
 * Database model of a person. Makes use of IRelatedMap for roles,
 * institutions and contact references.
 */
export interface IPerson<TResolved extends boolean = false> extends IDocument {
  prename: string;
  name: string;

  // relatedEntityId refers to the _id
  // of the digital or physical entity
  // a person refers to
  roles: IRelatedMap<string[]>;
  institutions: TResolved extends true
    ? IRelatedMap<IInstitution<true>[], true>
    : IRelatedMap<Array<IInstitution | IDocument>>;
  contact_references: TResolved extends true
    ? IRelatedMap<IContact, true>
    : IRelatedMap<IContact | IDocument>;
}

/**
 * Database model of an institution. Makes use of IRelatedMap for roles,
 * notes and addresses.
 */
export interface IInstitution<TResolved extends boolean = false> extends IDocument {
  name: string;
  university: string;

  // relatedEntityId refers to the _id
  // of the digital or physical entity
  // a person refers to
  roles: IRelatedMap<string[]>;
  notes: IRelatedMap<string>;
  addresses: TResolved extends true
    ? IRelatedMap<IAddress, true>
    : IRelatedMap<IAddress | IDocument>;
}

/**
 * Database model of a tag
 */
export interface ITag extends IDocument {
  value: string;
}

/**
 * Common interface between IPhysicalEntity and IDigitalEntity.
 * Should not be used on its own.
 */
export interface IBaseEntity<
  TExtensionData = Record<string, unknown>,
  TResolved extends boolean = false,
> extends IDocument {
  title: string;
  description: string;

  externalId: ITypeValueTuple[];
  externalLink: IDescriptionValueTuple[];
  biblioRefs: IDescriptionValueTuple[];
  other: IDescriptionValueTuple[];

  persons: TResolved extends true ? IPerson<true>[] : (IPerson | IDocument | string)[];
  institutions: TResolved extends true
    ? IInstitution<true>[]
    : (IInstitution | IDocument | string)[];

  metadata_files: IFile[];

  extensions?: TExtensionData;
}

/**
 * Database model of a physical entity. Uses IBaseEntity.
 */
export interface IPhysicalEntity<
  TExtensionData = Record<string, unknown>,
  TResolved extends boolean = false,
> extends IBaseEntity<TExtensionData, TResolved> {
  place: IPlaceTuple;
  collection: string;
}

/**
 * Database model of a digital entity. Uses IBaseEntity.
 */
export interface IDigitalEntity<
  TExtensionData = Record<string, unknown>,
  TResolved extends boolean = false,
> extends IBaseEntity<TExtensionData, TResolved> {
  type: string;
  licence: string;

  discipline: string[];
  tags: TResolved extends true ? ITag[] : (ITag | IDocument)[];

  dimensions: IDimensionTuple[];
  creation: ICreationTuple[];
  files: IFile[];

  statement: string;
  objecttype: string;

  phyObjs: TResolved extends true
    ? IPhysicalEntity<TExtensionData, true>[]
    : (IPhysicalEntity<TExtensionData> | IDocument)[];
}

/**
 * Userdata reduced to fullname, username and _id.
 * May be displayed in public
 */
export interface IStrippedUserData extends IDocument {
  fullname: string;
  username: string;
}

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
            : C extends Collection.group
              ? IGroup
              : C extends Collection.institution
                ? IInstitution
                : C extends Collection.person
                  ? IPerson
                  : C extends Collection.physicalentity
                    ? IPhysicalEntity
                    : C extends Collection.tag
                      ? ITag
                      : IDocument;

/**
 * Database model for users. Should not be displayed in public,
 * as it contains the sessionID.
 */
export interface IUserData extends IDocument {
  username: string;
  sessionID?: string;
  fullname: string;
  prename: string;
  surname: string;
  mail: string;
  role: UserRank;

  data: {
    [Collection.address]?: Array<IAddress | IDocument | string | null>;
    [Collection.annotation]?: Array<IAnnotation | IDocument | string | null>;
    [Collection.compilation]?: Array<ICompilation | IDocument | string | null>;
    [Collection.contact]?: Array<IContact | IDocument | string | null>;
    [Collection.digitalentity]?: Array<IDigitalEntity | IDocument | string | null>;
    [Collection.entity]?: Array<IDocument | string | null>;
    [Collection.group]?: Array<IGroup | IDocument | string | null>;
    [Collection.institution]?: Array<IInstitution | IDocument | string | null>;
    [Collection.person]?: Array<IPerson | IDocument | string | null>;
    [Collection.physicalentity]?: Array<IPhysicalEntity | IDocument | string | null>;
    [Collection.tag]?: Array<ITag | IDocument | string | null>;
  };

  profiles?: {
    [identifier: string]: ProfileType;
  };
}

export type IUserDataWithoutData = Omit<IUserData, 'data'>;

export interface IPublicProfile extends IDocument {
  type: ProfileType;
  imageUrl: string | undefined;
  description: string | undefined;
  displayName: string | undefined;
  location: string | undefined;
  socials: {
    [key: string]: string | undefined;
    website: string | undefined;
  };
}

/**
 * Database model for groups. May be displayed in public,
 * as it only contains stripped user data.
 */
export interface IGroup extends IDocument {
  name: string;
  creator: IStrippedUserData;
  owners: IStrippedUserData[];
  members: IStrippedUserData[];
}

/**
 * Database model of an annotation.
 */
export interface IAnnotation<T = Record<string, unknown>> extends IDocument {
  validated: boolean;

  identifier: string;
  ranking: number;
  creator: IAgent;
  created: string;
  generator: IAgent;
  generated?: string;
  motivation: string;
  lastModificationDate?: string;
  lastModifiedBy: IAgent;

  positionXOnView?: number;
  positionYOnView?: number;

  body: IBody;
  target: ITarget;

  extensions?: T;
}

export interface IAgent extends IDocument {
  type: string;
  name: string;
  homepage?: string;
}

export interface IBody {
  type: string;
  content: IContent;
}

export interface IContent {
  type: string;
  title: string;
  description: string;
  link?: string;
  relatedPerspective: ICameraPerspective;
  [key: string]: any;
}

export interface ICameraPerspective {
  cameraType: string;
  position: IAmbiguousVector3;
  target: IAmbiguousVector3;
  preview: string;
}

export type IAmbiguousVector3 = IVector3 | { _x: number; _y: number; _z: number };

export interface IVector3 {
  x: number;
  y: number;
  z: number;
}

export interface ITarget {
  source: ISource;
  selector: ISelector;
}

export interface ISource {
  link?: string;
  relatedEntity: string;
  relatedCompilation?: string;
}

export interface ISelector {
  referencePoint: IAmbiguousVector3;
  referenceNormal: IAmbiguousVector3;
}

// Entity related
// TODO: remove file_ prefix and add migration
export interface IFile {
  file_name: string;
  file_link: string;
  file_size: number;
  file_format: string;
}

/**
 * Describes any database model that can be protected by a whitelist of users
 * or groups.
 * Should not be used on its own.
 */
export interface IWhitelist {
  whitelist: {
    enabled: boolean;
    persons: IStrippedUserData[];
    groups: IGroup[];
  };
}

export interface IColor {
  r: number;
  b: number;
  g: number;
  a: number;
}

export interface IPosition {
  x: number;
  y: number;
  z: number;
}

export interface IEntitySettings {
  position?: IPosition;
  preview: string;
  previewVideo?: string;
  cameraPositionInitial: {
    position: IPosition;
    target: IPosition;
  };
  background: {
    color: IColor;
    effect: boolean;
  };
  lights: IEntityLight[];
  rotation: IPosition;
  scale: number;
  translate?: IPosition;
}

export interface IEntityLight {
  type: string;
  position: IPosition;
  intensity: number;
}

/**
 * Describes any database model that can be annotated/receive annotations.
 * Should not be used on its own.
 */
interface IAnnotationList {
  annotations: {
    [id: string]: IAnnotation | IDocument;
  };
}

/**
 * Database model of an entity.
 *
 * An entity is what a user creates during the upload process and contains
 * information about the files uploaded as well as a reference to the
 * digital entity described/connected to the uploaded entity.
 *
 * Makes use of IWhitelist and IAnnotationList.
 */
export interface IEntity<T = Record<string, unknown>>
  extends IWhitelist,
    IAnnotationList,
    IDocument {
  name: string;

  files: IFile[];
  externalFile?: string;

  relatedDigitalEntity: IDocument | IDigitalEntity;

  creator: IStrippedUserData;

  online: boolean;
  finished: boolean;

  mediaType: string;

  dataSource: {
    isExternal: boolean;
    service: string;
  };

  processed: {
    low: string;
    medium: string;
    high: string;
    raw: string;
  };

  settings: IEntitySettings;

  extensions?: T;

  access?: {
    [id: string]: IStrippedUserData & { role: EntityAccessRole };
  };
}

/**
 * Database model of a compilation.
 *
 * A compilation contains a list of entities aswell as information on
 * who created the compilation.
 *
 * Makes use of IWhitelist and IAnnotationList.
 */
export interface ICompilation extends IWhitelist, IAnnotationList, IDocument {
  name: string;
  description: string;
  creator: IStrippedUserData;
  password?: string | boolean;
  entities: {
    [id: string]: IEntity | IDocument;
  };
}

export interface ISizedEvent {
  width: number;
  height: number;
}
