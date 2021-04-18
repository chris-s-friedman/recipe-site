const fs = require('fs');
const gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

module.exports = {
  siteMetadata: {
    title: `recipes`,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `recipeJson`, // a fixed string
      },
    },
    {
      resolve: 'gatsby-plugin-git-clone',
      options: {
        repository: 'https://github.com/dpapathanasiou/recipes.git',
        path: `${__dirname}/content/recipes`,
        // branch: 'origin/main'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `recipes`,
        path: `${__dirname}/content/recipes/index`,
      },
    },
  ],
}
