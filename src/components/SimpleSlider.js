import React from 'react'
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image"
import Slider from "react-slick"

const SimpleSlider=()=> {
  const reference = useStaticQuery(graphql`
      query {
        reference: allFile (filter: {sourceInstanceName: {eq: "reference"}}){
              nodes {
                  relativePath
                  childImageSharp {
                      fluid (maxWidth: 4000, quality: 100){
                          ...GatsbyImageSharpFluid
                      }
                  }
              }
          }
      }
  `)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return <div>
      <h2> Single Item</h2>
      <Slider {...settings}>
        { reference.nodes.map(background =>{
            return <BackgroundImage
              Tag="section"
              fluid={background.childImageSharp.fluid}
              backgroundColor={`#040e18`}
            />
          })}
      </Slider>
    </div>
}

export default SimpleSlider;