'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeletePatientButton({ patientEmail, patientName }: { patientEmail: string; patientName: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmed = confirm(
            `⚠️ Are you sure you want to delete all appointments for ${patientName}?\n\nThis action cannot be undone.`
        );

        if (!confirmed) return;

        setIsDeleting(true);

        try {
            const response = await fetch('/api/patients/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: patientEmail })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`✅ Deleted ${data.deletedCount} appointment(s) for ${patientName}`);
                router.push('/admin/patients');
            } else {
                alert(`❌ Error: ${data.error}`);
                setIsDeleting(false);
            }
        } catch (error) {
            alert('❌ Failed to delete patient');
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-primary"
            style={{
                backgroundColor: '#dc2626',
                opacity: isDeleting ? 0.7 : 1,
                cursor: isDeleting ? 'not-allowed' : 'pointer'
            }}
        >
            {isDeleting ? 'Deleting...' : '🗑️ Delete Patient'}
        </button>
    );
}
