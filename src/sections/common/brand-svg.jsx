import PropTypes from 'prop-types';

import eloLogo from '../../../public/assets/images/elo.png';
import visaLogo from "../../../public/assets/images/visa.png"
import amexLogo from '../../../public/assets/images/amex.png';
import hipercardLogo from '../../../public/assets/images/hipercard.png';
import mastercardLogo from "../../../public/assets/images/mastercard.png";

function SvgBrand({brand}) {
    const getSvgForBrand = (brandCase) => {
        switch (brandCase.toLowerCase()) {
          case "visa":
            return  <img src={ visaLogo} alt="Icon" height={25} />
          case "mastercard":
            return  <img src={mastercardLogo} alt="Icon" height={35} />
          case "elo":
            return  <img src={eloLogo} alt="Icon" height={25} />
          case "hipercard":
            return   <img src={hipercardLogo} alt="Icon" height={30} />
          case "american express":
            return  <img src={amexLogo} alt="Icon" height={40} />
          default:
            return ""; // Retorna uma string vazia se a bandeira não for reconhecida
        }
      };
    
      // Obtenha o ícone para a bandeira do cartão
      const imgBrand = getSvgForBrand(brand);
  
    return imgBrand;
  }

  export default SvgBrand;

  SvgBrand.propTypes = {
    brand: PropTypes.string, 
  };
  