import AnalyticsLayoutWrapper from '@/components/pages/analytics/AnalyticsLayoutWrapper'
import React from 'react'

export const metadata = {
  title: 'Tableau de Bord Analytique | Sumo Admin',
  description: 'Analyses, statistiques et rapports de performance',
}

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AnalyticsLayoutWrapper>{children}</AnalyticsLayoutWrapper>
}