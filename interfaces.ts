// Expose MongoDB ObjectId to be used in Repo and Viewer
import type ObjectId from 'bson-objectid';

import { Collection, UserRank } from './enums';

/**
 * Database model for any document saved in the database.
 * Should be used as a base type for other database models.
 */
export type IDocument = {
  _id: string | ObjectId;
};

export type ITypeValueTuple = {
  type: string;
  value: string;
};

export type IDimensionTuple = {
  type: string;
  value: string;
  name: string;
};

export type ICreationTuple = {
  technique: string;
  program: string;
  equipment: string;
  date: string;
};

export type IDescriptionValueTuple = {
  description: string;
  value: string;
};

export type IPlaceTuple = {
  name: string;
  geopolarea: string;
  address: IAddress;
};

/**
 * Database model for addresses.
 */
export type IAddress = IDocument & {
  building: string;
  number: string;
  street: string;
  postcode: string;
  city: string;
  country: string;

  // Internal & only used to sort addresses
  creation_date: number;
};

/**
 * Database model for contact references.
 */
export type IContact = IDocument & {
  mail: string;
  phonenumber: string;
  note: string;

  // Internal & only used to sort contact references
  creation_date: number;
};

/**
 * Generic object-based pseudo-map (not to be confused with Map).
 * Key is always the _id of a metadata entity (DigitalEntity | PhysicalEntity)
 * Value is whatever data is connected to the entity described by key
 */
export type IRelatedMap<T> = {
  [relatedEntityId: string]: T | undefined;
};

/**
 * Database model of a person. Makes use of IRelatedMap for roles,
 * institutions and contact references.
 */
export type IPerson = IDocument & {
  prename: string;
  name: string;

  // relatedEntityId refers to the _id
  // of the digital or physical entity
  // a person refers to
  roles: IRelatedMap<string[]>;
  institutions: IRelatedMap<Array<IInstitution | IDocument>>;
  contact_references: IRelatedMap<IContact | IDocument>;
};

/**
 * Database model of an institution. Makes use of IRelatedMap for roles,
 * notes and addresses.
 */
export type IInstitution = IDocument & {
  name: string;
  university: string;

  // relatedEntityId refers to the _id
  // of the digital or physical entity
  // a person refers to
  roles: IRelatedMap<string[]>;
  notes: IRelatedMap<string>;
  addresses: IRelatedMap<IAddress | IDocument>;
};

/**
 * Database model of a tag
 */
export type ITag = IDocument & {
  value: string;
};

/**
 * Common type between IPhysicalEntity and IDigitalEntity.
 * Should not be used on its own.
 */
export type IBaseEntity = IDocument & {
  title: string;
  description: string;

  externalId: ITypeValueTuple[];
  externalLink: IDescriptionValueTuple[];
  biblioRefs: IDescriptionValueTuple[];
  other: IDescriptionValueTuple[];

  persons: IPerson[];
  institutions: IInstitution[];

  metadata_files: IFile[];
};

/**
 * Database model of a physical entity. Uses IBaseEntity.
 */
export type IPhysicalEntity = IBaseEntity & {
  place: IPlaceTuple;
  collection: string;
};

/**
 * Database model of a digital entity. Uses IBaseEntity.
 */
export type IDigitalEntity = IBaseEntity & {
  type: string;
  licence: string;

  discipline: string[];
  tags: ITag[];

  dimensions: IDimensionTuple[];
  creation: ICreationTuple[];
  files: IFile[];

  statement: string;
  objecttype: string;

  phyObjs: IPhysicalEntity[];
};

/**
 * Userdata reduced to fullname, username and _id.
 * May be displayed in public
 */
export type IStrippedUserData = IDocument & {
  fullname: string;
  username: string;
};

/**
 * Database model for users. Should not be displayed in public,
 * as it contains the sessionID.
 */
export type IUserData = IDocument & {
  username: string;
  sessionID: string;
  fullname: string;
  prename: string;
  surname: string;
  mail: string;

  role: UserRank;

  data: {
    [key in Collection]: Array<string | null | any | ObjectId>;
  };
};

/**
 * Database model for groups. May be displayed in public,
 * as it only contains stripped user data.
 */
export type IGroup = IDocument & {
  name: string;
  creator: IStrippedUserData;
  owners: IStrippedUserData[];
  members: IStrippedUserData[];
};

/**
 * Database model of an annotation.
 */
export type IAnnotation = IDocument & {
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
};

export type IAgent = IDocument & {
  type: string;
  name: string;
  homepage?: string;
};

export type IBody = {
  type: string;
  content: IContent;
};

export type IContent = {
  type: string;
  title: string;
  description: string;
  link?: string;
  relatedPerspective: ICameraPerspective;
  [key: string]: any;
};

export type ICameraPerspective = {
  cameraType: string;
  position: IVector3;
  target: IVector3;
  preview: string;
};

export type IVector3 = {
  x: number;
  y: number;
  z: number;
};

export type ITarget = {
  source: ISource;
  selector: ISelector;
};

export type ISource = {
  link?: string;
  relatedEntity: string;
  relatedCompilation?: string;
};

export type ISelector = {
  referencePoint: IVector3;
  referenceNormal: IVector3;
};

// Entity related
// TODO: remove file_ prefix and add migration
export type IFile = {
  file_name: string;
  file_link: string;
  file_size: number;
  file_format: string;
};

/**
 * Describes any database model that can be protected by a whitelist of users
 * or groups.
 * Should not be used on its own.
 */
export type IWhitelist = {
  whitelist: {
    enabled: boolean;
    persons: IStrippedUserData[];
    groups: IGroup[];
  };
};

export type IColor = {
  r: number;
  b: number;
  g: number;
  a: number;
};

export type IPosition = {
  x: number;
  y: number;
  z: number;
};

export type IEntitySettings = {
  position?: IPosition;
  preview: string;
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
};

export type IEntityLight = {
  type: string;
  position: IPosition;
  intensity: number;
};

/**
 * Describes any database model that can be annotated/receive annotations.
 * Should not be used on its own.
 */
type IAnnotationList = {
  annotations: {
    [id: string]: IAnnotation | IDocument;
  };
};

/**
 * Database model of an entity.
 *
 * An entity is what a user creates during the upload process and contains
 * information about the files uploaded as well as a reference to the
 * digital entity described/connected to the uploaded entity.
 *
 * Makes use of IWhitelist and IAnnotationList.
 */
export type IEntity = IWhitelist &
  IAnnotationList &
  IDocument & {
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
  };

/**
 * Database model of a compilation.
 *
 * A compilation contains a list of entities aswell as information on
 * who created the compilation.
 *
 * Makes use of IWhitelist and IAnnotationList.
 */
export type ICompilation = IWhitelist &
  IAnnotationList &
  IDocument & {
    name: string;
    description: string;
    creator: IStrippedUserData;
    password?: string | boolean;
    entities: {
      [id: string]: IEntity | IDocument;
    };
  };

export type ISizedEvent = {
  width: number;
  height: number;
};
