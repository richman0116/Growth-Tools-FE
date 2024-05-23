// import type { ResolvingMetadata, Metadata } from "next";
import { UserAuthLoginForm } from "@/components/auth/user-auth-login-form";



// export async function generateMetadata(
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: `Growth Tools | SignIn`,
//     description: `Explore the best SignIn tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
//     openGraph: {
//       title: `Growth Tools - SignIn`,
//       description: `Explore the best SignIn tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
//       url: `https://tools.growthvirality.com/sign-in`,
//       images: [
//         'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max',
//         ...previousImages
//       ],
//       siteName: 'Growth Tools',
//       type: 'website'
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: `Growth Tools - SignIn`,
//       description: `Explore the best SignIn tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
//       images: ['https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max'],
//     }
//   };
// }

export default function SignInPage() {
  return (
    <section>
      <div className="container h-vh">
        <div className="flex flex-col items-center justify-center py-28">
          <h1 className="font-bold text-4xl mb-6 font-clash">Sign In</h1>
          <p className="font-medium text-base font-satoshi text-description dark:text-white">
            Browse through hundreds of unique tools 
          </p>
          <p className="mb-[72px] font-medium text-base font-satoshi text-description dark:text-white">
            to boost your marketing & startup.
          </p>
          <UserAuthLoginForm />
        </div>
      </div>
    </section>
  );
}
