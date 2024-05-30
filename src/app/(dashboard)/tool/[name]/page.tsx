import type { Metadata, ResolvingMetadata } from 'next';
import ToolsDetail from "@/components/ToolsDetail"

interface GenericToolsDetailPageProps {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
): Promise<Metadata> {
  const { name } = params;
  const toolDataRes = await fetchToolDatas(name);
  const realName = name.replaceAll('%20', ' ');
  return {
    title: `${toolDataRes.result.category.name} - ${realName} Tool Review & Alternatives of ${new Date().getFullYear()}`,
    description: `Explore the best ${realName} tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
    icons: {
      icon: [
        { rel: 'icon', type: 'image/svg+xml', url: 'https://s3.amazonaws.com/appforest_uf/f1658467734108x989486572275380100/Untitled%20design%20%288%29.svg' }
      ]
    },
    openGraph: {
      title: `Growth Tools - ${realName}`,
      description: `Explore the best ${realName} tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
      url: `https://growth-tools-ui-v2.vercel.app/tool/${name}`,
      siteName: 'Growth Tools',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Growth Tools - ${realName}`,
      description: `Explore the best ${realName} tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
      images: ['https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max'],
    }
  };
}

const GenericToolsDetailPage = async ({ params: { name } }: GenericToolsDetailPageProps) => {
  const toolDataRes = await fetchToolDatas(name);
  return <ToolsDetail toolData={toolDataRes.result} />
}

export default GenericToolsDetailPage