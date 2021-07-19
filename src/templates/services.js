import React from "react"
import * as PropTypes from "prop-types"
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"

const ServiceTemplate = ({
  title,
  content,
  contentComponent,
  image,
  intro,
  heading,
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
      <h3>{heading}</h3>
        <PageContent className="container content" content={content} />
      <h3>{subheading}</h3>
      <p>{description}</p>
      <p>{list}</p>
      </section>
      </div>

    )
}

ServiceTemplate.propTypes = {
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

class ServicesPage extends React.Component {

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
            <ServiceTemplate
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

ServicesPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ServicesPage

export const pageQuery = graphql`query ServicesQuery($id: String!) {
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
