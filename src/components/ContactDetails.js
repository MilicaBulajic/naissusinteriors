import React from 'react'
import { FaMapMarkerAlt, FaPhone, FaRegEnvelope } from 'react-icons/fa'
import PropTypes from 'prop-types'
import CardSlide from '../components/CardSlide'
import { FormattedMessage } from 'react-intl';


const ContactDetails = ({ infos, address, image, phone, email }) =>(

      <div className="section box">
        <div className="container">
          <h3 className="title">
              <FormattedMessage id='contact.infos'/>
            </h3>
              <div className="columns is-vcentered">
                <div className="column">
                <CardSlide
                style={{ maxWidth: '20%'}}
                imageInfo={image}
                name={image.name}
                description={image.description}
                website={image.website}/>
                </div>
                <div className="column is-vertical-center">
                  {phone && (
                  <div className="content">
              <a
                className="Contact--Details--Item"
                href={`https://www.google.com.au/maps/search/${encodeURI(
                  phone
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPhone className="menu-names"/> {phone}
              </a>
            </div>
            )}
            {email && (
              <div className="content">
              <a className="Contact--Details--Item" href={`mailto:${email}`}>
                <FaRegEnvelope className="menu-names"/> {email}
              </a>
              </div>
            )}
            </div>
          </div>
          </div>
        </div>
    )


ContactDetails.propTypes = {
  infos: PropTypes.string,
  image: PropTypes.object,
  address: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
}

export default ContactDetails
