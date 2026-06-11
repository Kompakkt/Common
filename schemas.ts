import { t, type UnwrapSchema } from 'elysia';

// # Enums
// These don't need to use UnwrapSchema, as they're real enums are generated using the `generate-enums.ts` script.

export const UserRankEnumSchema = t.UnionEnum(['uploader', 'admin'], {
  description: 'Defines the rank of a user, which can be either "uploader" or "admin".',
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

const IdSchema = t
  .Transform(t.String())
  .Decode(v => v?.toString?.() ?? v)
  .Encode(v => v?.toString?.() ?? v);

export const IDocumentSchema = t.Object(
  { _id: IdSchema },
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

// Unknown will force plugin authors to explicitly define the shape of their extension data
export const IExtensionSchema = t.Optional(t.Record(t.String(), t.Unknown()));
export type IExtension = UnwrapSchema<typeof IExtensionSchema>;

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

export const IDimensionTupleSchema = t.Object(
  {
    type: t.String(),
    value: t.String(),
    name: t.String(),
  },
  {
    description: 'Dimension tuple specifying the type, value, and name of a measurement.',
  },
);
export type IDimensionTuple = UnwrapSchema<typeof IDimensionTupleSchema>;

export const ICreationTupleSchema = t.Object(
  {
    technique: t.String(),
    program: t.String(),
    equipment: t.String(),
    date: t.String(),
  },
  {
    description: 'Creation provenance with technique, program, equipment, and date of production.',
  },
);
export type ICreationTuple = UnwrapSchema<typeof ICreationTupleSchema>;

export const IDescriptionValueTupleSchema = t.Object(
  {
    description: t.String(),
    value: t.String(),
  },
  {
    description: 'A labeled value pair where the description provides context for the value.',
  },
);
export type IDescriptionValueTuple = UnwrapSchema<typeof IDescriptionValueTupleSchema>;

export const DataTupleSchema = t.Union(
  [
    ITypeValueTupleSchema,
    IDimensionTupleSchema,
    ICreationTupleSchema,
    IDescriptionValueTupleSchema,
  ],
  {
    description: 'Discriminated union of all data tuple variants.',
  },
);
export type DataTuple = UnwrapSchema<typeof DataTupleSchema>;

export const IAddressSchema = t.Composite(
  [
    IDocumentSchema,
    t.Object({
      building: t.String(),
      number: t.String(),
      street: t.String(),
      postcode: t.String(),
      city: t.String(),
      country: t.String(),
      creation_date: t.Number(),
    }),
  ],
  {
    description: 'Structured address fields for institutional or geographic location data.',
  },
);
export type IAddress = UnwrapSchema<typeof IAddressSchema>;

export const IContactSchema = t.Composite(
  [
    IDocumentSchema,
    t.Object({
      mail: t.String(),
      phonenumber: t.String(),
      note: t.String(),
      creation_date: t.Number(),
    }),
  ],
  {
    description: 'Contact information record with email, phone number, and optional notes.',
  },
);
export type IContact = UnwrapSchema<typeof IContactSchema>;

export const ITagSchema = t.Composite(
  [
    IDocumentSchema,
    t.Object({
      value: t.String(),
    }),
  ],
  {
    description: 'Tag used for categorizing content.',
  },
);
export type ITag = UnwrapSchema<typeof ITagSchema>;

export const IStrippedUserDataSchema = t.Composite(
  [
    IDocumentSchema,
    t.Object({
      fullname: t.String(),
      username: t.String(),
    }),
  ],
  {
    description: 'Lightweight user record used when embedding user references in other documents.',
  },
);
export type IStrippedUserData = UnwrapSchema<typeof IStrippedUserDataSchema>;

export const ProfileReferenceSchema = t.Object(
  {
    profileId: t.String(),
    type: ProfileTypeEnumSchema,
  },
  {
    description: 'Reference to a user or organization profile by ID and type.',
  },
);
export type ProfileReference = UnwrapSchema<typeof ProfileReferenceSchema>;

export const AccessFieldEntrySchema = t.Composite(
  [
    IStrippedUserDataSchema,
    t.Object({
      role: EntityAccessRoleEnumSchema,
      profile: ProfileReferenceSchema,
    }),
  ],
  {
    description: 'Single entry in an access field, pairing a user with their role and profile.',
  },
);
export type AccessFieldEntry = UnwrapSchema<typeof AccessFieldEntrySchema>;

export const AccessFieldSchema = t.Array(AccessFieldEntrySchema, {
  description: 'List of users and their access roles for an entity or compilation.',
});
export type AccessField = UnwrapSchema<typeof AccessFieldSchema>;

export const CreatorFieldSchema = t.Composite(
  [
    IStrippedUserDataSchema,
    t.Object({
      profile: ProfileReferenceSchema,
    }),
  ],
  {
    description: 'Stripped user data combined with a profile reference, identifying the creator.',
  },
);
export type CreatorField = UnwrapSchema<typeof CreatorFieldSchema>;

export const IVector3Schema = t.Object(
  {
    x: t.Number(),
    y: t.Number(),
    z: t.Number(),
  },
  {
    description: 'Basic 3D coordinate tuple used for positions, rotations, and translations.',
  },
);
export type IVector3 = UnwrapSchema<typeof IVector3Schema>;

export const IAmbiguousVector3Schema = t.Union(
  [
    IVector3Schema,
    t.Object({
      _x: t.Number(),
      _y: t.Number(),
      _z: t.Number(),
    }),
  ],
  {
    description:
      'Flexible 3D vector that supports both x/y/z and _x/_y/_z property naming. Used because serialized BabylonJS Vector3 objects may use underscore-prefixed keys.',
  },
);
export type IAmbiguousVector3 = UnwrapSchema<typeof IAmbiguousVector3Schema>;

export const IFileSchema = t.Object(
  {
    file_name: t.String(),
    file_link: t.String(),
    file_size: t.Number(),
    file_format: t.String(),
  },
  {
    description:
      'Represents a digital file attachment with its name, download link, size, and format.',
  },
);
export type IFile = UnwrapSchema<typeof IFileSchema>;

export const IColorSchema = t.Object(
  {
    r: t.Number(),
    b: t.Number(),
    g: t.Number(),
    a: t.Number(),
  },
  {
    description: 'A color tuple with red, green, blue, and alpha transparency components.',
  },
);
export type IColor = UnwrapSchema<typeof IColorSchema>;

export const IEntityLightSchema = t.Object(
  {
    type: t.String(),
    position: IVector3Schema,
    intensity: t.Number(),
  },
  {
    description:
      'Light configuration for entity rendering, specifying type, placement, and brightness.',
  },
);
export type IEntityLight = UnwrapSchema<typeof IEntityLightSchema>;

export const IEntitySettingsSchema = t.Object(
  {
    position: t.Optional(IVector3Schema),
    preview: t.String(),
    previewVideo: t.Optional(t.String()),
    cameraPositionInitial: t.Object({
      position: IVector3Schema,
      target: IVector3Schema,
    }),
    background: t.Object({
      color: IColorSchema,
      effect: t.Boolean(),
    }),
    lights: t.Array(IEntityLightSchema),
    rotation: IVector3Schema,
    scale: IVector3Schema,
    translate: t.Optional(IVector3Schema),
  },
  {
    description:
      'Presentation settings for a 3D entity, including camera, lighting, background, and transforms.',
  },
);
export type IEntitySettings = UnwrapSchema<typeof IEntitySettingsSchema>;

export const IAgentSchema = t.Composite(
  [
    IDocumentSchema,
    t.Object({
      type: t.String(),
      name: t.String(),
      homepage: t.Optional(t.String()),
    }),
  ],
  {
    description:
      'An agent (person, organization, or software) involved in creating or modifying an annotation.',
  },
);
export type IAgent = UnwrapSchema<typeof IAgentSchema>;

export const ICameraPerspectiveSchema = t.Object(
  {
    cameraType: t.String(),
    position: IAmbiguousVector3Schema,
    target: IAmbiguousVector3Schema,
    preview: t.String(),
  },
  {
    description:
      'Camera perspective defining the view angle, position, target, and preview screenshot for a scene.',
  },
);
export type ICameraPerspective = UnwrapSchema<typeof ICameraPerspectiveSchema>;

export const IContentSchema = t.Object(
  {
    type: t.String(),
    title: t.String(),
    description: t.String(),
    link: t.Optional(t.String()),
    relatedPerspective: ICameraPerspectiveSchema,
  },
  {
    description:
      'Rich content block for an annotation, with type, title, description, link, and a related camera perspective.',
    additionalProperties: true,
  },
);
export type IContent = UnwrapSchema<typeof IContentSchema>;

export const IBodySchema = t.Object(
  {
    type: t.String(),
    content: IContentSchema,
  },
  {
    description: 'Annotation body with a type discriminator and the actual content block.',
  },
);
export type IBody = UnwrapSchema<typeof IBodySchema>;

export const ISourceSchema = t.Object(
  {
    link: t.Optional(t.String()),
    relatedEntity: t.String(),
    relatedCompilation: t.Optional(t.String()),
  },
  {
    description:
      'Identifies the target resource of an annotation by entity and optional compilation.',
  },
);
export type ISource = UnwrapSchema<typeof ISourceSchema>;

export const ISelectorSchema = t.Object(
  {
    referencePoint: IAmbiguousVector3Schema,
    referenceNormal: IAmbiguousVector3Schema,
  },
  {
    description:
      'Spatial selector with a reference point and normal vector for placing annotations in 3D space.',
  },
);
export type ISelector = UnwrapSchema<typeof ISelectorSchema>;

export const ITargetSchema = t.Object(
  {
    source: ISourceSchema,
    selector: ISelectorSchema,
  },
  {
    description:
      'Annotation target combining the referenced source entity with its 3D placement selector.',
  },
);
export type ITarget = UnwrapSchema<typeof ITargetSchema>;

export const IAnnotationSchema = t.Composite(
  [
    IDocumentSchema,
    t.Object({
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
      extensions: IExtensionSchema,
    }),
  ],
  {
    description:
      'User-generated annotation linked to a 3D entity, containing content, target selector, and authorship metadata.',
  },
);
export type IAnnotation = UnwrapSchema<typeof IAnnotationSchema>;

export const IWhitelistSchema = t.Object(
  {
    whitelist: t.Object({
      enabled: t.Boolean(),
      persons: t.Array(IStrippedUserDataSchema),
    }),
  },
  {
    description: 'Access whitelist restricting visibility to a specific set of users.',
  },
);
export type IWhitelist = UnwrapSchema<typeof IWhitelistSchema>;

export const ISizedEventSchema = t.Object(
  {
    width: t.Number(),
    height: t.Number(),
  },
  {
    description: 'UI event with associated width and height values.',
  },
);
export type ISizedEvent = UnwrapSchema<typeof ISizedEventSchema>;

export const IPlaceTupleSchema = t.Object(
  {
    name: t.String(),
    geopolarea: t.String(),
    address: IAddressSchema,
  },
  {
    description: 'Place tuple describing where a physical entity is housed or stored.',
  },
);
export type IPlaceTuple = UnwrapSchema<typeof IPlaceTupleSchema>;

export const IInstitutionSchema = t.Composite(
  [
    IDocumentSchema,
    t.Object({
      name: t.String(),
      university: t.String(),
      roles: t.Record(t.String(), t.Array(t.String())),
      notes: t.Record(t.String(), t.String()),
      addresses: t.Record(t.String(), t.Union([IAddressSchema, IDocumentSchema])),
    }),
  ],
  {
    description: 'Represents an organization or institution linked to persons and entities.',
  },
);
export type IInstitution = UnwrapSchema<typeof IInstitutionSchema>;

export const IInstitutionResolvedSchema = t.Composite(
  [
    t.Omit(IInstitutionSchema, ['addresses']),
    t.Object({
      addresses: t.Record(t.String(), IAddressSchema),
    }),
  ],
  {
    description: 'Institution with fully populated address records instead of document references.',
  },
);
export type IInstitutionResolved = UnwrapSchema<typeof IInstitutionResolvedSchema>;

export const IPersonSchema = t.Composite(
  [
    IDocumentSchema,
    t.Object({
      prename: t.String(),
      name: t.String(),
      roles: t.Record(t.String(), t.Array(t.String())),
      institutions: t.Record(t.String(), t.Array(t.Union([IInstitutionSchema, IDocumentSchema]))),
      contact_references: t.Record(t.String(), t.Union([IContactSchema, IDocumentSchema])),
    }),
  ],
  {
    description:
      'Person record containing name parts, role assignments, institution links, and contact references.',
  },
);
export type IPerson = UnwrapSchema<typeof IPersonSchema>;

export const IPersonResolvedSchema = t.Composite(
  [
    t.Omit(IPersonSchema, ['institutions', 'contact_references']),
    t.Object({
      institutions: t.Record(t.String(), t.Array(IInstitutionSchema)),
      contact_references: t.Record(t.String(), IContactSchema),
    }),
  ],
  {
    description:
      'Person with fully populated institution and contact records instead of document references.',
  },
);
export type IPersonResolved = UnwrapSchema<typeof IPersonResolvedSchema>;

export const IBaseEntitySchema = t.Composite(
  [
    IDocumentSchema,
    t.Object({
      title: t.String(),
      description: t.String(),
      externalId: t.Array(ITypeValueTupleSchema),
      externalLink: t.Array(IDescriptionValueTupleSchema),
      biblioRefs: t.Array(IDescriptionValueTupleSchema),
      other: t.Array(IDescriptionValueTupleSchema),
      persons: t.Array(t.Union([IDocumentSchema, t.String(), IPersonSchema])),
      institutions: t.Array(t.Union([IInstitutionSchema, IDocumentSchema, t.String()])),
      metadata_files: t.Array(IFileSchema),
      extensions: IExtensionSchema,
    }),
  ],
  {
    description:
      'Shared foundation for physical and digital entities with core metadata, contributors, and external references.',
  },
);
export type IBaseEntity = UnwrapSchema<typeof IBaseEntitySchema>;

export const IBaseEntityResolvedSchema = t.Composite(
  [
    t.Omit(IBaseEntitySchema, ['persons', 'institutions']),
    t.Object({
      persons: t.Array(IPersonResolvedSchema),
      institutions: t.Array(IInstitutionResolvedSchema),
    }),
  ],
  {
    description:
      'Base entity with fully populated person and institution records instead of document references.',
  },
);
export type IBaseEntityResolved = UnwrapSchema<typeof IBaseEntityResolvedSchema>;

export const IPhysicalEntitySchema = t.Composite(
  [
    IBaseEntitySchema,
    t.Object({
      place: IPlaceTupleSchema,
      collection: t.String(),
      dimensions: t.Array(IDimensionTupleSchema),
    }),
  ],
  {
    description:
      'Represents a tangible object with storage location, collection context, and physical dimensions.',
  },
);
export type IPhysicalEntity = UnwrapSchema<typeof IPhysicalEntitySchema>;

export const IPhysicalEntityResolvedSchema = t.Composite(
  [
    t.Omit(IPhysicalEntitySchema, ['persons', 'institutions']),
    t.Pick(IBaseEntityResolvedSchema, ['persons', 'institutions']),
  ],
  {
    description:
      'Physical entity with fully populated person and institution records instead of document references.',
  },
);
export type IPhysicalEntityResolved = UnwrapSchema<typeof IPhysicalEntityResolvedSchema>;

export const IDigitalEntitySchema = t.Composite(
  [
    IBaseEntitySchema,
    t.Object({
      type: t.String(),
      licence: t.String(),
      // TODO: Migration to make licenceAttribution a required field, with empty string for old records that lack it
      licenceAttribution: t.Optional(t.Nullable(t.String())),
      discipline: t.Array(t.String()),
      tags: t.Array(t.Union([IDocumentSchema, ITagSchema])),
      dimensions: t.Array(IDimensionTupleSchema),
      creation: t.Array(ICreationTupleSchema),
      files: t.Array(IFileSchema),
      statement: t.String(),
      objecttype: t.String(),
      phyObjs: t.Array(t.Union([IDocumentSchema, IPhysicalEntitySchema])),
    }),
  ],
  {
    description:
      'Represents a digital entity with media files, licensing, creation provenance, and related physical object.',
  },
);
export type IDigitalEntity = UnwrapSchema<typeof IDigitalEntitySchema>;

export const IDigitalEntityResolvedSchema = t.Composite(
  [
    t.Omit(IDigitalEntitySchema, ['persons', 'institutions', 'tags', 'phyObjs']),
    t.Pick(IBaseEntityResolvedSchema, ['persons', 'institutions']),
    t.Object({
      tags: t.Array(ITagSchema),
      phyObjs: t.Array(IPhysicalEntityResolvedSchema),
    }),
  ],
  {
    description:
      'Digital entity with fully populated persons, institutions, tags, and physical object records instead of document references.',
  },
);
export type IDigitalEntityResolved = UnwrapSchema<typeof IDigitalEntityResolvedSchema>;

export const IAnnotationListSchema = t.Object(
  {
    annotations: t.Record(t.String(), t.Union([IAnnotationSchema, IDocumentSchema])),
  },
  {
    description:
      'List of annotations associated with an entity or compilation, stored as a record with optional unresolved references.',
  },
);
export type IAnnotationList = UnwrapSchema<typeof IAnnotationListSchema>;

export const IAnnotationListResolvedSchema = t.Object(
  {
    annotations: t.Record(t.String(), IAnnotationSchema),
  },
  {
    description:
      'Annotation list with fully populated annotation records instead of document references.',
  },
);
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

export const IEntitySchema = t.Composite(
  [
    IAnnotationListSchema,
    IEntityPartialSortableSchema,
    IEntityPartialFilterableSchema,
    IDocumentSchema,
    t.Object({
      name: t.String(),
      files: t.Array(IFileSchema),
      externalFile: t.Optional(t.Nullable(t.String())),
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
      extensions: IExtensionSchema,
      access: AccessFieldSchema,
      options: t.Optional(
        t.Object({
          allowDownload: t.Optional(t.Boolean()),
        }),
      ),
    }),
  ],
  {
    description:
      'Represents a viewable 3D entity with linked metadata, files, rendering settings, and user access controls.',
  },
);
export type IEntity = UnwrapSchema<typeof IEntitySchema>;

export const IEntityResolvedSchema = t.Composite(
  [
    t.Omit(IEntitySchema, ['relatedDigitalEntity', 'annotations']),
    t.Object({ relatedDigitalEntity: IDigitalEntityResolvedSchema }),
    IAnnotationListResolvedSchema,
  ],
  {
    description:
      'Entity with fully populated related digital entity record instead of a document reference.',
  },
);
export type IEntityResolved = UnwrapSchema<typeof IEntityResolvedSchema>;

export const IEntityResolvedOnlyDigitalEntitySchema = t.Composite(
  [
    t.Omit(IEntitySchema, ['relatedDigitalEntity', 'annotations']),
    t.Object({ relatedDigitalEntity: IDigitalEntitySchema }),
    IAnnotationListResolvedSchema,
  ],
  {
    description:
      'Entity where the linked digital entity is fully populated but its nested references may remain unresolved.',
  },
);
export type IEntityResolvedOnlyDigitalEntity = UnwrapSchema<
  typeof IEntityResolvedOnlyDigitalEntitySchema
>;

export const ICompilationSchema = t.Composite(
  [
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
  ],
  {
    description:
      'Represents a compilation grouping multiple entities with shared access control and description.',
  },
);
export type ICompilation = UnwrapSchema<typeof ICompilationSchema>;

export const ICompilationResolvedSchema = t.Composite(
  [
    t.Omit(ICompilationSchema, ['entities', 'annotations']),
    t.Object({
      entities: t.Record(t.String(), IEntityResolvedSchema),
    }),
    IAnnotationListResolvedSchema,
  ],
  {
    description:
      'Compilation with fully populated annotation and entity records instead of document references.',
  },
);
export type ICompilationResolved = UnwrapSchema<typeof ICompilationResolvedSchema>;

export const ICompilationResolvedOnlyEntitiesSchema = t.Composite(
  [
    t.Omit(ICompilationSchema, ['entities', 'annotations']),
    t.Object({ entities: t.Record(t.String(), IEntitySchema) }),
    IAnnotationListResolvedSchema,
  ],
  {
    description:
      'Compilation with resolved annotations and populated entities, where nested entity references remain unresolved.',
  },
);
export type ICompilationResolvedOnlyEntities = UnwrapSchema<
  typeof ICompilationResolvedOnlyEntitiesSchema
>;

const userDataCollectionEntries = [
  [CollectionEnumSchema.enum[0], IAddressSchema],
  [CollectionEnumSchema.enum[1], IAnnotationSchema],
  [CollectionEnumSchema.enum[2], ICompilationSchema],
  [CollectionEnumSchema.enum[3], IContactSchema],
  [CollectionEnumSchema.enum[4], IDigitalEntitySchema],
  [CollectionEnumSchema.enum[5], IEntitySchema],
  [CollectionEnumSchema.enum[6], IInstitutionSchema],
  [CollectionEnumSchema.enum[7], IPersonSchema],
  [CollectionEnumSchema.enum[8], IPhysicalEntitySchema],
  [CollectionEnumSchema.enum[9], ITagSchema],
] as const;

const userDataFieldShape = Object.fromEntries(
  userDataCollectionEntries.map(([key, schema]) => [
    key,
    t.Optional(t.Array(t.Union([schema, IDocumentSchema, t.String(), t.Null()]))),
  ]),
);

export const IUserDataSchema = t.Composite(
  [
    IDocumentSchema,
    t.Object({
      username: t.String(),
      fullname: t.String(),
      prename: t.String(),
      surname: t.String(),
      mail: t.String(),
      role: UserRankEnumSchema,
      strategy: t.String(),
      sessionID: t.Optional(t.String()),
      data: t.Object(userDataFieldShape),
      profiles: t.Array(
        t.Object({
          type: ProfileTypeEnumSchema,
          profileId: t.String(),
        }),
      ),
    }),
  ],
  {
    description:
      'Represents a registered user with profile links, authentication strategy, and ownership references to all collection types.',
  },
);
export type IUserData = UnwrapSchema<typeof IUserDataSchema>;

export const IUserDataWithoutDataSchema = t.Omit(IUserDataSchema, ['data'], {
  description: 'User identity and profile info without the associated collection data.',
});
export type IUserDataWithoutData = UnwrapSchema<typeof IUserDataWithoutDataSchema>;

export const IPublicProfileSchema = t.Composite(
  [
    IDocumentSchema,
    t.Object({
      type: ProfileTypeEnumSchema,
      imageUrl: t.Optional(t.Nullable(t.String())),
      description: t.Optional(t.Nullable(t.String())),
      displayName: t.Optional(t.String()),
      location: t.Optional(t.Nullable(t.String())),
      socials: t.Object(
        {
          website: t.Optional(t.Nullable(t.String())),
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
  ],
  {
    description:
      'Represents a publicly visible profile with identity, socials, and computed sortable and filterable attributes.',
  },
);
export type IPublicProfile = UnwrapSchema<typeof IPublicProfileSchema>;
