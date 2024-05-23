// import type { ResolvingMetadata, Metadata } from "next";
import { UserAuthRegisterForm } from "@/components/auth/user-auth-register-form";

// export async function generateMetadata(
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: `Growth Tools | SignUp`,
//     description: `Explore the best SignUp tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
//     openGraph: {
//       title: `Growth Tools - SignUp`,
//       description: `Explore the best SignUp tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
//       url: `https://tools.growthvirality.com/sign-up`,
//       images: [
//         'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max',
//         ...previousImages
//       ],
//       siteName: 'Growth Tools',
//       type: 'website'
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: `Growth Tools - SignUp`,
//       description: `Explore the best SignUp tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
//       images: ['https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max'],
//     }
//   };
// }

export default function SignUpPage() {
  return (
    <section>
      <div className="container h-vh">
        <div className="flex flex-col items-center justify-center py-28">
          <h1 className="font-bold text-4xl mb-6 font-clash">Sign Up</h1>
          <p className="mb-[72px] font-medium text-base font-satoshi">
            Browse through hundreds of unique tools to boost your marketing &
            startup.
          </p>
          <UserAuthRegisterForm />
        </div>
      </div>
    </section>
  );
}
