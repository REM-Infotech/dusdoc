import { type Ref } from "vue";

interface TUploadableFile {
  file: File;
  name: string;
  id: string;
  status?: string | undefined;
  content_type: string;
  content_length: number;
  buffer?: ArrayBuffer;
}

export class UploadableFile implements TUploadableFile {
  file: File;
  name: string;
  id: string;
  buffer: ArrayBuffer | undefined;
  status?: string | undefined;
  content_type: string;
  content_length: number;

  constructor(file: File) {
    this.file = file;
    this.name = file.name;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.content_type = file.type;
    this.content_length = file.size;
  }

  async read_file() {
    this.buffer = await this.file.arrayBuffer();
  }
}

export default function (files: Ref<TUploadableFile[]>) {
  function addFiles(newFiles: File[]) {
    const newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !fileExists(file.id));
    files.value = files.value.concat(newUploadableFiles);
  }

  function fileExists(otherId: string) {
    return files.value.some(({ id }) => id === otherId);
  }

  function removeFile(file: TUploadableFile) {
    const index = files.value.indexOf(file);

    if (index > -1) files.value.splice(index, 1);
  }

  return { files, addFiles, removeFile };
}
