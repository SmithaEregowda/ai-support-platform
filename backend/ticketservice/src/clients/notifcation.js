export const sendNotification = async (notificationData) => {
    const baseUrl = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:8082";
    const serviceToken = process.env.NOTIFICATION_SERVICE_TOKEN || "internal-service-token";

    try {
        const response = await fetch(`${baseUrl}/api/notifications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${serviceToken}`,
            },
            body: JSON.stringify(notificationData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to send notification: ${response.status} ${errorText || response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error sending notification:", error);
        throw error;
    }
};