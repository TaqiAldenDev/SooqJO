'use client';

import { useState } from 'react';
import { OrderStatus } from '@/types';
import { Loader2 } from 'lucide-react';

interface StatusBadgeProps {
  status: OrderStatus;
  orderId: string;
  onUpdate?: () => void;
}

const statusColors: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export function StatusSelector({ status, orderId, onUpdate }: StatusBadgeProps) {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');
      
      setCurrentStatus(newStatus as OrderStatus);
      if (onUpdate) onUpdate();
    } catch (error) {
      alert('Error updating status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block">
      {loading && <Loader2 className="absolute -right-6 top-1 animate-spin text-blue-600" size={16} />}
      <select
        value={currentStatus}
        onChange={(e) => handleChange(e.target.value)}
        disabled={loading}
        className={`text-xs font-semibold px-3 py-1 rounded-full border-none outline-none cursor-pointer appearance-none ${statusColors[currentStatus]}`}
      >
        <option value="PENDING">PENDING</option>
        <option value="PROCESSING">PROCESSING</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
    </div>
  );
}
