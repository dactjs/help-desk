import { CredentialsSignin } from "next-auth";

export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

export const AuthErrorCode = {
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  DISABLED_USER: "DISABLED_USER",
} as const;

export class AuthError extends CredentialsSignin {
  public code: AuthErrorCode;

  constructor(code: AuthErrorCode) {
    super();

    this.code = code;
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super(AuthErrorCode.INVALID_CREDENTIALS);

    this.message = "Invalid Credentials";
  }
}

export class DisabledUserError extends AuthError {
  constructor() {
    super(AuthErrorCode.DISABLED_USER);

    this.message = "Disabled User";
  }
}
