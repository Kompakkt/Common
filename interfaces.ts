import { Collection } from './enums';

import type {
  IAddress,
  IAnnotation,
  ICompilation,
  IContact,
  ICreationTuple,
  IDescriptionValueTuple,
  IDigitalEntity,
  IDimensionTuple,
  IDocument,
  IEntity,
  IInstitution,
  IPerson,
  IPhysicalEntity,
  ITag,
  IUserData,
  ITypeValueTuple,
} from './schemas';

export type IUserDataWithoutData = Omit<IUserData, 'data'>;

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
