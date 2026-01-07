'use client';

import { useState } from 'react';

export default function CsvExportButton() {
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/appointments/export');
            if (!response.ok) throw new Error('Export failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `appointments-export-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export CSV. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={loading}
            className="btn btn-primary"
            style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem', cursor: loading ? 'wait' : 'pointer' }}
        >
            {loading ? 'Exporting...' : 'Export CSV →'}
        </button>
    );
}
