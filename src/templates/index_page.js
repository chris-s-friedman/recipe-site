import React from "react"
import { graphql } from "gatsby"

export default function Home({ data }) {
  const post = data.markdownRemark
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: post.html.replace(/.json/g, "") }} />
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`