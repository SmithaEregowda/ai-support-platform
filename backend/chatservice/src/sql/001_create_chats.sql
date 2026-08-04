CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS chats CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    ticket_id UUID NOT NULL UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    chat_id UUID NOT NULL,

    sender_id UUID NOT NULL,

    sender_role VARCHAR(20) NOT NULL,

    message TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (chat_id)
        REFERENCES chats(id)
        ON DELETE CASCADE
);
