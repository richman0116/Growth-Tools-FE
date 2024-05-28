import type { Metadata, ResolvingMetadata } from 'next';
import Dashboard from "@/components/Dashboard"
import { supabase } from '@/lib/supabaseClient';

interface GenericPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const fetchCategoryLists = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/list`);
  
  if (!res.ok) {
    throw new Error('Data fetching was failed')
  }

  return res.json()
}

const fetchFilterTools = async (id: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools/filter?page=1&take=10&order=ASC&categoryId=${id}`)

  if (!res.ok) {
    throw new Error('Data fetching was failed on filter')
  }

  return res.json()
}

const fetchAllTools =  async () => {
  const { data } = await supabase.from('tools').select('*')
  const toolsAllData = data ? data : [];
  return toolsAllData;
};

export async function generateMetadata(
  { params }: GenericPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const categories = await fetchCategoryLists();
  const cateInfo = categories.result.filter((category: Category) => category.handle === '/' + slug)?.[0];

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Growth Tools | ${cateInfo.name}`,
    description: `Explore the best ${cateInfo.name} tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
    openGraph: {
      title: `Growth Tools - ${cateInfo.name}`,
      description: `Explore the best ${cateInfo.name} tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
      url: `https://tools.growthvirality.com/${slug}`,
      images: [
        'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max',
        ...previousImages
      ],
      siteName: 'Growth Tools',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Growth Tools - ${cateInfo.name}`,
      description: `Explore the best ${cateInfo.name} tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
      images: ['https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max'],
    }
  };
}

const GenericPage = async ({ params: { slug } }: GenericPageProps) => {
  const categories = await fetchCategoryLists();

  const cateInfo = categories.result.filter((category: Category) => category.handle === '/' + slug)?.[0]
  const filterTools = await fetchFilterTools(cateInfo.id);
  const toolsAllData = await fetchAllTools();
  return (
    <Dashboard categoryLists={categories.result} filterTools={filterTools.result} toolsAllData={toolsAllData} />
  )
}

export default GenericPage