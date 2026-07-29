import { CreateTickets, GetTickets, GetTicketById, UpdateTicket} from "../services/ticket.service.js";

export const CreateTicketsController = async (req, res) => {
    const { title, description, status, priority } = req.body;
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
        return res.status(401).json({
            status: "Not Authorized",
            error: "Authenticated user id is missing",
        });
    }

    try {
        const result = await CreateTickets(title, description, status, priority, userId);
        res.status(201).json({
            status: "Ticket Created Successfully",
            ticket: result,
        });
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({
            status: "Error creating ticket",
            error: error.message,
        });
    }
};

export const GetTicketsController=async (req,res)=>{
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
        return res.status(401).json({
            status: "Not Authorized",
            error: "Authenticated user id is missing",
        });
    }

    try {
        const tickets = await GetTickets(userId);
        res.status(200).json({
            status: "Tickets fetched successfully",
            tickets: tickets,
        });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({
            status: "Error fetching tickets",
            error: error.message,
        });
    }
};

export const GetTicketByIdController=async (req,res)=>{
    try {
        const ticketId = req.params.ticketId;
        const userId = req.user?.userId || req.user?.id;

        if (!userId) {
            return res.status(401).json({
                status: "Not Authorized",
                error: "Authenticated user id is missing",
            });
        }

        const ticket = await GetTicketById(ticketId, userId);

        if (!ticket) {
            return res.status(404).json({
                status: "Ticket Not Found",
                error: `No ticket found with ID ${ticketId} for the authenticated user`,
            });
        }

        res.status(200).json({
            status: "Ticket fetched successfully",
            ticket: ticket,
        });
    } catch (error) {
        console.error("Error fetching ticket by ID:", error);
        res.status(500).json({
            status: "Error fetching ticket by ID",
            error: error.message,
        });
    }
}

export const UpdateTicketController=async (req,res)=>{
    const ticketId = req.params.ticketId;
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
        return res.status(401).json({
            status: "Not Authorized",
            error: "Authenticated user id is missing",
        });
    }

    const ticket = await GetTicketById(ticketId, userId);

    if (!ticket) {
        return res.status(404).json({
            status: "Ticket Not Found",
            error: `No ticket found with ID ${ticketId} for the authenticated user`,
        });
    };

    const updatedticketdata={
        ...ticket,
        ...req.body
    }

    try {
        const result = await UpdateTicket(updatedticketdata?.id, updatedticketdata?.title, updatedticketdata?.description, updatedticketdata?.status, updatedticketdata?.priority, userId);
        res.status(200).json({
            status: "Ticket updated successfully",
            ticket: result,
        });
    } catch (error) {
        console.error("Error updating ticket:", error);
        res.status(500).json({
            status: "Error updating ticket",
            error: error.message,
        });
    }
};

export const DeleteTicketController=async (req,res)=>{
    try {
        const ticketId = req.params.ticketId;
        const userId = req.user?.userId || req.user?.id;

        if (!userId) {
            return res.status(401).json({
                status: "Not Authorized",
                error: "Authenticated user id is missing",
            });
        }

        const ticket = await GetTicketById(ticketId, userId);

        if (!ticket) {
            return res.status(404).json({
                status: "Ticket Not Found",
                error: `No ticket found with ID ${ticketId} for the authenticated user`,
            });
        };

        const result = await DeleteTicket(ticketId, userId);
        res.status(200).json({
            status: "Ticket deleted successfully",
            ticket: result,
        });
    } catch (error) {
        console.error("Error deleting ticket:", error);
        res.status(500).json({
            status: "Error deleting ticket",
            error: error.message,
        });
    }

}