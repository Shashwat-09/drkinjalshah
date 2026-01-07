'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AppointmentStatusChanger({
    appointmentId,
    currentStatus
}: {
    appointmentId: string;
    currentStatus: string;
}) {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === currentStatus) return;

        setIsUpdating(true);

        try {
            const response = await fetch('/api/appointments/update-status', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ appointmentId, status: newStatus })
            });

            if (response.ok) {
                router.refresh();
            } else {
                alert('❌ Failed to update status');
            }
        } catch (error) {
            alert('❌ Error updating status');
        } finally {
            setIsUpdating(false);
        }
    };

    const statuses = [
        { value: 'pending', label: 'Pending', color: '#fef3c7', textColor: '#92400e' },
        { value: 'confirmed', label: 'Confirmed', color: '#d1fae5', textColor: '#065f46' },
        { value: 'completed', label: 'Completed', color: '#dbeafe', textColor: '#1e40af' },
        { value: 'cancelled', label: 'Cancelled', color: '#fee2e2', textColor: '#991b1b' }
    ];

    return (
        <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: statuses.find(s => s.value === currentStatus)?.color || '#f3f4f6',
                color: statuses.find(s => s.value === currentStatus)?.textColor || '#000',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '500',
                textTransform: 'capitalize',
                border: 'none',
                cursor: isUpdating ? 'not-allowed' : 'pointer',
                opacity: isUpdating ? 0.7 : 1
            }}
        >
            {statuses.map(status => (
                <option key={status.value} value={status.value}>
                    {status.label}
                </option>
            ))}
        </select>
    );
}
