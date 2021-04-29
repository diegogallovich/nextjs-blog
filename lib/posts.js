const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
import remark from 'remark';
import html from 'remark-html';
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';

const postsDirectory = path.join(
  process.cwd(),
  '/posts'
);
//==> /posts
// console.log(postsDirectory);

export const getSortedPostsData = () => {
  //* get file names under /posts
  const fileNames = fs.readdirSync(
    postsDirectory
  );
  //==> ['ssg-ssr.md', 'pre-rendering.md']

  const allPostsData = fileNames.map(
    (fileName) => {
      //* Remove '.md' from file name to get id
      const id = fileName.replace(
        /\.md$/,
        ''
      );
      //==> 'ssg-ssr' || 'pre-rendering'

      //* read markdown file as string
      const fullPath = path.join(
        postsDirectory,
        fileName
      );
      //   console.log(fullPath);
      //==> '/posts/ssg-ssr.md' || '/posts/pre-rendering.md'
      const fileContents = fs.readFileSync(
        fullPath,
        'utf-8'
      );
      //==> `${fileContentsAsString}`
      //   console.log(fileContents);

      //* use gray-matter to parse the post metadata section
      const matterResult = matter(
        fileContents
      );
      //   console.log(matterResult);

      //* combine the data with the id
      return {
        id,
        ...matterResult, // content, data: { ...YAMLvalues }, isEmpty, excerpt
      };
    }
  );
  // sort posts by date
  return JSON.stringify(
    allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    })
  );
};

//! Important:
// The returned list is
// not just an array of strings —
// it must be an array of objects that
// look like the comment above.
// Each object must have the params key
// and contain an object with the id key(because we’re using[id]
// in the file name).Otherwise, getStaticPaths will fail.
export const getAllPostsIds = () => {
  const fileNames = fs.readdirSync(
    postsDirectory
  );

  return JSON.stringify(
    fileNames.map((file) => ({
      params: {
        id: file.replace(/\.md$/, ''),
      },
    }))
  );
};

//* get single post data
export const getPostData = async (id) => {
  const fullPath = path.join(
    postsDirectory,
    `${id}.md`
  );

  const fileContents = fs.readFileSync(
    fullPath,
    'utf-8'
  );

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return JSON.stringify({
    id,
    contentHtml,
    ...matterResult.data, // data: { ...YAMLvalues }
  });
};
