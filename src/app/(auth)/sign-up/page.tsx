import { UserAuthRegisterForm } from "@/components/auth/user-auth-register-form";

export async function generateMetadata() {

  return {
    title: `Growth Tools - SignUp`,
    description: `Explore the best tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
    icons: {
      icon: [
        { rel: 'icon', type: 'image/svg+xml', url: 'https://s3.amazonaws.com/appforest_uf/f1658467734108x989486572275380100/Untitled%20design%20%288%29.svg' }
      ]
    },
    openGraph: {
      title: `Growth Tools - SignUp`,
      description: `Explore the best tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
      url: `https://growth-tools-ui-v2.vercel.app-tools/sign-up`,
      siteName: 'Growth Tools',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Growth Tools - SignUp`,
      description: `Explore the best tools. Over 500+ curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.`,
      images: ['https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max'],
    }
  };
}

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
