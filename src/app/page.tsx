import HomePage from "@/components/HomePage"
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
    .order('order', { ascending: false });
  if (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
  return data
}

const page = async () => {

  const categories = await fetchCategoryLists();
  const tools = await fetchToolLists();
  const filterTools = tools?.slice(0, 6);
  return (
    <div>
      <HomePage categoryLists={categories.result} filterTools={filterTools} />
    </div>
  )
}

export default page