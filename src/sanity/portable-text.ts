export type PortableTextSpan = {
  _type: string;
  text?: string;
  marks?: string[];
};

export type PortableTextBlock = {
  _type: string;
  _key?: string;
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: unknown[];
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
};
