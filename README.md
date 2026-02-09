## Authentification
1. Authentification vs Autorisation : La base
Avant de toucher au code, il est essentiel de ne pas confondre ces deux piliers de la sécurité.

Authentification (Qui êtes-vous ?) : C'est l'acte de vérifier l'identité d'un utilisateur (ex: Login via email/mot de passe ou via Google).

Autorisation (Qu'avez-vous le droit de faire ?) : Une fois identifié, on vérifie vos permissions (ex: Un utilisateur "Client" ne peut pas accéder au tableau de bord "Admin").


-------------------------------------------------

4 type authentification
1. Authentification par Session (Cookie-based)
2. Authentification par Token (JWT - JSON Web Token)
3. OAuth 2.0 & OpenID Connect (OIDC) - "Le Social Login"




### 2. Différences techniques clés

| Caractéristique | OAuth 2.0 | OpenID Connect (OIDC) |
| --- | --- | --- |
| **Objectif principal** | **Autorisation** (Accès aux données) | **Authentification** (Qui est l'utilisateur) |
| **Ce qu'il produit** | `access_token` (souvent opaque) | `id_token` (toujours un JWT) |
| **Contenu** | Scopes (permissions comme `read:photos`) | Claims (infos comme `email`, `sub`, `name`) |
| **Analogie** | Une clé de voiture | Un permis de conduire |


### installation
```shell
bun add next-auth
```

generate key (linux team only/windwos)
```shell
openssl rand -base64 32
```














Got it — you started a solid guide and want it **completed according to the Table of Contents**. I’ll extend it in the same practical, developer-focused style and include examples where useful.

---

# 🔐 Authentication & Security in Next.js

A comprehensive guide to implementing secure authentication patterns in Next.js applications, covering session-based auth, JWT tokens, OAuth 2.0/OIDC, and protection against common web vulnerabilities.

---
## Implementation Example

```ts
// app/api/auth/login/route.ts
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { generateSessionId } from "@/lib/crypto";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await db.user.findUnique({ where: { email } });
  if (!user) return new Response("Invalid credentials", { status: 401 });

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return new Response("Invalid credentials", { status: 401 });

  const sessionId = generateSessionId();

  await db.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  });

  cookies().set("session_id", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return Response.json({ success: true });
}
```

## Pros

* Very secure
* Easy logout (invalidate session)
* Works great with SSR

## Cons

* Requires session store
* Harder to scale globally

---

# 🔑 Token-Based Authentication (JWT)

## How It Works

* Server issues:

  * **Access Token (short-lived)**
  * **Refresh Token (long-lived)**
* Access token used for API requests
* Refresh token gets new access tokens

## Example

```ts
import jwt from "jsonwebtoken";

const accessToken = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET!,
  { expiresIn: "15m" }
);
```

## Storage Strategy

✅ Best practice:

* Access Token → Memory (React state)
* Refresh Token → HttpOnly Cookie

❌ Avoid:

* localStorage (XSS risk)

## Pros

* Stateless
* Great for microservices
* Mobile-friendly

## Cons

* Hard to revoke
* Token rotation complexity

---

# 🌐 OAuth 2.0 & OpenID Connect

Best option for:

* Google/GitHub login
* Enterprise SSO
* B2B apps

## Use Auth.js (NextAuth)

```ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
```

## Why OIDC?

* Standardized
* Delegates security to providers
* Supports MFA

---

# ⚠️ Security Threats & Mitigations

## XSS (Cross-Site Scripting)

**Risk:** Attacker runs JS in your app

### Mitigation

* HttpOnly cookies
* CSP headers
* Sanitize user input

---

## CSRF

**Risk:** Unauthorized requests via cookies

### Mitigation

* SameSite=Lax/Strict
* CSRF tokens
* Double-submit cookies

---

## Token Theft

### Mitigation

* Short token lifetimes
* Refresh token rotation
* Device binding

---

## Brute Force

### Mitigation

* Rate limiting
* CAPTCHA after attempts
* Account lockouts

---

# 🛠 Implementation Guide

## Step 1 — Password Security

```ts
import bcrypt from "bcrypt";

const hash = await bcrypt.hash(password, 12);
```

✅ Never store plain passwords

---

## Step 2 — Protect Routes

### Middleware Example

```ts
// middleware.ts
import { NextResponse } from "next/server";

export function middleware(req: any) {
  const session = req.cookies.get("session_id");

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
```

---

## Step 3 — API Protection

* Validate auth in every API route
* Use role-based access control (RBAC)

---

## Step 4 — Logging & Monitoring

Track:

* Failed logins
* Suspicious IPs
* Token abuse

---

# ✅ Best Practices

✔ Use HTTPS everywhere
✔ Rotate secrets regularly
✔ Short session lifetime
✔ Implement logout everywhere
✔ Validate all inputs
✔ Use Zod/Yup for validation
✔ Enable 2FA for sensitive apps
✔ Keep dependencies updated

---
