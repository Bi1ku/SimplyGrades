export const formatContactNumber = (number: string) => {
  var cleaned = ('' + number).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
};

// TODO: Change to format full name from request
export const formatFullName = (firstName: string, lastName: string) =>
  `${firstName} ${lastName}`;
