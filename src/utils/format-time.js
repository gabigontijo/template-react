import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function formatarData(dataOriginal) {
  // Crie um objeto Date com a data original
  const data = new Date(dataOriginal);

  // Extraia os componentes da data
  const dia = (`0${  data.getDate()}`).slice(-2);
  const mes = (`0${  data.getMonth() + 1}`).slice(-2);
  const ano = data.getFullYear();
  const hora = (`0${  data.getHours()}`).slice(-2);
  const minutos = (`0${  data.getMinutes()}`).slice(-2);

  // Formate a data no formato desejado (dd/mm/aaaa hora:minutos)
  const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`;

  return dataFormatada;
}

