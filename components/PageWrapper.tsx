import Head from "next/head";
import Footer from "./Footer";

function PageWrapper({
  children,
  title,
  description,
  absolute,
}: {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  absolute?: boolean;
}) {
  return (
    <div className="lg:flex md:flex flex-col m-0 p-0 items-center relative h-screen w-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="lg:w-1/2 md:w-3/4">{children}</main>

      <Footer absolute />
    </div>
  );
}

export default PageWrapper;
