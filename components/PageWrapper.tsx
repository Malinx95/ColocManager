import Head from "next/head";
import Footer from "./Footer";

function PageWrapper({
  children,
  title,
  description,
}: {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col m-0 p-0 min-h-screen items-center relative w-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full lg:w-1/2 md:w-3/4 pb-2 flex flex-col flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default PageWrapper;
