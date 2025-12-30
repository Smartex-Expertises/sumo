'use client';

export default function AuthLayoutWrapper({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">

                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Sécurité</h1>
                    <p className="text-gray-600 mt-2">
                        Gestion des rôles, permissions et journaux de sécurité
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">


                {/* Main Content Area */}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}