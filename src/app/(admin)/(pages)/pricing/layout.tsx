import PricingLayoutWrapper from '@/components/pages/pricing/PricingLayoutWrapper'
import React from 'react'

export const metadata = {
  title: 'Gestion des Tarifs | Sumo Admin',
  description: 'Gérez les tarifs, heures de pointe et codes promotionnels',
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PricingLayoutWrapper>{children}</PricingLayoutWrapper>
}