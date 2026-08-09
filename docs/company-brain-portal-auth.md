# Company Brain portal authentication

The portal fails closed unless all five server-only values are configured:

- `PORTAL_SESSION_SECRET`: at least 32 random characters. It signs the HTTP-only portal cookie.
- `PORTAL_SESSION_STORE_DIR`: an absolute, server-only directory on the filesystem shared by every request-serving process on the host. The service identity must be able to create/write it; the runtime enforces directory mode `0700` and file mode `0600`.
- `PORTAL_SESSION_DEPLOYMENT_MODE=single-host-shared-filesystem`: documents and enforces the current single-host deployment invariant. Do not horizontally distribute the portal until this store is moved to an authoritative shared service.
- `PORTAL_TRUST_PROXY=nginx`: permits the rate limiter to use `X-Real-IP`. The Nginx edge must overwrite—not append or preserve—caller-supplied `X-Real-IP`, and the Next.js port must not be publicly reachable.
- `PORTAL_AUTH_CREDENTIALS_JSON`: a JSON object mapping normalized user email addresses to versioned scrypt credentials.

Example shape only:

```json
{
  "owner@example.com": "scrypt$v1$16384$8$1$<salt>$<derived-key>"
}
```

Generate one credential without printing the plaintext password:

```bash
npm run company-brain:generate-credential
```

The command reads interactively without echo when attached to a terminal. It can also read a password from standard input for controlled automation. Store only the generated credential in the protected server environment; never commit the password, credential JSON, or session secret.

Rules:

- Each allowed actor email in the server-side portal user registry gets its own credential.
- The unauthenticated session endpoint returns only `{ "authenticated": false }`.
- Every successful login creates a new random runtime session key, even for the same actor.
- Login attempts use bounded, shared-on-host global, client-IP, and account buckets under the protected session store. Successful login clears only the account bucket; it does not erase IP/global pressure.
- Unknown accounts still execute the dummy scrypt path before identity lookup returns.
- Logout decodes the signed token independently of active-store lookup and returns `503` unless revocation can be authoritatively confirmed. A success response means replay is rejected by the shared-on-host store.
- Portal pages are guarded on the server before protected content renders.
- The credential JSON and session secret must remain server-only and must not use a `NEXT_PUBLIC_` name.
