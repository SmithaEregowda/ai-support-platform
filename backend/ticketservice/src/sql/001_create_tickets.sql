CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS tickets CASCADE;

CREATE TABLE tickets (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    title VARCHAR(255) NOT NULL,

    description TEXT NOT NULL,

    status VARCHAR(30)
    DEFAULT 'OPEN',

    priority VARCHAR(20)
    DEFAULT 'MEDIUM',

    assigned_to UUID,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);