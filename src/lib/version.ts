/** 選択可能なバージョン */
export const versions = ["4.6.2", "5.0.2", "5.2.2"] as const;
export type Version = typeof versions[number];

const STORAGE_NAME = "version";
const isVersion = (value: unknown): value is Version =>
  versions.includes(value as Version);

/** ストレージに保存されているバージョン情報の取得 */
export const getStorageVersion = (): Version => {
  const stored = localStorage.getItem(STORAGE_NAME) ?? "";
  return isVersion(stored) ? stored : "4.6.2";
};

/** ストレージにバージョン情報を保存 */
export const setStorageVersion = (value: Version) => {
  localStorage.setItem(STORAGE_NAME, value);
};
