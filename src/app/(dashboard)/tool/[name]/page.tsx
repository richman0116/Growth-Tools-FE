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

const GenericToolsDetailPage = async ({ params: { name } }: GenericToolsDetailPageProps) => {
  const toolDataRes = await fetchToolDatas(name);
  return <ToolsDetail toolData={toolDataRes.result} />
}

export default GenericToolsDetailPage