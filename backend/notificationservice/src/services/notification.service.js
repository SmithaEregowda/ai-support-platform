import {
  CREATE_NOTIFICATION_QUERY,
  UPDATE_NOTIFICATION_IS_READ_QUERY,
  GET_NOTIFICATIONS_QUERY,
  DELETE_NOTIFICATION_QUERY,
  GET_NOTIFICATION_BY_ID_QUERY,
} from "../queries/notification.queries.js";
import pool from "../config/db.js";

export const createNotification = async (userId, message, referenceId, referenceType, title) => {
  try {
    const normalizedUserId = String(userId || "");
    const normalizedReferenceId = String(referenceId || "");
    const normalizedTitle = title?.trim() || "New notification";

    const result = await pool.query(CREATE_NOTIFICATION_QUERY, [
      normalizedUserId,
      normalizedTitle,
      message,
      false,
      normalizedReferenceId,
      referenceType,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating notification:", error);
    throw new Error("Error creating notification");
  }
};

export const CreateNotification = createNotification;

export const GetNotifications = async (userId) => {
  try {
    const result = await pool.query(GET_NOTIFICATIONS_QUERY, [userId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Error fetching notifications");
  }
};

export const getNotifications = GetNotifications;

export const GetNotificationById = async (notificationId, userId) => {
  try {
    const result = await pool.query(GET_NOTIFICATION_BY_ID_QUERY, [notificationId, userId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching notification by ID:", error);
    throw new Error("Error fetching notification by ID");
  }
};

export const getNotificationById = GetNotificationById;

export const UpdateNotificationIsRead = async (notificationId, userId, isRead) => {
  try {
    const result = await pool.query(UPDATE_NOTIFICATION_IS_READ_QUERY, [
      isRead,
      notificationId,
      userId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating notification is_read status:", error);
    throw new Error("Error updating notification is_read status");
  }
};

export const updateNotificationIsRead = UpdateNotificationIsRead;

export const DeleteNotification = async (notificationId, userId) => {
  try {
    const result = await pool.query(DELETE_NOTIFICATION_QUERY, [notificationId, userId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw new Error("Error deleting notification");
  }
};

export const deleteNotification = DeleteNotification;