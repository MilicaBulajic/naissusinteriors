import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Slider from "react-slick"

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
}

const Sliders = ({ data }) => {
  return (
    <Slider {...settings} className="overflow-hidden">
      <Img fluid={data.image1.childImageSharp.fluid} />
      <Img fluid={data.image2.childImageSharp.fluid} />
    </Slider>
  )
}

export const query = graphql`
  query {
    image1: file(relativePath: { eq: "bg/one.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    image2: file(relativePath: { eq: "bg/one.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Sliders