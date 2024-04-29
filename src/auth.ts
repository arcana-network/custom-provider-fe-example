import { AuthProvider } from "@arcana/auth";

const auth: AuthProvider = new AuthProvider(
  "ecc6292e414c8228ae69ce5ff6a1b3eca59984e9",
  {
    network: {
      authUrl: "https://auth-verify-phi.vercel.app",
      gatewayUrl: "https://gateway-dev.arcana.network",
      walletUrl: "https://wallet-dev-test.arcana.network",
    },
  }
);

const getAuth = () => {
  return auth;
};

export { getAuth };
