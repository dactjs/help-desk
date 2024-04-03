import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserStatus, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

import { InvalidCredentialsError, DisabledUserError } from "@/auth/errors";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { prisma } from "@/lib/prisma";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { username, password } = (credentials ?? {
          username: "",
          password: "",
        }) as Record<string, string>;

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user || !bcrypt.compareSync(password, user.password))
          throw new InvalidCredentialsError();

        if (user.status !== UserStatus.ENABLED) throw new DisabledUserError();

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.name = user.name;
        token.status = user.status;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = String(token.username);
        session.user.email = String(token.email);
        session.user.name = String(token.name);
        session.user.status = token.status;
        session.user.role = token.role;
      }

      return session;
    },
    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      const language = getAppLanguage();

      const signInPath = `/${language}/auth/sign-in`;
      const adminPath = `/${language}/admin`;
      const techniciansPath = `/${language}/technicians`;
      const dashboardPath = `/${language}/dashboard`;

      if (!auth?.user || auth.user.status !== UserStatus.ENABLED) {
        if (pathname === signInPath) return;

        request.nextUrl.pathname = signInPath;

        return NextResponse.redirect(request.nextUrl);
      }

      if (
        auth.user.role === UserRole.ADMIN &&
        !pathname.startsWith(adminPath)
      ) {
        request.nextUrl.pathname = adminPath;

        return NextResponse.redirect(request.nextUrl);
      }

      if (
        auth.user.role === UserRole.TECHNICIAN &&
        !pathname.startsWith(techniciansPath)
      ) {
        request.nextUrl.pathname = techniciansPath;

        return NextResponse.redirect(request.nextUrl);
      }

      if (
        auth.user.role === UserRole.USER &&
        !pathname.startsWith(dashboardPath)
      ) {
        request.nextUrl.pathname = dashboardPath;

        return NextResponse.redirect(request.nextUrl);
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
});
