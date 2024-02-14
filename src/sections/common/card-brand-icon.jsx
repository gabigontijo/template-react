import PropTypes from 'prop-types';

import Iconify from 'src/components/iconify';

function CardIcon({ brandIcon }) {
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
      case "americanexpress":
        return "logos:american-express";
      default:
        return ""; // Retorna uma string vazia se a bandeira não for reconhecida
    }
  };

  // Obtenha o ícone para a bandeira do cartão
  const icon = getIconForBrand(brandIcon);

  // Renderize o ícone
  return <Iconify icon={icon} />;
}


export default CardIcon;


CardIcon.propTypes = {
    brandIcon: PropTypes.string };
  