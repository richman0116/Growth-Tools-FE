import type { Metadata, ResolvingMetadata } from 'next';
import ToolsDetail from "@/components/ToolsDetail"

interface GenericToolsDetailPageProps {
  params: {name: string}
}

const fetchToolDatas = async (name:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools/info/${name}`);
  
  if (!res.ok) {
    throw new Error('Data fetching was failed')
  }

  return res.json()
} 

export async function generateMetadata(
  { params }: GenericToolsDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { name: toolName } = params;
  const name = toolName.replace(/%20/g, ' ');
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Growth Tools | ${name}`,
    description: `Explore the best ${name} tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
    openGraph: {
      title: `Growth Tools - ${name}`,
      description: `Explore the best ${name} tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
      url: `https://tools.growthvirality.com/tool/${name}`,
      images: [
        'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max',
        ...previousImages
      ],
      siteName: 'Growth Tools',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Growth Tools - ${name}`,
      description: `Explore the best ${name} tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
      images: ['https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max'],
    }
  };
}

const GenericToolsDetailPage = async ({ params: { name } }: GenericToolsDetailPageProps) => {
  const toolDataRes = await fetchToolDatas(name);
  return <ToolsDetail toolData={toolDataRes.result} />
}

export default GenericToolsDetailPage