export const generateVerificationCode = (): { code: string; expiresAt: Date } => {
    const code: string = Math.random().toString(36).substring(2, 8).toUpperCase(); // Example: "A1B2C3"
    const expiresAt: Date = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes
    return { code, expiresAt };
  };