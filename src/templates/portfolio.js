import React from "react"
import * as PropTypes from "prop-types"
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import { Gallery } from "gatsby-gallery-simple"

const PortfolioTemplate = ({
  title,
  content,
  contentComponent,
  images,
  lightboxOptions,
  onClose,
  subheading,
  description,
  list,
  link,
  tags,
  langKey
}) => {
  const PageContent = contentComponent || Content
  return (
    <div>
      <section className="section services">
          <h3>{title}</h3>
            <Gallery />
      </section>
    </div>

    )
}

PortfolioTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  subheading: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  tags: PropTypes.array,
  list: PropTypes.array,
  langKey: PropTypes.string
}

class PortfolioPage extends React.Component {

render() {
  var dataMarkdown = [];
  if (this.props.data !== null) {
    dataMarkdown = this.props.data.markdownRemark;
  }
  const data = this.props.data;
  const { frontmatter } = data.markdownRemark;
  const description = frontmatter.headingDesc;
  const jsonData = data.allArticlesJson.edges[0].node.articles;
  const image = frontmatter.image.childImageSharp.fluid.src;
  const langKey = frontmatter.lang;
  const list = frontmatter.list;
    return (
      <Layout className="container" data={data} jsonData={jsonData} location={this.props.location}>
        <SEO
          frontmatter={frontmatter}
          postImage={image}
        />
        <div>
            <PortfolioTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            subheading={frontmatter.subheading}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            description={frontmatter.description}
            list={list}
            langKey={langKey}
            image={dataMarkdown.frontmatter.image}
            />
        </div>
      </Layout>
    )
  }
}

PortfolioPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default PortfolioPage

export const pageQuery = graphql
`query PortfolioPageQuery($id: String!) {
  site {
    siteMetadata {
      languages {
        defaultLangKey
        langs
      }
    }
  }
  allArticlesJson(filter: {title: {eq: "home"}}) {
    edges {
      node {
        articles {
          en
          sr
        }
      }
    }
  }
  markdownRemark(id: {eq: $id}) {
    html
    frontmatter {
      id
      title
      description
      list
      tags
      lang
      image {
        childImageSharp {
          fluid(maxWidth: 2048, quality: 100) {
            ...GatsbyImageSharpFluid
            src
          }
        }
      }
      heading
      subheading
      description
    }
  }
}
`

