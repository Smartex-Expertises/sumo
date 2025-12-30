import DriversLayout from '@/components/pages/drivers/DriversLayout'
import React from 'react'

export const metadata = {
  title: 'Gestion des Chauffeurs | Sumo Admin',
  description: 'Gérez les chauffeurs, documents, courses et revenus',
}

export default function DriversLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <DriversLayout>{children}</DriversLayout>
}