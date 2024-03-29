import React from "react";
import * as PropTypes from "prop-types";
import TagList from "../components/TagList";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO/SEO";
import Content, { HTMLContent } from "../components/Content";
import Banner from '../components/Banner';
import Slider from '../components/Slider';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import logo from '../img/banner.png'


const HomePageTemplate = ({
  image,
  images,
  linkinsta,
  instagram,
  heading,
  display,
  array,
  subheading,
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
    <div className="header">
      <div className="slide column is-8">
      <Slider array={array} display={display} />
      </div>
      <div className="slidetext column is-4">
        <img src={logo} />
        <p>{mainpitch.subheading}</p>
      </div>
    </div>
  );
};

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
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

class HomePage extends React.Component {
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
    const { display } = frontmatter.slider;
    const { array } = frontmatter.slider;
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
          <HomePageTemplate
            display={display}
            array={array}
            imageCardSL={dataMarkdown.frontmatter.imageCardSL}
            image={dataMarkdown.frontmatter.image}
            heading={dataMarkdown.frontmatter.heading}
            subheading={dataMarkdown.frontmatter.subheading}
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

HomePage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  data: PropTypes.object.isRequired,
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery($id: String!) {
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
        subheading
        mainpitch {
          heading
          subheading
          title
          description
          link
        }
        slider {
          display
          array {
            original
            thumbnail
            originalAlt
            originalTitle
            description
          }
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
