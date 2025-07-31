export const validarOTP = (otp) => {
  return otp.replace(/\D/g, "");
};
