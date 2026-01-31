# Troubleshooting installazione (npm 403)

Se `npm install` ritorna `403 Forbidden` verso `https://registry.npmjs.org`,
vuol dire che il registry pubblico è bloccato o richiede un proxy/credenziali.

## 1) Configura un registry alternativo/mirror
Sostituisci `<REGISTRY_URL>` con quello fornito dal tuo IT (Artifactory,
Verdaccio, Nexus, ecc.).

```bash
npm config set registry <REGISTRY_URL>
```

## 2) Configura proxy se richiesto
Assicurati che le variabili d’ambiente proxy siano corrette.

```bash
export HTTP_PROXY=http://user:pass@proxy:port
export HTTPS_PROXY=http://user:pass@proxy:port
```

In alternativa:

```bash
npm config set proxy http://proxy:port
npm config set https-proxy http://proxy:port
```

## 3) Login al registry privato
Se il registry richiede autenticazione:

```bash
npm login --registry <REGISTRY_URL>
```

## 4) Esempio veloce (solo in caso di blocco npmjs.org)
Se la tua rete consente un mirror pubblico:

```bash
npm config set registry https://registry.npmmirror.com/
```

> Nota: usa sempre il registry approvato dalla tua organizzazione.
