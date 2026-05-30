import { t, UnwrapSchema } from 'elysia';

// # Enums
// These don't need to use UnwrapSchema, as they're real enums are generated using the `generate-enums.ts` script.

export const UserRankEnumSchema = t.UnionEnum(['uploader', 'admin']);
export const CollectionEnumSchema = t.UnionEnum([
  'address',
  'annotation',
  'compilation',
  'contact',
  'digitalentity',
  'entity',
  'institution',
  'person',
  'physicalentity',
  'tag',
]);

export const EntityAccessRoleEnumSchema = t.UnionEnum(['owner', 'editor', 'viewer']);
export const ProfileTypeEnumSchema = t.UnionEnum(['user', 'organization']);

export const IDocument = t.Object({
  _id: t.String(),
});
export type IDocument = UnwrapSchema<typeof IDocument>;

export const ISortable = t.Object({
  __hits: t.Number(),
  __createdAt: t.Number(),
  __annotationCount: t.Number(),
  __normalizedName: t.String(),
});
export type ISortable = UnwrapSchema<typeof ISortable>;

export const IFilterable = t.Object({
  __licenses: t.Array(t.String()),
  __mediaTypes: t.Array(t.String()),
  __downloadable: t.Boolean(),
});
export type IFilterable = UnwrapSchema<typeof IFilterable>;

export const ITypeValueTuple = t.Object({
  type: t.String(),
  value: t.String(),
});
export type ITypeValueTuple = UnwrapSchema<typeof ITypeValueTuple>;

export const IDimensionTuple = t.Object({
  type: t.String(),
  value: t.String(),
  name: t.String(),
});
export type IDimensionTuple = UnwrapSchema<typeof IDimensionTuple>;

export const ICreationTuple = t.Object({
  technique: t.String(),
  program: t.String(),
  equipment: t.String(),
  date: t.String(),
});
export type ICreationTuple = UnwrapSchema<typeof ICreationTuple>;

export const IDescriptionValueTuple = t.Object({
  description: t.String(),
  value: t.String(),
});
export type IDescriptionValueTuple = UnwrapSchema<typeof IDescriptionValueTuple>;

export const DataTuple = t.Union([
  ITypeValueTuple,
  IDimensionTuple,
  ICreationTuple,
  IDescriptionValueTuple,
]);
export type DataTuple = UnwrapSchema<typeof DataTuple>;

export const IAddress = t.Object({
  _id: t.String(),
  building: t.String(),
  number: t.String(),
  street: t.String(),
  postcode: t.String(),
  city: t.String(),
  country: t.String(),
  creation_date: t.Number(),
});
export type IAddress = UnwrapSchema<typeof IAddress>;

export const IContact = t.Object({
  _id: t.String(),
  mail: t.String(),
  phonenumber: t.String(),
  note: t.String(),
  creation_date: t.Number(),
});
export type IContact = UnwrapSchema<typeof IContact>;

export const ITag = t.Object({
  _id: t.String(),
  value: t.String(),
});
export type ITag = UnwrapSchema<typeof ITag>;

export const IStrippedUserData = t.Object({
  _id: t.String(),
  fullname: t.String(),
  username: t.String(),
});
export type IStrippedUserData = UnwrapSchema<typeof IStrippedUserData>;

export const ProfileReference = t.Object({
  profileId: t.String(),
  type: ProfileTypeEnumSchema,
});
export type ProfileReference = UnwrapSchema<typeof ProfileReference>;

export const AccessFieldEntry = t.Intersect([
  IStrippedUserData,
  t.Object({
    role: EntityAccessRoleEnumSchema,
    profile: ProfileReference,
  }),
]);
export type AccessFieldEntry = UnwrapSchema<typeof AccessFieldEntry>;

export const AccessField = t.Array(AccessFieldEntry);
export type AccessField = UnwrapSchema<typeof AccessField>;

export const CreatorField = t.Intersect([
  IStrippedUserData,
  t.Object({
    profile: ProfileReference,
  }),
]);
export type CreatorField = UnwrapSchema<typeof CreatorField>;

export const IVector3 = t.Object({
  x: t.Number(),
  y: t.Number(),
  z: t.Number(),
});
export type IVector3 = UnwrapSchema<typeof IVector3>;

export const IAmbiguousVector3 = t.Union([
  IVector3,
  t.Object({
    _x: t.Number(),
    _y: t.Number(),
    _z: t.Number(),
  }),
]);
export type IAmbiguousVector3 = UnwrapSchema<typeof IAmbiguousVector3>;

export const IFile = t.Object({
  file_name: t.String(),
  file_link: t.String(),
  file_size: t.Number(),
  file_format: t.String(),
});
export type IFile = UnwrapSchema<typeof IFile>;

export const IColor = t.Object({
  r: t.Number(),
  b: t.Number(),
  g: t.Number(),
  a: t.Number(),
});
export type IColor = UnwrapSchema<typeof IColor>;

export const IPosition = t.Object({
  x: t.Number(),
  y: t.Number(),
  z: t.Number(),
});
export type IPosition = UnwrapSchema<typeof IPosition>;

export const IEntityLight = t.Object({
  type: t.String(),
  position: IPosition,
  intensity: t.Number(),
});
export type IEntityLight = UnwrapSchema<typeof IEntityLight>;

export const IEntitySettings = t.Object({
  position: t.Optional(IPosition),
  preview: t.String(),
  previewVideo: t.Optional(t.String()),
  cameraPositionInitial: t.Object({
    position: IPosition,
    target: IPosition,
  }),
  background: t.Object({
    color: IColor,
    effect: t.Boolean(),
  }),
  lights: t.Array(IEntityLight),
  rotation: IPosition,
  scale: IPosition,
  translate: t.Optional(IPosition),
});
export type IEntitySettings = UnwrapSchema<typeof IEntitySettings>;

export const IAgent = t.Object({
  _id: t.String(),
  type: t.String(),
  name: t.String(),
  homepage: t.Optional(t.String()),
});
export type IAgent = UnwrapSchema<typeof IAgent>;

export const ICameraPerspective = t.Object({
  cameraType: t.String(),
  position: IAmbiguousVector3,
  target: IAmbiguousVector3,
  preview: t.String(),
});
export type ICameraPerspective = UnwrapSchema<typeof ICameraPerspective>;

export const IContent = t.Object(
  {
    type: t.String(),
    title: t.String(),
    description: t.String(),
    link: t.Optional(t.String()),
    relatedPerspective: ICameraPerspective,
  },
  { additionalProperties: true },
);
export type IContent = UnwrapSchema<typeof IContent>;

export const IBody = t.Object({
  type: t.String(),
  content: IContent,
});
export type IBody = UnwrapSchema<typeof IBody>;

export const ISource = t.Object({
  link: t.Optional(t.String()),
  relatedEntity: t.String(),
  relatedCompilation: t.Optional(t.String()),
});
export type ISource = UnwrapSchema<typeof ISource>;

export const ISelector = t.Object({
  referencePoint: IAmbiguousVector3,
  referenceNormal: IAmbiguousVector3,
});
export type ISelector = UnwrapSchema<typeof ISelector>;

export const ITarget = t.Object({
  source: ISource,
  selector: ISelector,
});
export type ITarget = UnwrapSchema<typeof ITarget>;

export const IAnnotation = t.Object({
  _id: t.String(),
  validated: t.Boolean(),
  identifier: t.String(),
  ranking: t.Number(),
  creator: IAgent,
  created: t.String(),
  generator: IAgent,
  generated: t.Optional(t.String()),
  motivation: t.String(),
  lastModificationDate: t.Optional(t.String()),
  lastModifiedBy: IAgent,
  positionXOnView: t.Optional(t.Number()),
  positionYOnView: t.Optional(t.Number()),
  body: IBody,
  target: ITarget,
  extensions: t.Optional(t.Record(t.String(), t.Any())),
});
export type IAnnotation = UnwrapSchema<typeof IAnnotation>;

export const IWhitelist = t.Object({
  whitelist: t.Object({
    enabled: t.Boolean(),
    persons: t.Array(IStrippedUserData),
  }),
});
export type IWhitelist = UnwrapSchema<typeof IWhitelist>;

export const ISizedEvent = t.Object({
  width: t.Number(),
  height: t.Number(),
});
export type ISizedEvent = UnwrapSchema<typeof ISizedEvent>;

export const IPlaceTuple = t.Object({
  name: t.String(),
  geopolarea: t.String(),
  address: IAddress,
});
export type IPlaceTuple = UnwrapSchema<typeof IPlaceTuple>;

export const IInstitution = t.Object({
  _id: t.String(),
  name: t.String(),
  university: t.String(),
  roles: t.Record(t.String(), t.Array(t.String())),
  notes: t.Record(t.String(), t.String()),
  addresses: t.Record(t.String(), t.Union([IAddress, IDocument])),
});
export type IInstitution = UnwrapSchema<typeof IInstitution>;

export const IInstitutionResolved = t.Intersect([
  t.Omit(IInstitution, ['addresses']),
  t.Object({
    addresses: t.Record(t.String(), IAddress),
  }),
]);
export type IInstitutionResolved = UnwrapSchema<typeof IInstitutionResolved>;

export const IPerson = t.Object({
  _id: t.String(),
  prename: t.String(),
  name: t.String(),
  roles: t.Record(t.String(), t.Array(t.String())),
  institutions: t.Record(t.String(), t.Array(t.Union([IInstitution, IDocument]))),
  contact_references: t.Record(t.String(), t.Union([IContact, IDocument])),
});
export type IPerson = UnwrapSchema<typeof IPerson>;

export const IPersonResolved = t.Intersect([
  t.Omit(IPerson, ['institutions', 'contact_references']),
  t.Object({
    institutions: t.Record(t.String(), t.Array(IInstitution)),
    contact_references: t.Record(t.String(), t.Array(IContact)),
  }),
]);
export type IPersonResolved = UnwrapSchema<typeof IPersonResolved>;

export const IBaseEntity = t.Object({
  _id: t.String(),
  title: t.String(),
  description: t.String(),
  externalId: t.Array(ITypeValueTuple),
  externalLink: t.Array(IDescriptionValueTuple),
  biblioRefs: t.Array(IDescriptionValueTuple),
  other: t.Array(IDescriptionValueTuple),
  persons: t.Array(t.Union([IDocument, t.String(), IPerson])),
  institutions: t.Array(t.Union([IInstitution, IDocument, t.String()])),
  metadata_files: t.Array(IFile),
  extensions: t.Optional(t.Record(t.String(), t.Any())),
});
export type IBaseEntity = UnwrapSchema<typeof IBaseEntity>;

export const IBaseEntityResolved = t.Intersect([
  t.Omit(IBaseEntity, ['persons', 'institutions']),
  t.Object({
    persons: t.Array(IPersonResolved),
    institutions: t.Array(IInstitutionResolved),
  }),
]);
export type IBaseEntityResolved = UnwrapSchema<typeof IBaseEntityResolved>;

export const IPhysicalEntity = t.Intersect([
  IBaseEntity,
  t.Object({
    place: IPlaceTuple,
    collection: t.String(),
    dimensions: t.Array(IDimensionTuple),
  }),
]);
export type IPhysicalEntity = UnwrapSchema<typeof IPhysicalEntity>;

export const IPhysicalEntityResolved = t.Intersect([
  t.Omit(IPhysicalEntity, ['persons', 'institutions']),
  t.Pick(IBaseEntityResolved, ['persons', 'institutions']),
]);
export type IPhysicalEntityResolved = UnwrapSchema<typeof IPhysicalEntityResolved>;

export const IDigitalEntity = t.Intersect([
  IBaseEntity,
  t.Object({
    type: t.String(),
    licence: t.String(),
    discipline: t.Array(t.String()),
    tags: t.Array(t.Union([IDocument, ITag])),
    dimensions: t.Array(IDimensionTuple),
    creation: t.Array(ICreationTuple),
    files: t.Array(IFile),
    statement: t.String(),
    objecttype: t.String(),
    phyObjs: t.Array(t.Union([IDocument, IPhysicalEntity])),
  }),
]);
export type IDigitalEntity = UnwrapSchema<typeof IDigitalEntity>;

export const IDigitalEntityResolved = t.Intersect([
  t.Omit(IDigitalEntity, ['persons', 'institutions', 'tags', 'phyObjs']),
  t.Pick(IBaseEntityResolved, ['persons', 'institutions']),
  t.Object({
    tags: t.Array(ITag),
    phyObjs: t.Array(IPhysicalEntityResolved),
  }),
]);
export type IDigitalEntityResolved = UnwrapSchema<typeof IDigitalEntityResolved>;

export const IAnnotationList = t.Object({
  annotations: t.Record(t.String(), t.Union([IAnnotation, IDocument])),
});
export type IAnnotationList = UnwrapSchema<typeof IAnnotationList>;

export const IAnnotationListResolved = t.Object({
  annotations: t.Record(t.String(), IAnnotation),
});
export type IAnnotationListResolved = UnwrapSchema<typeof IAnnotationListResolved>;

const IEntityPartialSortable = t.Object({
  __hits: t.Optional(t.Number()),
  __createdAt: t.Optional(t.Number()),
  __annotationCount: t.Optional(t.Number()),
  __normalizedName: t.Optional(t.String()),
});

const IEntityPartialFilterable = t.Object({
  __licenses: t.Optional(t.Array(t.String())),
  __mediaTypes: t.Optional(t.Array(t.String())),
  __downloadable: t.Optional(t.Boolean()),
});

export const IEntity = t.Intersect([
  IAnnotationList,
  IEntityPartialSortable,
  IEntityPartialFilterable,
  IDocument,
  t.Object({
    name: t.String(),
    files: t.Array(IFile),
    externalFile: t.Optional(t.String()),
    relatedDigitalEntity: t.Union([IDocument, IDigitalEntity]),
    creator: CreatorField,
    online: t.Boolean(),
    finished: t.Boolean(),
    mediaType: t.String(),
    dataSource: t.Object({
      isExternal: t.Boolean(),
      service: t.String(),
    }),
    processed: t.Object({
      low: t.String(),
      medium: t.String(),
      high: t.String(),
      raw: t.String(),
    }),
    settings: IEntitySettings,
    extensions: t.Optional(t.Record(t.String(), t.Any())),
    access: AccessField,
    options: t.Optional(
      t.Object({
        allowDownload: t.Optional(t.Boolean()),
      }),
    ),
  }),
]);
export type IEntity = UnwrapSchema<typeof IEntity>;

export const IEntityResolved = t.Intersect([
  t.Omit(IEntity, ['relatedDigitalEntity']),
  t.Object({ relatedDigitalEntity: IDigitalEntityResolved }),
]);
export type IEntityResolved = UnwrapSchema<typeof IEntityResolved>;

export const ICompilation = t.Intersect([
  IAnnotationList,
  IEntityPartialSortable,
  IEntityPartialFilterable,
  IDocument,
  t.Object({
    name: t.String(),
    description: t.String(),
    creator: CreatorField,
    entities: t.Record(t.String(), t.Union([IDocument, IEntity])),
    access: AccessField,
    online: t.Optional(t.Boolean()),
    password: t.Optional(t.Union([t.String(), t.Boolean()])),
  }),
]);
export type ICompilation = UnwrapSchema<typeof ICompilation>;

export const ICompilationResolved = t.Intersect([
  t.Omit(ICompilation, ['entities', 'annotations']),
  t.Object({
    annotations: IAnnotationListResolved,
    entities: t.Record(t.String(), IEntity),
  }),
]);
export type ICompilationResolved = UnwrapSchema<typeof ICompilationResolved>;

export const IUserData = t.Object({
  _id: t.String(),
  username: t.String(),
  fullname: t.String(),
  prename: t.String(),
  surname: t.String(),
  mail: t.String(),
  role: UserRankEnumSchema,
  strategy: t.String(),
  sessionID: t.Optional(t.String()),
  data: t.Object({
    [CollectionEnumSchema.address]: t.Optional(
      t.Array(t.Union([IAddress, IDocument, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.annotation]: t.Optional(
      t.Array(t.Union([IAnnotation, IDocument, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.compilation]: t.Optional(
      t.Array(t.Union([ICompilation, IDocument, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.contact]: t.Optional(
      t.Array(t.Union([IContact, IDocument, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.digitalentity]: t.Optional(
      t.Array(t.Union([IDigitalEntity, IDocument, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.entity]: t.Optional(t.Array(t.Union([IDocument, t.String(), t.Null()]))),
    [CollectionEnumSchema.institution]: t.Optional(
      t.Array(t.Union([IInstitution, IDocument, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.person]: t.Optional(
      t.Array(t.Union([IPerson, IDocument, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.physicalentity]: t.Optional(
      t.Array(t.Union([IPhysicalEntity, IDocument, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.tag]: t.Optional(
      t.Array(t.Union([ITag, IDocument, t.String(), t.Null()])),
    ),
  }),
  profiles: t.Array(
    t.Object({
      type: ProfileTypeEnumSchema,
      profileId: t.String(),
    }),
  ),
});
export type IUserData = UnwrapSchema<typeof IUserData>;

export const IUserDataWithoutData = t.Omit(IUserData, ['data']);
export type IUserDataWithoutData = UnwrapSchema<typeof IUserDataWithoutData>;

export const IPublicProfile = t.Intersect([
  t.Object({
    _id: t.String(),
    type: ProfileTypeEnumSchema,
    imageUrl: t.Optional(t.String()),
    description: t.Optional(t.String()),
    displayName: t.Optional(t.String()),
    location: t.Optional(t.String()),
    socials: t.Object(
      {
        website: t.Optional(t.String()),
      },
      { additionalProperties: t.Optional(t.String()) },
    ),
  }),
  t.Object({
    __hits: t.Optional(t.Number()),
    __createdAt: t.Optional(t.Number()),
    __annotationCount: t.Optional(t.Number()),
    __normalizedName: t.Optional(t.String()),
    __licenses: t.Optional(t.Array(t.String())),
    __mediaTypes: t.Optional(t.Array(t.String())),
    __downloadable: t.Optional(t.Boolean()),
  }),
]);
export type IPublicProfile = UnwrapSchema<typeof IPublicProfile>;
