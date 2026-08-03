CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS notifications CASCADE;

CREATE TABLE notifications (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    title VARCHAR(255) NOT NULL,

    message TEXT NOT NULL,

    type VARCHAR(30),

    is_read VARCHAR(20)
    DEFAULT 'false',

    referenceId UUID NOT NULL,

    referenceType VARCHAR(30) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);