import customFooter from "../../assets/css/FooterStyles.module.css";
import { Phone } from "react-bootstrap-icons";
import { Instagram } from "react-bootstrap-icons";
import { Facebook } from "react-bootstrap-icons";

const Footer = () => {
    return (
      <footer className={`${customFooter.footerBase}`}>
            <div className="row px-5 justify-content-center align-items-center">
                <div className={`${customFooter.teamName} col-auto mb-2`}>
                    QUICKPACKAGE™️
                </div>
                <div className={`${customFooter.footerInfo} col-auto`}>
                    Regulamin
                </div>
                <div className={`${customFooter.footerInfo} col-auto`}>
                    Reklamacje
                </div>
                <div className={`${customFooter.footerInfo} col-auto`}>
                    Pomoc
                </div>
                <div className={`${customFooter.footerInfo} col-auto`}>
                    Polityka prywatności
                </div>
                <div className={`${customFooter.footerInfo} d-flex align-items-center col-auto`}>
                    <Phone/>
                    +48 506 869 122
                </div>
                <div className={`${customFooter.footerInfo} d-flex align-items-center col-auto`}>
                    <Instagram/>
                </div>
                <div className={`${customFooter.footerInfo} d-flex align-items-center col-auto`}>
                    <Facebook/>
                </div>
            </div>
      </footer>
    );
  };
  
  export default Footer;