import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'

const Footer = () => {

  return <footer>Desarrollado por Sergio L.<a href="https://github.com/SergioL;7" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" /></a></footer>;
};

export default Footer;
