export type Version = "462" | "502" | "522";

export const versions: Record<Version, string> = {
  462: "4.6.2",
  502: "5.0.2",
  522: "5.2.2",
};

const STORAGE_NAME = "version";
const isVersion = (value: string): value is Version => value in versions;

export const getStorageVersion = (): Version => {
  const stored = localStorage.getItem(STORAGE_NAME) ?? "";
  return isVersion(stored) ? stored : "462";
};

export const setStorageVersion = (value: Version) => {
  localStorage.setItem(STORAGE_NAME, value);
};
