import type {
  IAddress,
  IAnnotation,
  ICompilation,
  IContact,
  IDigitalEntity,
  IDocument,
  IEntity,
  IEntitySettings,
  IInstitution,
  IPerson,
  IPhysicalEntity,
  IPublicProfile,
  IUserDataWithoutData,
  IUserData,
  ITag,
  IPersonResolved,
} from './schemas';

const checkProps = (props: string[], obj: unknown) => {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return false;
  for (const prop of props) {
    // Explicit == as undefined == null is true, so this checks for both undefined and null
    if (!Object.hasOwn(obj, prop) || (obj as Record<string, unknown>)[prop] == null) {
      return false;
    }
  }
  return true;
};

/**
 * Checks whether a from the server returned document is equal to another.
 * While strings might be equal, they are not documents.
 * @param a - The first document to compare.
 * @param b - The second document to compare.
 * @returns True if the documents are equal and are documents, false otherwise.
 */
export const areDocumentsEqual = (a: string | IDocument | null, b: string | IDocument | null) => {
  if (typeof a === 'string' || typeof b === 'string') return false;
  if (a === null || b === null) return false;
  if (a._id !== b._id) return false;
  return true;
};

/**
 * Checks whether a document received from the backend is still unresolved
 * @type {Boolean}
 */
export const isUnresolved = (obj: unknown): obj is IDocument => {
  if (typeof obj !== 'object' || obj === null) return false;
  return Object.keys(obj).length === 1 && '_id' in obj;
};

export const isDocument = (obj: unknown): obj is IDocument =>
  typeof obj === 'object' && obj !== null && '_id' in obj;

/**
 * Checks whether an object has extensions
 * @param obj
 * @returns
 */
export const hasExtensions = (obj: unknown): obj is { extensions: Record<string, unknown> } =>
  checkProps(['extensions'], obj);

/**
 * Checks whether an object is a tag entry
 * @type {Boolean}
 */
export const isTag = (obj: unknown): obj is ITag => checkProps(TAG_PROPS, obj);
const TAG_PROPS = ['value'];

/**
 * Checks whether an object is a digital/physical entity
 * @type {Boolean}
 */
export const isMetadataEntity = (obj: unknown): obj is IDigitalEntity | IPhysicalEntity =>
  checkProps(META_ENTITY_PROPS, obj);
const META_ENTITY_PROPS = ['title', 'description', 'persons', 'institutions'];

/**
 * Checks whether an object is a compilation
 * @type {Boolean}
 */
export const isCompilation = (obj: unknown): obj is ICompilation => checkProps(COMP_PROPS, obj);
const COMP_PROPS = ['entities', 'name', 'description'];

export const isResolvedCompilation = (obj: unknown): obj is ICompilation => {
  if (!isCompilation(obj)) return false;
  return Object.values(obj.entities).every(isResolvedEntity);
};

/**
 * Checks whether an object is an entity
 * @type {Boolean}
 */
export const isEntity = (obj: unknown): obj is IEntity => checkProps(ENTITY_PROPS, obj);
const ENTITY_PROPS = ['name', 'mediaType', 'online', 'finished'];

/**
 *
 */
export const isEntitySettings = (obj: unknown): obj is IEntitySettings =>
  checkProps(ENTITY_SETTINGS_PROPS, obj);
const ENTITY_SETTINGS_PROPS = ['preview', 'cameraPositionInitial', 'background', 'lights'];

/**
 * Checks whether an <IEntity | IDocument> is fully resolved
 * @type {Boolean}
 */
export const isResolvedEntity = (
  obj: unknown,
): obj is IEntity & { relatedDigitalEntity: IDigitalEntity } =>
  isEntity(obj) && isDigitalEntity(obj.relatedDigitalEntity);

/**
 * Checks whether an object is an annotation
 * @type {Boolean}
 */
export const isAnnotation = (obj: unknown): obj is IAnnotation => checkProps(ANNO_PROPS, obj);
const ANNO_PROPS = ['body', 'target'];

/**
 * Checks whether an object is a digital entity
 * @type {Boolean}
 */
export const isDigitalEntity = (obj: unknown): obj is IDigitalEntity =>
  isMetadataEntity(obj) && checkProps(DIG_ENTITY_PROPS, obj);
const DIG_ENTITY_PROPS = ['type', 'licence'];

export const isResolvedDigitalEntity = (obj: unknown): obj is IDigitalEntity => {
  if (!isDigitalEntity(obj)) return false;
  return (
    Object.values(obj.persons).flat().every(isResolvedPerson) &&
    Object.values(obj.institutions).flat().every(isResolvedInstitution)
  );
};

/**
 * Checks whether an object is a physical entity
 * @type {Boolean}
 */
export const isPhysicalEntity = (obj: unknown): obj is IPhysicalEntity =>
  isMetadataEntity(obj) && checkProps(PHY_ENTITY_PROPS, obj);
const PHY_ENTITY_PROPS = ['place', 'collection'];

export const isResolvedPhysicalEntity = (obj: unknown): obj is IPhysicalEntity => {
  if (!isPhysicalEntity(obj)) return false;
  return (
    Object.values(obj.persons).flat().every(isResolvedPerson) &&
    Object.values(obj.institutions).flat().every(isResolvedInstitution)
  );
};

/**
 * Checks whether an object is a person
 * @type {Boolean}
 */
export const isPerson = (obj: unknown): obj is IPerson => checkProps(PERSON_PROPS, obj);
const PERSON_PROPS = ['prename', 'name'];

export const isResolvedPerson = (obj: unknown): obj is IPersonResolved => {
  if (!isPerson(obj)) return false;
  return (
    Object.values(obj.contact_references).every(isContact) &&
    Object.values(obj.institutions).flat().every(isInstitution)
  );
};

/**
 * Checks whether an object is an institution
 * @type {Boolean}
 */
export const isInstitution = (obj: unknown): obj is IInstitution => checkProps(INST_PROPS, obj);
const INST_PROPS = ['name', 'addresses'];

export const isResolvedInstitution = (obj: unknown): obj is IInstitution => {
  if (!isInstitution(obj)) return false;
  return Object.values(obj.addresses).every(isAddress);
};

/**
 * Checks whether an object is an address
 * @type {Boolean}
 */
export const isAddress = (obj: unknown): obj is IAddress => checkProps(ADDR_PROPS, obj);
const ADDR_PROPS = ['building', 'city', 'country', 'number', 'postcode', 'street'];

/**
 * Checks whether an object is a contact reference
 * @type {Boolean}
 */
export const isContact = (obj: unknown): obj is IContact => checkProps(CONTACT_PROPS, obj);
const CONTACT_PROPS = ['mail', 'note', 'phonenumber'];

/**
 * Checks whether an object is a user data entry
 * @type {Boolean}
 */
export const isUserData = (obj: unknown): obj is IUserData => checkProps(USER_DATA_PROPS, obj);
const USER_DATA_PROPS = ['_id', 'username', 'mail', 'role', 'data'];

/**
 * Checks whether an object is a user data entry without the data field
 * @type {Boolean}
 */
export const isUserDataWithoutData = (obj: unknown): obj is IUserDataWithoutData =>
  checkProps(USER_DATA_WITHOUT_DATA_PROPS, obj);
const USER_DATA_WITHOUT_DATA_PROPS = ['_id', 'username', 'mail', 'role'];

export const isPublicProfile = (obj: unknown): obj is IPublicProfile => {
  if (!obj || obj === null) return false;
  if (typeof obj !== 'object') return false;
  if (Array.isArray(obj)) return false;
  const profile = obj as Record<string, unknown>;
  return (
    'imageUrl' in profile &&
    'description' in profile &&
    'displayName' in profile &&
    'location' in profile &&
    'socials' in profile &&
    'website' in (profile['socials'] as Record<string, unknown>)
  );
};
