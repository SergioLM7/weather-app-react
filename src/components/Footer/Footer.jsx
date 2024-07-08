import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import 'normalize.css';
import './Footer.css'

const Footer = () => {

  return <footer>Developed by Sergio L.
    <a href="https://github.com/SergioLM7" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" color="white"/></a>
    </footer>;
};

export default Footer;
