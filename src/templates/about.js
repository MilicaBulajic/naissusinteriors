import React from "react";
import * as PropTypes from "prop-types";
import TagList from "../components/TagList";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO/SEO";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";


const AboutPageTemplate = ({
  image,
  images,
  linkinsta,
  instagram,
  heading,
  mainpitch,
  main,
  testimonials,
  intro,
  title,
  content,
  contentComponent,
  description,
  tags,
  langKey,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
      <section className="about">
        <div className="column is-10 is-offset-1">
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child">
                    <h3>{main.heading}</h3>
                    <PageContent className="content" content={content} />
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child">
                    <PreviewCompatibleImage imageInfo={main.image1} />
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="column is-10 is-offset-1">
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child">
                  <PreviewCompatibleImage imageInfo={mainpitch.image2} />
                  </article>
                  </div>
                  <div className="column is-8 is-offset-1">
                  <h2 className="has-text-weight-semibold">{mainpitch.title}</h2>
                    <h4>{mainpitch.heading}</h4>
                    <p>{mainpitch.description}</p>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  tags: PropTypes.array,
  langKey: PropTypes.string,
  images: PropTypes.array,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

class AboutPage extends React.Component {
  render() {
    let data;
    let dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark;
      data = this.props.data;
    }
    const jsonData = data.allArticlesJson.edges[0].node.articles;
    const langKey = dataMarkdown.frontmatter.lang;
    const { frontmatter } = data.markdownRemark;
    const image = frontmatter.image.childImageSharp.fluid.src;
    const tags = frontmatter.tags;
    const linkinsta = dataMarkdown.frontmatter.linkinsta;
    const instagram = dataMarkdown.frontmatter.instagram;
    const images = frontmatter.images;

    return (
      <Layout
        className="content"
        data={this.props.data}
        jsonData={jsonData}
        location={this.props.location}
      >
        <SEO frontmatter={frontmatter} postImage={image} />
        <div>
          <AboutPageTemplate
            imageCardSL={dataMarkdown.frontmatter.imageCardSL}
            image={dataMarkdown.frontmatter.image}
            heading={dataMarkdown.frontmatter.heading}
            mainpitch={dataMarkdown.frontmatter.mainpitch}
            main={dataMarkdown.frontmatter.main}
            testimonials={dataMarkdown.frontmatter.testimonials}
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            tags={tags}
            langKey={langKey}
            intro={frontmatter.intro}
            testimonials={dataMarkdown.frontmatter.testimonials}
          />
        </div>
      </Layout>
    );
  }
}

AboutPage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutPageQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    allArticlesJson(filter: { title: { eq: "home" } }) {
      edges {
        node {
          articles {
            en
            sr
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        id
        title
        description
        linkinsta
        instagram
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
        mainpitch {
          heading
          subheading
          title
          image2 {
            alt
            image {
              childImageSharp {
                gatsbyImageData(width: 200, quality: 90, layout: CONSTRAINED)
              }
            }
          }
          description
          link
        }
        main {
          heading
          image1 {
            alt
            image {
              childImageSharp {
                gatsbyImageData(width: 500, quality: 90, layout: CONSTRAINED)
              }
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;
