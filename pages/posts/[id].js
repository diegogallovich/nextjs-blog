// Head is a React Component that is built into Next.js.
// It allows you to modify the < head > of a page.
import Head from 'next/head';
// Local Components
import Layout from '../../components/layout';
import Date from '../../components/date';
// lib
import {
  getAllPostsIds,
  getPostData,
} from '../../lib/posts';
// styles
import styleUtils from '../../styles/utils.module.css';

export default function Post({
  postData: { id, title, date, contentHtml },
}) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={styleUtils.headingXl}>
          {title}
        </h1>
        <div
          className={styleUtils.lightText}
        >
          <Date dateString={date} />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: contentHtml,
          }}
        />
      </article>
    </Layout>
  );
}

// get dynamic paths/routes for every post
export async function getStaticPaths() {
  const paths = JSON.parse(getAllPostsIds());

  return {
    paths,
    fallback: false,
  };
}

// set props for every post
export async function getStaticProps({
  params,
}) {
  const postData = JSON.parse(
    await getPostData(params.id)
  );

  return {
    props: {
      postData,
    },
  };
}
