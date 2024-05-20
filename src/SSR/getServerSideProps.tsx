import { GetServerSideProps } from "next";

export const getServerSideProps = (async () => {
  // const pathName = usePathname();
  // const categoryHandle = pathName.split("/")[1];
  // const categoryInfo = await fetch(`https://growth-tools-api-v2.vercel.app/api/categories/info/${categoryHandle}`);
  const res = await fetch("https://growth-tools-api-v2.vercel.app/api/categories/list");
  const categoryList = await res.json();
  const category = categoryList.result;
  return { props: { category } }
}) satisfies GetServerSideProps<{ category: any}>
