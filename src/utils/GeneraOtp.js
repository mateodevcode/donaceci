const otpTimers = {}; // clave: email, valor: timestamp de último OTP

export function GenerateOtp(email) {
  const now = Date.now();

  if (otpTimers[email]) {
    const timeElapsed = now - otpTimers[email];

    if (timeElapsed < 15 * 60 * 1000) {
      const minutesLeft = Math.ceil((15 * 60 * 1000 - timeElapsed) / 60000);
      return {
        allowed: false,
        message: `Espera ${minutesLeft} minuto(s) antes de solicitar otro código.`,
      };
    }
  }

  // Si no hay registro o ya pasaron 15 minutos
  otpTimers[email] = now;
  return { allowed: true };
}
