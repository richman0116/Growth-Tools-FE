import Dashboard from "@/components/Dashboard"

interface GenericPageProps {
  params: { slug: string }
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

const GenericPage = async ({ params: { slug } }: GenericPageProps) => {
  const categories = await fetchCategoryLists();

  const cateInfo = categories.result.filter((category:Category) => category.handle === '/' + slug)?.[0]
  const filterTools = await fetchFilterTools(cateInfo.id);

  return <Dashboard categoryLists={categories.result} filterTools={filterTools.result} />
}

export default GenericPage