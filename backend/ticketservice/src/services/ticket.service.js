import { CREATE_TICKET_QUERY, GET_TICKETS_QUERY,
     GET_TICKET_BY_ID_QUERY, UPDATE_TICKET_QUERY } from "../queries/ticket.queries.js";
import pool from "../config/db.js";

export const CreateTickets = async (title, description, status, priority, userId) => {
    try {
        const result = await pool.query(CREATE_TICKET_QUERY, [
            title,
            description,
            status || "OPEN",
            priority || "MEDIUM",
            userId,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating ticket:", error);
        throw error;
    }
};

export const GetTickets = async (userId) => {
    try {
        const result = await pool.query(GET_TICKETS_QUERY, [userId]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error;
    }
};

export const GetTicketById = async (ticketId, userId) => {
    try {
        const result = await pool.query(GET_TICKET_BY_ID_QUERY, [ticketId, userId]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching ticket by ID:", error);
        throw error;
    }
};

export const UpdateTicket = async (ticketId, title, description, status, priority, userId) => {
    try {
        const result = await pool.query(UPDATE_TICKET_QUERY, [
            title,
            description,
            status,
            priority,
            ticketId,
            userId,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating ticket:", error);
        throw error;
    }
};

export const DeleteTicket = async (ticketId, userId) => {
    try {
        const result = await pool.query(DELETE_TICKET_QUERY, [ticketId, userId]);
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting ticket:", error);
        throw error;
    }
};