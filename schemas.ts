import { t, type UnwrapSchema } from 'elysia';

// # Enums
// These don't need to use UnwrapSchema, as they're real enums are generated using the `generate-enums.ts` script.

export const UserRankEnumSchema = t.UnionEnum(['uploader', 'admin'], {
  description: 'Defines the rank of a user, which can be either "uploader" or "admin".',
  default: 'uploader',
});
export const CollectionEnumSchema = t.UnionEnum(
  [
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
  ],
  {
    description: 'Defines the different database collections.',
  },
);

export const EntityAccessRoleEnumSchema = t.UnionEnum(['owner', 'editor', 'viewer'], {
  description:
    'Defines the access role for e.g. objects (internally entities) or collections (internally compilations), which can be "owner", "editor", or "viewer".',
});
export const ProfileTypeEnumSchema = t.UnionEnum(['user', 'organization'], {
  description: 'Defines the type of a profile, which can be either "user" or "organization".',
});

export const IDocumentSchema = t.Object(
  {
    _id: t.String(),
  },
  {
    description:
      'A reference to a document in the database, containing only the _id field. Provided as bson by MongoDB',
  },
);
export type IDocument = UnwrapSchema<typeof IDocumentSchema>;

export const ISortableSchema = t.Object({
  __hits: t.Number({
    description:
      'Number of search hits for this item, used for sorting by relevance. Not indicative of unique hits, as the value decreases overtime for weighting relevant items.',
  }),
  __createdAt: t.Number({
    description: 'Creation timestamp of the item, used for sorting by creation date.',
  }),
  __annotationCount: t.Number({
    description:
      'Number of annotations associated with the item, used for sorting by annotation count.',
  }),
  __normalizedName: t.String({
    description: 'Normalized name of the item, used for sorting by name.',
  }),
});
export type ISortable = UnwrapSchema<typeof ISortableSchema>;

export const IFilterableSchema = t.Object({
  __licenses: t.Array(t.String(), {
    description: 'List of licenses associated with the item, used for filtering by license.',
  }),
  __mediaTypes: t.Array(t.String(), {
    description: 'List of media types associated with the item, used for filtering by media type.',
  }),
  __downloadable: t.Boolean({
    description:
      'Indicates whether the item is downloadable, used for filtering by downloadability.',
  }),
});
export type IFilterable = UnwrapSchema<typeof IFilterableSchema>;

export const ITypeValueTupleSchema = t.Object(
  {
    type: t.String(),
    value: t.String(),
  },
  {
    description: 'Generic type for any metadata saved as a type-value pair',
  },
);
export type ITypeValueTuple = UnwrapSchema<typeof ITypeValueTupleSchema>;

export const IDimensionTupleSchema = t.Object({
  type: t.String(),
  value: t.String(),
  name: t.String(),
});
export type IDimensionTuple = UnwrapSchema<typeof IDimensionTupleSchema>;

export const ICreationTupleSchema = t.Object({
  technique: t.String(),
  program: t.String(),
  equipment: t.String(),
  date: t.String(),
});
export type ICreationTuple = UnwrapSchema<typeof ICreationTupleSchema>;

export const IDescriptionValueTupleSchema = t.Object({
  description: t.String(),
  value: t.String(),
});
export type IDescriptionValueTuple = UnwrapSchema<typeof IDescriptionValueTupleSchema>;

export const DataTupleSchema = t.Union([
  ITypeValueTupleSchema,
  IDimensionTupleSchema,
  ICreationTupleSchema,
  IDescriptionValueTupleSchema,
]);
export type DataTuple = UnwrapSchema<typeof DataTupleSchema>;

export const IAddressSchema = t.Object({
  _id: t.String(),
  building: t.String(),
  number: t.String(),
  street: t.String(),
  postcode: t.String(),
  city: t.String(),
  country: t.String(),
  creation_date: t.Number(),
});
export type IAddress = UnwrapSchema<typeof IAddressSchema>;

export const IContactSchema = t.Object({
  _id: t.String(),
  mail: t.String(),
  phonenumber: t.String(),
  note: t.String(),
  creation_date: t.Number(),
});
export type IContact = UnwrapSchema<typeof IContactSchema>;

export const ITagSchema = t.Object({
  _id: t.String(),
  value: t.String(),
});
export type ITag = UnwrapSchema<typeof ITagSchema>;

export const IStrippedUserDataSchema = t.Object({
  _id: t.String(),
  fullname: t.String(),
  username: t.String(),
});
export type IStrippedUserData = UnwrapSchema<typeof IStrippedUserDataSchema>;

export const ProfileReferenceSchema = t.Object({
  profileId: t.String(),
  type: ProfileTypeEnumSchema,
});
export type ProfileReference = UnwrapSchema<typeof ProfileReferenceSchema>;

export const AccessFieldEntrySchema = t.Intersect([
  IStrippedUserDataSchema,
  t.Object({
    role: EntityAccessRoleEnumSchema,
    profile: ProfileReferenceSchema,
  }),
]);
export type AccessFieldEntry = UnwrapSchema<typeof AccessFieldEntrySchema>;

export const AccessFieldSchema = t.Array(AccessFieldEntrySchema);
export type AccessField = UnwrapSchema<typeof AccessFieldSchema>;

export const CreatorFieldSchema = t.Intersect([
  IStrippedUserDataSchema,
  t.Object({
    profile: ProfileReferenceSchema,
  }),
]);
export type CreatorField = UnwrapSchema<typeof CreatorFieldSchema>;

export const IVector3Schema = t.Object({
  x: t.Number(),
  y: t.Number(),
  z: t.Number(),
});
export type IVector3 = UnwrapSchema<typeof IVector3Schema>;

export const IAmbiguousVector3Schema = t.Union([
  IVector3Schema,
  t.Object({
    _x: t.Number(),
    _y: t.Number(),
    _z: t.Number(),
  }),
]);
export type IAmbiguousVector3 = UnwrapSchema<typeof IAmbiguousVector3Schema>;

export const IFileSchema = t.Object({
  file_name: t.String(),
  file_link: t.String(),
  file_size: t.Number(),
  file_format: t.String(),
});
export type IFile = UnwrapSchema<typeof IFileSchema>;

export const IColorSchema = t.Object({
  r: t.Number(),
  b: t.Number(),
  g: t.Number(),
  a: t.Number(),
});
export type IColor = UnwrapSchema<typeof IColorSchema>;

export const IPositionSchema = t.Object({
  x: t.Number(),
  y: t.Number(),
  z: t.Number(),
});
export type IPosition = UnwrapSchema<typeof IPositionSchema>;

export const IEntityLightSchema = t.Object({
  type: t.String(),
  position: IPositionSchema,
  intensity: t.Number(),
});
export type IEntityLight = UnwrapSchema<typeof IEntityLightSchema>;

export const IEntitySettingsSchema = t.Object({
  position: t.Optional(IPositionSchema),
  preview: t.String(),
  previewVideo: t.Optional(t.String()),
  cameraPositionInitial: t.Object({
    position: IPositionSchema,
    target: IPositionSchema,
  }),
  background: t.Object({
    color: IColorSchema,
    effect: t.Boolean(),
  }),
  lights: t.Array(IEntityLightSchema),
  rotation: IPositionSchema,
  scale: IPositionSchema,
  translate: t.Optional(IPositionSchema),
});
export type IEntitySettings = UnwrapSchema<typeof IEntitySettingsSchema>;

export const IAgentSchema = t.Object({
  _id: t.String(),
  type: t.String(),
  name: t.String(),
  homepage: t.Optional(t.String()),
});
export type IAgent = UnwrapSchema<typeof IAgentSchema>;

export const ICameraPerspectiveSchema = t.Object({
  cameraType: t.String(),
  position: IAmbiguousVector3Schema,
  target: IAmbiguousVector3Schema,
  preview: t.String(),
});
export type ICameraPerspective = UnwrapSchema<typeof ICameraPerspectiveSchema>;

export const IContentSchema = t.Object(
  {
    type: t.String(),
    title: t.String(),
    description: t.String(),
    link: t.Optional(t.String()),
    relatedPerspective: ICameraPerspectiveSchema,
  },
  { additionalProperties: true },
);
export type IContent = UnwrapSchema<typeof IContentSchema>;

export const IBodySchema = t.Object({
  type: t.String(),
  content: IContentSchema,
});
export type IBody = UnwrapSchema<typeof IBodySchema>;

export const ISourceSchema = t.Object({
  link: t.Optional(t.String()),
  relatedEntity: t.String(),
  relatedCompilation: t.Optional(t.String()),
});
export type ISource = UnwrapSchema<typeof ISourceSchema>;

export const ISelectorSchema = t.Object({
  referencePoint: IAmbiguousVector3Schema,
  referenceNormal: IAmbiguousVector3Schema,
});
export type ISelector = UnwrapSchema<typeof ISelectorSchema>;

export const ITargetSchema = t.Object({
  source: ISourceSchema,
  selector: ISelectorSchema,
});
export type ITarget = UnwrapSchema<typeof ITargetSchema>;

export const IAnnotationSchema = t.Object({
  _id: t.String(),
  validated: t.Boolean(),
  identifier: t.String(),
  ranking: t.Number(),
  creator: IAgentSchema,
  created: t.String(),
  generator: IAgentSchema,
  generated: t.Optional(t.String()),
  motivation: t.String(),
  lastModificationDate: t.Optional(t.String()),
  lastModifiedBy: IAgentSchema,
  positionXOnView: t.Optional(t.Number()),
  positionYOnView: t.Optional(t.Number()),
  body: IBodySchema,
  target: ITargetSchema,
  extensions: t.Optional(t.Record(t.String(), t.Any())),
});
export type IAnnotation = UnwrapSchema<typeof IAnnotationSchema>;

export const IWhitelistSchema = t.Object({
  whitelist: t.Object({
    enabled: t.Boolean(),
    persons: t.Array(IStrippedUserDataSchema),
  }),
});
export type IWhitelist = UnwrapSchema<typeof IWhitelistSchema>;

export const ISizedEventSchema = t.Object({
  width: t.Number(),
  height: t.Number(),
});
export type ISizedEvent = UnwrapSchema<typeof ISizedEventSchema>;

export const IPlaceTupleSchema = t.Object({
  name: t.String(),
  geopolarea: t.String(),
  address: IAddressSchema,
});
export type IPlaceTuple = UnwrapSchema<typeof IPlaceTupleSchema>;

export const IInstitutionSchema = t.Object({
  _id: t.String(),
  name: t.String(),
  university: t.String(),
  roles: t.Record(t.String(), t.Array(t.String())),
  notes: t.Record(t.String(), t.String()),
  addresses: t.Record(t.String(), t.Union([IAddressSchema, IDocumentSchema])),
});
export type IInstitution = UnwrapSchema<typeof IInstitutionSchema>;

export const IInstitutionResolvedSchema = t.Intersect([
  t.Omit(IInstitutionSchema, ['addresses']),
  t.Object({
    addresses: t.Record(t.String(), IAddressSchema),
  }),
]);
export type IInstitutionResolved = UnwrapSchema<typeof IInstitutionResolvedSchema>;

export const IPersonSchema = t.Object({
  _id: t.String(),
  prename: t.String(),
  name: t.String(),
  roles: t.Record(t.String(), t.Array(t.String())),
  institutions: t.Record(t.String(), t.Array(t.Union([IInstitutionSchema, IDocumentSchema]))),
  contact_references: t.Record(t.String(), t.Union([IContactSchema, IDocumentSchema])),
});
export type IPerson = UnwrapSchema<typeof IPersonSchema>;

export const IPersonResolvedSchema = t.Intersect([
  t.Omit(IPersonSchema, ['institutions', 'contact_references']),
  t.Object({
    institutions: t.Record(t.String(), t.Array(IInstitutionSchema)),
    contact_references: t.Record(t.String(), t.Array(IContactSchema)),
  }),
]);
export type IPersonResolved = UnwrapSchema<typeof IPersonResolvedSchema>;

export const IBaseEntitySchema = t.Object({
  _id: t.String(),
  title: t.String(),
  description: t.String(),
  externalId: t.Array(ITypeValueTupleSchema),
  externalLink: t.Array(IDescriptionValueTupleSchema),
  biblioRefs: t.Array(IDescriptionValueTupleSchema),
  other: t.Array(IDescriptionValueTupleSchema),
  persons: t.Array(t.Union([IDocumentSchema, t.String(), IPersonSchema])),
  institutions: t.Array(t.Union([IInstitutionSchema, IDocumentSchema, t.String()])),
  metadata_files: t.Array(IFileSchema),
  extensions: t.Optional(t.Record(t.String(), t.Any())),
});
export type IBaseEntity = UnwrapSchema<typeof IBaseEntitySchema>;

export const IBaseEntityResolvedSchema = t.Intersect([
  t.Omit(IBaseEntitySchema, ['persons', 'institutions']),
  t.Object({
    persons: t.Array(IPersonResolvedSchema),
    institutions: t.Array(IInstitutionResolvedSchema),
  }),
]);
export type IBaseEntityResolved = UnwrapSchema<typeof IBaseEntityResolvedSchema>;

export const IPhysicalEntitySchema = t.Intersect([
  IBaseEntitySchema,
  t.Object({
    place: IPlaceTupleSchema,
    collection: t.String(),
    dimensions: t.Array(IDimensionTupleSchema),
  }),
]);
export type IPhysicalEntity = UnwrapSchema<typeof IPhysicalEntitySchema>;

export const IPhysicalEntityResolvedSchema = t.Intersect([
  t.Omit(IPhysicalEntitySchema, ['persons', 'institutions']),
  t.Pick(IBaseEntityResolvedSchema, ['persons', 'institutions']),
]);
export type IPhysicalEntityResolved = UnwrapSchema<typeof IPhysicalEntityResolvedSchema>;

export const IDigitalEntitySchema = t.Intersect([
  IBaseEntitySchema,
  t.Object({
    type: t.String(),
    licence: t.String(),
    discipline: t.Array(t.String()),
    tags: t.Array(t.Union([IDocumentSchema, ITagSchema])),
    dimensions: t.Array(IDimensionTupleSchema),
    creation: t.Array(ICreationTupleSchema),
    files: t.Array(IFileSchema),
    statement: t.String(),
    objecttype: t.String(),
    phyObjs: t.Array(t.Union([IDocumentSchema, IPhysicalEntitySchema])),
  }),
]);
export type IDigitalEntity = UnwrapSchema<typeof IDigitalEntitySchema>;

export const IDigitalEntityResolvedSchema = t.Intersect([
  t.Omit(IDigitalEntitySchema, ['persons', 'institutions', 'tags', 'phyObjs']),
  t.Pick(IBaseEntityResolvedSchema, ['persons', 'institutions']),
  t.Object({
    tags: t.Array(ITagSchema),
    phyObjs: t.Array(IPhysicalEntityResolvedSchema),
  }),
]);
export type IDigitalEntityResolved = UnwrapSchema<typeof IDigitalEntityResolvedSchema>;

export const IAnnotationListSchema = t.Object({
  annotations: t.Record(t.String(), t.Union([IAnnotationSchema, IDocumentSchema])),
});
export type IAnnotationList = UnwrapSchema<typeof IAnnotationListSchema>;

export const IAnnotationListResolvedSchema = t.Object({
  annotations: t.Record(t.String(), IAnnotationSchema),
});
export type IAnnotationListResolved = UnwrapSchema<typeof IAnnotationListResolvedSchema>;

const IEntityPartialSortableSchema = t.Object({
  __hits: t.Optional(t.Number()),
  __createdAt: t.Optional(t.Number()),
  __annotationCount: t.Optional(t.Number()),
  __normalizedName: t.Optional(t.String()),
});

const IEntityPartialFilterableSchema = t.Object({
  __licenses: t.Optional(t.Array(t.String())),
  __mediaTypes: t.Optional(t.Array(t.String())),
  __downloadable: t.Optional(t.Boolean()),
});

export const IEntitySchema = t.Intersect([
  IAnnotationListSchema,
  IEntityPartialSortableSchema,
  IEntityPartialFilterableSchema,
  IDocumentSchema,
  t.Object({
    name: t.String(),
    files: t.Array(IFileSchema),
    externalFile: t.Optional(t.String()),
    relatedDigitalEntity: t.Union([IDocumentSchema, IDigitalEntitySchema]),
    creator: CreatorFieldSchema,
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
    settings: IEntitySettingsSchema,
    extensions: t.Optional(t.Record(t.String(), t.Any())),
    access: AccessFieldSchema,
    options: t.Optional(
      t.Object({
        allowDownload: t.Optional(t.Boolean()),
      }),
    ),
  }),
]);
export type IEntity = UnwrapSchema<typeof IEntitySchema>;

export const IEntityResolvedSchema = t.Intersect([
  t.Omit(IEntitySchema, ['relatedDigitalEntity']),
  t.Object({ relatedDigitalEntity: IDigitalEntityResolvedSchema }),
]);
export type IEntityResolved = UnwrapSchema<typeof IEntityResolvedSchema>;

export const IEntityResolvedOnlyDigitalEntitySchema = t.Intersect([
  t.Omit(IEntitySchema, ['relatedDigitalEntity']),
  t.Object({ relatedDigitalEntity: IDigitalEntitySchema }),
]);
export type IEntityResolvedOnlyDigitalEntity = UnwrapSchema<
  typeof IEntityResolvedOnlyDigitalEntitySchema
>;

export const ICompilationSchema = t.Intersect([
  IAnnotationListSchema,
  IEntityPartialSortableSchema,
  IEntityPartialFilterableSchema,
  IDocumentSchema,
  t.Object({
    name: t.String(),
    description: t.String(),
    creator: CreatorFieldSchema,
    entities: t.Record(t.String(), t.Union([IDocumentSchema, IEntitySchema])),
    access: AccessFieldSchema,
    online: t.Optional(t.Boolean()),
    password: t.Optional(t.Union([t.String(), t.Boolean()])),
  }),
]);
export type ICompilation = UnwrapSchema<typeof ICompilationSchema>;

export const ICompilationResolvedSchema = t.Intersect([
  t.Omit(ICompilationSchema, ['entities', 'annotations']),
  t.Object({
    annotations: IAnnotationListResolvedSchema,
    entities: t.Record(t.String(), IEntityResolvedSchema),
  }),
]);
export type ICompilationResolved = UnwrapSchema<typeof ICompilationResolvedSchema>;

export const ICompilationResolvedOnlyEntitiesSchema = t.Intersect([
  t.Omit(ICompilationSchema, ['entities', 'annotations']),
  t.Object({
    annotations: IAnnotationListSchema,
    entities: t.Record(t.String(), IEntitySchema),
  }),
]);
export type ICompilationResolvedOnlyEntities = UnwrapSchema<
  typeof ICompilationResolvedOnlyEntitiesSchema
>;

export const IUserDataSchema = t.Object({
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
    [CollectionEnumSchema.enum[0]]: t.Optional(
      t.Array(t.Union([IAddressSchema, IDocumentSchema, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.enum[1]]: t.Optional(
      t.Array(t.Union([IAnnotationSchema, IDocumentSchema, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.enum[2]]: t.Optional(
      t.Array(t.Union([ICompilationSchema, IDocumentSchema, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.enum[3]]: t.Optional(
      t.Array(t.Union([IContactSchema, IDocumentSchema, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.enum[4]]: t.Optional(
      t.Array(t.Union([IDigitalEntitySchema, IDocumentSchema, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.enum[5]]: t.Optional(
      t.Array(t.Union([IDocumentSchema, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.enum[6]]: t.Optional(
      t.Array(t.Union([IInstitutionSchema, IDocumentSchema, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.enum[7]]: t.Optional(
      t.Array(t.Union([IPersonSchema, IDocumentSchema, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.enum[8]]: t.Optional(
      t.Array(t.Union([IPhysicalEntitySchema, IDocumentSchema, t.String(), t.Null()])),
    ),
    [CollectionEnumSchema.enum[9]]: t.Optional(
      t.Array(t.Union([ITagSchema, IDocumentSchema, t.String(), t.Null()])),
    ),
  }),
  profiles: t.Array(
    t.Object({
      type: ProfileTypeEnumSchema,
      profileId: t.String(),
    }),
  ),
});
export type IUserData = UnwrapSchema<typeof IUserDataSchema>;

export const IUserDataWithoutDataSchema = t.Omit(IUserDataSchema, ['data']);
export type IUserDataWithoutData = UnwrapSchema<typeof IUserDataWithoutDataSchema>;

export const IPublicProfileSchema = t.Intersect([
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
export type IPublicProfile = UnwrapSchema<typeof IPublicProfileSchema>;
