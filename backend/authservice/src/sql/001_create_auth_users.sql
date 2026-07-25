CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS auth_users CASCADE;

CREATE TABLE auth_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    user_details JSONB NOT NULL DEFAULT '{"role": "CUSTOMER", "is_verified": false, "first_name": "", "last_name": ""}',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);