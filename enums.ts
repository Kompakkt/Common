export enum Collection {
  address = 'address',
  annotation = 'annotation',
  compilation = 'compilation',
  contact = 'contact',
  digitalentity = 'digitalentity',
  entity = 'entity',
  institution = 'institution',
  person = 'person',
  physicalentity = 'physicalentity',
  tag = 'tag',
}

export const isCollection = (value: unknown): value is Collection =>
  typeof value === 'string' && Object.values(Collection).includes(value as Collection);

export enum EntityAccessRole {
  owner = 'owner',
  editor = 'editor',
  viewer = 'viewer',
}

export const isEntityAccessRole = (value: unknown): value is EntityAccessRole =>
  typeof value === 'string' && Object.values(EntityAccessRole).includes(value as EntityAccessRole);

export enum ProfileType {
  user = 'user',
  organization = 'organization',
}

export const isProfileType = (value: unknown): value is ProfileType =>
  typeof value === 'string' && Object.values(ProfileType).includes(value as ProfileType);

export enum UserRank {
  uploader = 'uploader',
  admin = 'admin',
}

export const isUserRank = (value: unknown): value is UserRank =>
  typeof value === 'string' && Object.values(UserRank).includes(value as UserRank);
