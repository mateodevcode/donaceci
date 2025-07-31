import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/db";
import bcrypt from "bcrypt";
import Usuario from "@/models/usuario";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        await connectMongoDB();
        const user = await Usuario.findOne({ email });

        if (!user) {
          throw new Error("Correo no registrado");
        }

        if (user.bloqueado) {
          throw new Error("Cuenta bloqueada");
        }

        const verificarPassword = await bcrypt.compare(password, user.password);
        if (!verificarPassword) {
          user.intentosFallidos += 1;

          if (user.intentosFallidos >= 3) {
            user.bloqueado = true;
            await user.save();
            throw new Error("Usuario bloqueado");
          }

          await user.save();
          throw new Error("Contraseña incorrecta");
        }

        // Reiniciar intentos fallidos
        user.intentosFallidos = 0;
        await user.save();

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.imageUrl,
          rol: user.rol,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectMongoDB();

      let existingUser = await Usuario.findOne({ email: user.email });

      if (!existingUser) {
        existingUser = await Usuario.create({
          name: user.name,
          email: user.email,
          imageUrl: user.image,
          provider: account.provider,
          rol: "usuario", // Asigna un cargo por defecto
        });
      }

      // Inyecta cargo e ID en user para que se pase al token
      user.id = existingUser._id.toString();
      user.rol = existingUser.rol;

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = user.rol; // Agrega cargo al token
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.rol = token.rol; // Pasa el cargo a useSession
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/", // Página de inicio de sesión
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
