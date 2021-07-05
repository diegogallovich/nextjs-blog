// Next
import Head from 'next/head';
// Note: If you need to link to an
// external page outside the Next.js app,
// just use an < a > tag without Link.
// If you need to add attributes like,
// for example, className, add it to the a tag,
// not to the Link tag.
import Link from 'next/link';
// static assets
import ProfileImage from '../public/images/ProfileImage';
// styles
import styles from './layout.module.css';
import styleUtils from '../styles/utils.module.css';

const name = 'Diego Gallovich';
export const siteTitle =
  'Next.js Sample Website';

export default function Layout({
  children,
  home,
}) {
  return (
    <div className={styles.container}>
      {/*//? Browser reads as:
    <div class='layout_container__2t4v2'> */}
      {/*//! modify page metadata */}
      <Head>
        <link
          rel='icon'
          href='/favicon.ico'
        />
        <meta
          name='description'
          content='Learn how to build a personal website using Next.js'
        />
        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta
          name='og:title'
          content={siteTitle}
        />
        <meta
          name='twitter:card'
          content='summary'
        />
        <title>Hello pull request</title>
      </Head>
      {/*//* header */}
      <header className={styles.header}>
        {home ? (
          <>
            <ProfileImage
              priority
              className={
                styleUtils.borderCircle
              }
              name={name}
              height={144}
              width={144}
            />
            <h1
              className={
                styleUtils.heading2Xl
              }
            >
              {name}
            </h1>
          </>
        ) : (
          <>
            <Link href='/'>
              <a>
                <ProfileImage
                  priority
                  className={
                    styleUtils.borderCircle
                  }
                  name={name}
                  height={144}
                  width={144}
                />
              </a>
            </Link>
            <h2
              className={
                styleUtils.headingLg
              }
            >
              <Link href='/'>
                <a
                  className={
                    styleUtils.colorInherit
                  }
                >
                  {name}
                </a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href='/'>
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
