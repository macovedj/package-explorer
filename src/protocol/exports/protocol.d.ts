export interface ProtoEnvelopeBody {
  contentBytes: Uint8Array,
  keyId: string,
  signature: string,
}
/**
 * # Variants
 * 
 * ## `"sha256"`
 */
export type HashAlgorithm = 'sha256';
export interface DynHash {
  algo: HashAlgorithm,
  bytes: Uint8Array,
}
export type RecordId = RecordIdDynHash;
export interface RecordIdDynHash {
  tag: 'dyn-hash',
  val: DynHash,
}
export interface Head {
  digest: RecordId,
  timestamp?: string,
}
/**
 * # Variants
 * 
 * ## `"release"`
 * 
 * ## `"yank"`
 */
export type Permission = 'release' | 'yank';
export interface PermissionEntry {
  keyId: string,
  permissions: Permission[],
}
export interface Released {
  content: DynHash,
}
export interface Yanked {
  by: string,
  timestamp: string,
}
export type ReleaseState = ReleaseStateReleased | ReleaseStateYanked;
export interface ReleaseStateReleased {
  tag: 'released',
  val: Released,
}
export interface ReleaseStateYanked {
  tag: 'yanked',
  val: Yanked,
}
export interface Release {
  version: string,
  by: string,
  timestamp: string,
  state: ReleaseState,
}
export interface KeyEntry {
  keyId: string,
  publicKey: string,
}
export interface Validator {
  algorithm?: HashAlgorithm,
  head?: Head,
  permissions: PermissionEntry[],
  releases: Release[],
  keys?: KeyEntry[],
}
export interface LogLeaf {
  logId: string,
  recordId: string,
}
export interface PackageInfo {
  name: string,
  checkpoint?: string,
  state: Validator,
  heads: LogLeaf[],
}
export interface Inclusion {
  log: string,
  map: string,
}
export interface MapCheckpoint {
  logRoot: string,
  logLength: number,
  mapRoot: string,
}
export namespace Protocol {
  export function validate(packageRecords: ProtoEnvelopeBody[]): PackageInfo;
  export function proveInclusion(input: Inclusion, checkpoint: MapCheckpoint, heads: LogLeaf[]): void;
}
