import PropTypes from 'prop-types';

import Iconify from 'src/components/iconify';

function CardIcon({ brandIcon, size }) {
  // Mapeie a bandeira do cartão para o ícone correspondente
  const getIconForBrand = (brand) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "logos:visa";
      case "mastercard":
        return "logos:mastercard";
      case "elo":
        return "logos:elo";
      case "hipercard":
        return "logos:hipercard";
      case "american express":
        return "cib:american-express";
      default:
        return "";
    }
  };

  const icon = getIconForBrand(brandIcon);

  return <Iconify icon={icon}  sx={{ width: size}} />;
}


export default CardIcon;

CardIcon.propTypes = {
    brandIcon: PropTypes.string, 
    size: PropTypes.number 
  };
  