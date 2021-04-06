// import { GatsbyNode } from 'gatsby';
// import simpleGit, { SimpleGitOptions } from 'simple-git';

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `recipeJson`) {
    const slug = createFilePath({ node, getNode, basePath: `recipes` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    console.log(slug)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions
  const result = await graphql(`
      query {
        allRecipeJson {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
  result.data.allRecipeJson.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/recipe.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}
// gatsby-node.js
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type SitePage implements Node @dontInfer {
      path: String!
    }
  `)
}