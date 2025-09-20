
export interface TicketsProps {
    name: string;
    description: string;
    status: string;
    id: string;
    created_at?: Date | null;
    updated_at?: Date | null;
    customerId?: string | null;
    userId?: string | null;
}