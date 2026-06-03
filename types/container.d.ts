export type ContainerDocument = XMLDocument & {
  xmlEncoding?: string | null;
};

export default class Container {
  constructor(containerDocument?: ContainerDocument);

  packagePath?: string | null;
  directory?: string;
  encoding?: string | null;

  parse(containerDocument?: ContainerDocument): void;

  destroy(): void;
}
