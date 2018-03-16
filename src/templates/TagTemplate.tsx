import * as React from 'react'
import Helmet from 'react-helmet'
import GatsbyLink from 'gatsby-link'
import { AllMarkdownRemark } from '../content/markdown'
import { Site } from '../content/site'

type TagTemplateProps = {
  readonly pathContext: {
    readonly tag?: string
  }
  readonly data: {
    readonly allMarkdownRemark: AllMarkdownRemark
    readonly site: Site
  }
}

const TagTemplate = ({ data, pathContext }: TagTemplateProps) => {
  const { tag } = pathContext
  const { allMarkdownRemark, site } = data
  const { totalCount, edges } = allMarkdownRemark

  return (
    <div>
      <Helmet title={`Content Tagged "${tag}" - ${site.siteMetadata.title}`} />
      <h1>{`${totalCount} ${
        totalCount === 1 ? 'item' : 'items'
      } tagged with "${tag}"`}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { path, title } = node.frontmatter
          return (
            <li key={path}>
              <GatsbyLink to={path}>{title}</GatsbyLink>
            </li>
          )
        })}
      </ul>
      <GatsbyLink to="/tags">All tags</GatsbyLink>
    </div>
  )
}

export default TagTemplate

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true }, tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`