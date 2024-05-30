import LatestTools from "@/components/LatestTools"
import { supabase } from "@/lib/supabaseClient";

const fetchCategoryLists = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/list`);
  
  if (!res.ok) {
    throw new Error('Data fetching was failed')
  }

  return res.json()
}


const fetchToolLists = async () => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
  return data
}

export async function generateMetadata() {

  return {
    title: `Top Latest Marketing Tools In ${new Date().getFullYear()}`,
    description: `Explore the best latest tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
    icons: {
      icon: [
        { rel: 'icon', type: 'image/svg+xml', url: 'https://s3.amazonaws.com/appforest_uf/f1658467734108x989486572275380100/Untitled%20design%20%288%29.svg' }
      ]
    },
    openGraph: {
      title: `Growth Tools - Latest`,
      description: `Explore the best latest tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
      url: `https://growth-tools-ui-v2.vercel.app/latest-tools`,
      siteName: 'Growth Tools',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Growth Tools - Latest`,
      description: `Explore the best latest tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
      images: ['https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max'],
    }
  };
}

const LatestToolsPage = async () => {

  const categories = await fetchCategoryLists();
  const tools = await fetchToolLists();
  const filterTools = tools?.slice(0, 10);
  return (
    <div>
      <LatestTools categoryLists={categories.result} filterTools={filterTools} />
    </div>
  )
}

export default LatestToolsPage