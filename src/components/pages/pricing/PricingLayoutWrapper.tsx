'use client';

import { Tag, Settings, Clock, Ticket } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const menuItems = [
    {
        id: 'settings',
        name: 'Paramètres tarifaires',
        icon: <Settings size={20} />,
        path: '/pricing/settings',
    },
    {
        id: 'peak-hours',
        name: 'Heures de pointe',
        icon: <Clock size={20} />,
        path: '/pricing/peak-hours',
    },
    {
        id: 'promo-codes',
        name: 'Codes promotionnels',
        icon: <Ticket size={20} />,
        path: '/pricing/promo-codes',
    },
];

export default function PricingLayoutWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('settings');

    useEffect(() => {
        if (pathname.includes('/pricing/settings')) setActiveTab('settings');
        if (pathname.includes('/pricing/peak-hours')) setActiveTab('peak-hours');
        if (pathname.includes('/pricing/promo-codes')) setActiveTab('promo-codes');
    }, [pathname]);

    const handleTabClick = (path: string) => {
        router.push(path);
    };

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tarification</h1>
                    <p className="text-gray-600 mt-2">
                        Gérez les tarifs, heures de pointe et promotions
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}