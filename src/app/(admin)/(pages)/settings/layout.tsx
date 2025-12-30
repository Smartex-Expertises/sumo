import SettingsLayoutWrapper from '@/components/pages/settings/SettingsLayoutWrapper'
import React from 'react'

export const metadata = {
  title: 'Paramètres Système | Sumo Admin',
  description: 'Configuration de la plateforme, commissions et paramètres système',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SettingsLayoutWrapper>{children}</SettingsLayoutWrapper>
}