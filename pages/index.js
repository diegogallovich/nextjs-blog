import Head from 'next/head';
import Link from 'next/link'
// local components
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
// lib
import { getSortedPostsData } from '../lib/posts'
// styles
import styleUtils from '../styles/utils.module.css'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{ siteTitle }</title>
      </Head>
      <section className={ styleUtils.headingMd }>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam reprehenderit modi a quisquam nisi tempora accusamus quibusdam qui vel fuga minus eveniet quo necessitatibus, odit nostrum commodi. Minima, nesciunt illum?</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      {/* blog posts list */}
      <section className={`${styleUtils.headingMd} ${styleUtils.padding1px}`}>
        <h2 className={styleUtils.headingLg}>Blog</h2>
        <ul className={styleUtils.list}>
          {allPostsData.map(({ id, data: { date, title } }) => (
            <li className={styleUtils.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={styleUtils.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData: JSON.parse(allPostsData)
    }
  }
}

// export async function getServerSideProps(context) {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData: JSON.parse(allPostsData),
//     }
//   }
// }