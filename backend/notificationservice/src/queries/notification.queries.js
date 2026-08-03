 export const CREATE_NOTIFICATION_QUERY = `
    INSERT INTO notifications (user_id, title, message, is_read, referenceId, referenceType)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;

export const GET_NOTIFICATIONS_QUERY = `
    SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC;
`;

export const GET_NOTIFICATION_BY_ID_QUERY = `
    SELECT * FROM notifications WHERE id = $1 AND user_id = $2;
`;

export const UPDATE_NOTIFICATION_IS_READ_QUERY = `
    UPDATE notifications
    SET is_read = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND user_id = $3
    RETURNING *;
`;

export const DELETE_NOTIFICATION_QUERY = `
    DELETE FROM notifications WHERE id = $1 AND user_id = $2 RETURNING *;
`;