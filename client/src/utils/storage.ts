export interface StoredFile {
  id: string;
  originalName: string;
  url: string;
  size: number;
  uploadedAt: string;
}

const STORAGE_KEY = "packet-picnic-files";

export const getFiles = (): StoredFile[] => {
  const files = localStorage.getItem(STORAGE_KEY);

  if (!files) {
    return [];
  }

  return JSON.parse(files);
};

export const saveFile = (file: StoredFile) => {
  const files = getFiles();

  files.push(file);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
};