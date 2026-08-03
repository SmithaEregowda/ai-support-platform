import { createNotification, GetNotificationById,
     UpdateNotificationIsRead, DeleteNotification, GetNotifications } 
from '../services/notification.service.js';

export const createNotificationController = async (req, res) => {
    try {
        const { userId, message, referenceId, referenceType, title} = req.body;
        const notification = await createNotification(userId, message, referenceId, referenceType, title);
        res.status(201).json(notification);
    } catch (error) {
        console.error("Error creating notification:", error);
        res.status(500).json({ error: "Error creating notification" });
    }
};

export const getNotificationsController = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in the request object
        const notifications = await GetNotifications(userId);
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Error fetching notifications" });
    }
};

export const GetNotificationByIdController = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const userId = req.user.id; // Assuming user ID is available in the request object
        const notification = await GetNotificationById(notificationId, userId);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json(notification);
    } catch (error) {
        console.error("Error fetching notification by ID:", error);
        res.status(500).json({ error: "Error fetching notification by ID" });
    }
};

export const UpdateNotificationController = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const { isRead } = req.body;
        const userId = req.user.id; // Assuming user ID is available in the request object
        const updatedNotification = await UpdateNotificationIsRead(notificationId, userId, isRead);
        if (!updatedNotification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json(updatedNotification);
    } catch (error) {
        console.error("Error updating notification is_read status:", error);
        res.status(500).json({ error: "Error updating notification is_read status" });
    }
};

export const DeleteNotificationController = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const userId = req.user.id; // Assuming user ID is available in the request object
        const deletedNotification = await DeleteNotification(notificationId, userId);
        if (!deletedNotification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json(deletedNotification);
    } catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ error: "Error deleting notification" });
    }
};