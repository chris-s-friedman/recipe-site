import React from "react"
import { Link, graphql } from "gatsby"

export default function Home({ data }) {
  console.log(data)
  return (
    <div>
      <h1>
        List of Markdown Pages
        </h1>
      <h4>{data.allMarkdownRemark.totalCount} Markdown Pages</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.slug}>
            {node.parent.name}{" "}
          </Link>
        </div>
      ))}
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        id
        parent {
          ... on File {
            name
          }
        }
      }
    }
  }
  }
`