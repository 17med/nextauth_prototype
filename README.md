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

generate key (linux team only)
```shell
openssl rand -base64 32
```

