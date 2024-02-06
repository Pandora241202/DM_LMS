import Head from 'next/head';
import { usePageView } from '../hooks/use-page-view';
import { Layout as MarketingLayout } from '../layouts/marketing';
import { HomeHero } from '../sections/home/home-hero';
import { Home } from '../sections/home/home';

const Page = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          AI LEARNING SYSTEM
        </title>
      </Head>
      <main>
        <Home />
      </main>
    </>
  );
};

Page.getLayout = (page) => (
  <>
    {page}
  </>
);

export default Page;
