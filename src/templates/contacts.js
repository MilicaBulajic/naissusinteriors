import React from "react";
import * as PropTypes from "prop-types";
import { graphql } from "gatsby";
import { navigate } from "gatsby-link";
import Layout from "../components/Layout";
import SEO from "../components/SEO/SEO";
import Content, { HTMLContent } from "../components/Content";
import ContactDetails from "../components/ContactDetails";
import OsmMap from "../components/OsmMap";
import FollowUs from "../components/FollowUs";
import { getCurrentLangKey } from "ptz-i18n";
import { FormattedMessage } from "react-intl";
import Map from "../components/Map";
import MapSecond from "../components/MapSecond";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function setActionPath(langKey) {
  let path;
  if (langKey === "en") {
    path = "/sr/";
  } else {
    path = "/en/";
  }
  return path;
}

const ContactPageTemplate = ({
  title,
  content,
  contentComponent,
  description,
  image,
  address,
  phone,
  email,
  handleSubmit,
  handleChange,
  action,
}) => {
  const PageContent = contentComponent || Content;
  return (
    <>
      <section className="contacts">
        <div className="container">
          <div className="content">
            <PageContent className="container content" content={content} />
            <ContactDetails
              image={image}
              address={address}
              phone={phone}
              email={email}
            />
            <div className="box">
              <h4 className="subtitle">
                <FormattedMessage id="contact.fill-the-form" />
              </h4>
              <form
                name="contact"
                method="post"
                action={action}
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{" "}
                    <input name="bot-field" onChange={handleChange} />
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor="name">
                    <FormattedMessage id="contact.name" />
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      id="name"
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="surname">
                    <FormattedMessage id="contact.surname" />
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="surname"
                      onChange={handleChange}
                      id="surname"
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="email">
                    <FormattedMessage id="contact.email" />
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      id="email"
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="subject">
                    <FormattedMessage id="contact.subject" />
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="subject"
                      name="subject"
                      onChange={handleChange}
                      id="subject"
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control"></div>
                </div>
                <div className="field">
                  <label className="label"></label>
                </div>
                <div className="field">
                  <label className="label" htmlFor="message">
                    <FormattedMessage id="contact.message" />
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name="message"
                      onChange={handleChange}
                      id="message"
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button" type="submit">
                      <FormattedMessage id="contact.send" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="section contact">
        <p>{description}</p>
        <div className="column is-10 is-offset-1">
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child">
                    <span>Trg Marije Trandafil 24, I/2 21000, Novi Sad</span>
                    <MapSecond />
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child">
                    <span>330 E 33rd street, Suite 8D, New York, NY 10016</span>
                    <Map />
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/?no-cache=1", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };
  render() {
    let dataMarkdown = [];
    let data;
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark;
      data = this.props.data;
    }
    const location = this.props.location;
    const url = location.pathname;
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    const action = setActionPath(this.langKey);
    const jsonData = data.allArticlesJson.edges[0].node.articles;
    const address = dataMarkdown.frontmatter.address;
    const phone = dataMarkdown.frontmatter.phone;
    const email = dataMarkdown.frontmatter.email;
    const locations = dataMarkdown.frontmatter.locations;
    const { lat } = locations;
    const { lng } = locations;
    const { message } = locations;
    const linkinsta = dataMarkdown.frontmatter.linkinsta;
    const instagram = dataMarkdown.frontmatter.instagram;
    const image = dataMarkdown.frontmatter.imageCardSL;
    const { frontmatter } = dataMarkdown;
    const imageSEO = frontmatter.image.childImageSharp.gatsbyImageData.src;
    return (
      <Layout
        className="container"
        data={data}
        jsonData={jsonData}
        location={location}
      >
        <SEO frontmatter={frontmatter} postImage={imageSEO} />
        <div className="container">
          <ContactPageTemplate
            contentComponent={HTMLContent}
            image={image}
            address={address}
            phone={phone}
            email={email}
            title={dataMarkdown.frontmatter.title}
            description={dataMarkdown.frontmatter.description}
            content={dataMarkdown.html}
            onSubmit={this.handleSubmit}
            action={action}
          />
        </div>
        <FollowUs link={linkinsta} instagram={instagram} />
      </Layout>
    );
  }
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContactPage;

export const pageQuery = graphql`
  query ContactPageQuery($id: String!) {
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
        tags
        lang
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        address
        phone
        email
        locations {
          lat
          lng
          message
        }
        linkinsta
        instagram
        imageCardSL {
          alt
          image {
            childImageSharp {
              gatsbyImageData(width: 180, quality: 70, layout: CONSTRAINED)
            }
          }
          name
          description
        }
      }
      fields {
        slug
      }
    }
  }
`;
