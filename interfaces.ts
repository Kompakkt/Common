import { ObjectId } from 'bson';

export { ObjectId };

// Enums
export enum EUserRank {
  user = 'user',
  uploadrequested = 'uploadrequested',
  uploader = 'uploader',
  admin = 'admin',
}

export enum Collection {
  Person = 'person',
  Institution = 'institution',
  DigitalEntity = 'digitalentity',
  Tag = 'tag',
  Entity = 'entity',
  Compilation = 'compilation',
  Group = 'group',
}

export enum Command {
  locateReference,
  pushEntry,
}

export enum License {
  BY,
  BYSA,
  BYNC,
  BYNCSA,
  BYND,
  BYNCND,
}

export enum Role {
  RIGHTSOWNER,
  CREATOR,
  EDITOR,
  DATA_CREATOR,
}

// Typeguards
/**
 * TypeGuard: Checks whether an <IEntity | IDocument> is fully resolved
 * @type {Boolean}
 */
export const isResolved = (obj: any): obj is IEntity => {
  return obj?.relatedDigitalEntity?.description !== undefined;
};

/**
 * TypeGuard: Checks whether a document received from the backend is still unresolved
 * @type {Boolean}
 */
export const isUnresolved = (obj: any): obj is IDocument => {
  return Object.keys(obj).length === 1 && obj._id !== undefined;
};

/**
 * TypeGuard: Checks whether an object is a group entry
 * @type {Boolean}
 */
export const isGroup = (obj: any): obj is IGroup => {
  return (
    obj?.name !== undefined &&
    obj?.creator !== undefined &&
    obj?.owners !== undefined &&
    obj?.members !== undefined
  );
};

/**
 * TypeGuard: Checks whether an object is a tag entry
 * @type {Boolean}
 */
export const isTag = (obj: any): obj is IMetaDataTag => {
  return obj && obj.value !== undefined;
};

/**
 * TypeGuard: Checks whether an object is a digital/physical entity
 * @type {Boolean}
 */
export const isMetadataEntity = (
  obj: any,
): obj is IMetaDataDigitalEntity | IMetaDataPhysicalEntity => {
  return (
    obj?.title !== undefined &&
    obj?.description !== undefined &&
    obj?.persons !== undefined &&
    obj?.institutions !== undefined
  );
};

/**
 * TypeGuard: Checks whether an object is a compilation
 * @type {Boolean}
 */
export const isCompilation = (obj: any): obj is ICompilation => {
  const compilation = obj as ICompilation;
  return (
    compilation?.entities !== undefined &&
    compilation?.name !== undefined &&
    compilation?.description !== undefined
  );
};

/**
 * TypeGuard: Checks whether an object is an entity
 * @type {Boolean}
 */
export const isEntity = (obj: any): obj is IEntity => {
  const entity = obj as IEntity;
  return (
    entity?.name !== undefined &&
    entity?.mediaType !== undefined &&
    entity?.online !== undefined &&
    entity?.finished !== undefined
  );
};

/**
 * TypeGuard: Checks whether an object is an annotation
 * @type {Boolean}
 */
export const isAnnotation = (obj: any): obj is IAnnotation => {
  const annotation = obj as IAnnotation;
  return annotation?.body !== undefined && annotation?.target !== undefined;
};

/**
 * TypeGuard: Checks whether an object is a digital entity
 * @type {Boolean}
 */
export const isDigitalEntity = (obj: any): obj is IMetaDataDigitalEntity => {
  const digentity = obj as IMetaDataDigitalEntity;
  return (
    isMetadataEntity(digentity) && digentity?.type !== undefined && digentity?.licence !== undefined
  );
};

/**
 * TypeGuard: Checks whether an object is a physical entity
 * @type {Boolean}
 */
export const isPhysicalEntity = (obj: any): obj is IMetaDataPhysicalEntity => {
  const phyent = obj as IMetaDataPhysicalEntity;
  return (
    isMetadataEntity(phyent) && phyent?.place !== undefined && phyent?.collection !== undefined
  );
};

/**
 * TypeGuard: Checks whether an object is a person
 * @type {Boolean}
 */
export const isPerson = (obj: any): obj is IMetaDataPerson => {
  const person = obj as IMetaDataPerson;
  return person?.prename !== undefined && person?.name !== undefined;
};

/**
 * TypeGuard: Checks whether an object is an institution
 * @type {Boolean}
 */
export const isInstitution = (obj: any): obj is IMetaDataInstitution => {
  const inst = obj as IMetaDataInstitution;
  return inst?.name !== undefined && inst?.addresses !== undefined;
};

// Interfaces
// Metadata related
export interface IDocument {
  _id: string | ObjectId;
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
  address: IMetaDataAddress;
}

export interface IMetaDataAddress extends IDocument {
  building: string;
  number: string;
  street: string;
  postcode: string;
  city: string;
  country: string;

  // Internal & only used to sort addresses
  creation_date: number;
}

export interface IMetaDataContactReference extends IDocument {
  mail: string;
  phonenumber: string;
  note: string;

  // Internal & only used to sort contact references
  creation_date: number;
}

/**
 * Key is always the _id of an entity
 * Value is whatever data is connected to the entity described by key
 */
export interface IRelatedMap<T> {
  [relatedEntityId: string]: T;
}

export interface IMetaDataPerson extends IDocument {
  prename: string;
  name: string;

  // relatedEntityId refers to the _id
  // of the digital or physical entity
  // a person refers to
  roles: IRelatedMap<string[]>;
  institutions: IRelatedMap<Array<IMetaDataInstitution | IDocument>>;
  contact_references: IRelatedMap<IMetaDataContactReference | IDocument>;
}

export interface IMetaDataInstitution extends IDocument {
  name: string;
  university: string;

  // relatedEntityId refers to the _id
  // of the digital or physical entity
  // a person refers to
  roles: IRelatedMap<string[]>;
  notes: IRelatedMap<string>;
  addresses: IRelatedMap<IMetaDataAddress | IDocument>;
}

export interface IMetaDataTag extends IDocument {
  value: string;
}

export interface IMetaDataBaseEntity extends IDocument {
  title: string;
  description: string;

  externalId: ITypeValueTuple[];
  externalLink: IDescriptionValueTuple[];
  biblioRefs: IDescriptionValueTuple[];
  other: IDescriptionValueTuple[];

  persons: IMetaDataPerson[];
  institutions: IMetaDataInstitution[];

  metadata_files: IFile[];
}

export interface IMetaDataPhysicalEntity extends IMetaDataBaseEntity {
  place: IPlaceTuple;
  collection: string;
}

export interface IMetaDataDigitalEntity extends IMetaDataBaseEntity {
  type: string;
  licence: string;

  discipline: string[];
  tags: IMetaDataTag[];

  dimensions: IDimensionTuple[];
  creation: ICreationTuple[];
  files: IFile[];

  statement: string;
  objecttype: string;

  phyObjs: IMetaDataPhysicalEntity[];
}

// User related
export interface IStrippedUserData extends IDocument {
  fullname: string;
  username: string;
}

export interface ILoginData {
  username: string;
  password: string;
  isCached: boolean;
}

export interface IUserData extends IDocument {
  username: string;
  sessionID: string;
  fullname: string;
  prename: string;
  surname: string;
  mail: string;

  role: EUserRank;

  data: {
    [key: string]: Array<string | null | any | ObjectId>;
  };
}

export interface IGroup extends IDocument {
  name: string;
  creator: IStrippedUserData;
  owners: IStrippedUserData[];
  members: IStrippedUserData[];
}

// Annotation related
export interface IAnnotation extends IDocument {
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

  body: IBody;
  target: ITarget;
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
  position: IVector;
  target: IVector;
  preview: string;
}

export interface IVector {
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
  referencePoint: IVector;
  referenceNormal: IVector;
}

// Entity related
export interface IFile {
  file_name: string;
  file_link: string;
  file_size: number;
  file_format: string;
}

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
}

export interface IEntityLight {
  type: string;
  position: IPosition;
  intensity: number;
}

interface IAnnotationList {
  annotations: {
    [id: string]: IAnnotation | IDocument;
  };
}

export interface IEntity extends IWhitelist, IAnnotationList, IDocument {
  name: string;

  files: IFile[];

  relatedDigitalEntity: IDocument | IMetaDataDigitalEntity;

  creator?: ICreator;

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
}

export interface ICreator extends IDocument {
  username: string;
  fullname: string;
}

export interface ICompilation extends IWhitelist, IAnnotationList, IDocument {
  name: string;
  description: string;
  creator?: ICreator;
  password?: string | boolean;
  entities: {
    [id: string]: IEntity | IDocument;
  };
}

// Socket related
export interface ISocketAnnotation {
  annotation: any;
  user: ISocketUser;
}

export interface ISocketMessage {
  message: string;
  user: ISocketUser;
}

export interface ISocketUser extends IDocument {
  socketId: string;
  username: string;
  fullname: string;
  room: string;
}

export interface ISocketUserInfo {
  user: ISocketUser;
  annotations: any[];
}

export interface ISocketChangeRoom {
  newRoom: string;
  annotations: any[];
}

export interface ISocketChangeRanking {
  user: ISocketUser;
  oldRanking: any[];
  newRanking: any[];
}

export interface ISocketRoomData {
  requester: ISocketUserInfo;
  recipient: string;
  info: ISocketUserInfo;
}

export interface ISizedEvent {
  width: number;
  height: number;
}

export type IAddress = IMetaDataAddress;
export type IContactReference = IMetaDataContactReference;
export type IContact = IMetaDataContactReference;
export type IPerson = IMetaDataPerson;
export type IInstitution = IMetaDataInstitution;
export type ITag = IMetaDataTag;
export type IBaseEntity = IMetaDataBaseEntity;
export type IPhysicalEntity = IMetaDataPhysicalEntity;
export type IDigitalEntity = IMetaDataDigitalEntity;
