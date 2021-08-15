const acceptedStarts = ['91', '92', '93', '96', '2']

export const validatePhoneNumber = (phoneNumber: string) =>
  phoneNumber.length === 9 &&
  acceptedStarts.some(start => phoneNumber.startsWith(start))
