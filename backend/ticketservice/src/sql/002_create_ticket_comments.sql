CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS ticket_comments CASCADE;

CREATE TABLE ticket_comments (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    ticket_id UUID NOT NULL,

    user_id UUID NOT NULL,

    message TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(ticket_id) 
    REFERENCES tickets(id) 
    ON DELETE CASCADE
    -- foreign key constraint to reference the tickets table 
    -- On DELETE CASCADE ensures that if a ticket is deleted, all associated comments are also deleted

);