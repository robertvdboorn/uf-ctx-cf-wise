import Image from 'next/image';
import { Asset } from 'contentful';

export default function RichTextAsset({ id, assets }: { id: string; assets: Asset[] }) {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.fields.file.url) {
    return <Image src={asset.fields.file.url} layout="fill" alt={asset.fields.description} />;
  }

  return null;
}
