import { PrinciplePage, principleMetadata, principleParams } from '../../../principle-page';

export const generateStaticParams = principleParams;
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return principleMetadata('en', slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PrinciplePage lang="en" slug={slug} />;
}
