import { Collection } from './enums';

import type {
  IAddress,
  IAnnotation,
  ICompilation,
  IContact,
  IDigitalEntity,
  IDocument,
  IEntity,
  IInstitution,
  IPerson,
  IPhysicalEntity,
  ITag,
} from './schemas';

export type UserDataCollectionDocumentType<C extends Collection> =
  C extends (typeof Collection)['address']
    ? IAddress
    : C extends (typeof Collection)['annotation']
      ? IAnnotation
      : C extends (typeof Collection)['compilation']
        ? ICompilation
        : C extends (typeof Collection)['contact']
          ? IContact
          : C extends (typeof Collection)['digitalentity']
            ? IDigitalEntity
            : C extends (typeof Collection)['entity']
              ? IEntity
              : C extends (typeof Collection)['institution']
                ? IInstitution
                : C extends (typeof Collection)['person']
                  ? IPerson
                  : C extends (typeof Collection)['physicalentity']
                    ? IPhysicalEntity
                    : C extends (typeof Collection)['tag']
                      ? ITag
                      : IDocument;
