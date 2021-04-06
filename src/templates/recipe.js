import React from "react"
import { graphql } from "gatsby"

export default function recipePage({ data }) {
    const recipe = data.recipeJson
    return (
        <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
            <h1>{recipe.title}</h1>
            <h2>Ingredients</h2>
            <ol>
                {recipe.directions.map((data, index) => {
                    return <li key={`content_item_${index}`}>{data}</li>
                })}
            </ol>
            <h2>Directions</h2>
            <ul>
                {recipe.ingredients.map((data, index) => {
                    return <li key={`content_item_${index}`}>{data}</li>
                })}
            </ul>
            <p>Source: <a href={recipe.url}>{recipe.source}</a></p>
        </div>
    )
}

export const query = graphql`
  query($slug: String!) {
    recipeJson(fields: { slug: { eq: $slug } }) {
        title
        url
        source
        ingredients
        directions
    }
  }
`