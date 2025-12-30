import React from 'react'
import PassengersLayout from '@/components/pages/passengers/PassengersLayout'

export const metadata = {
  title: 'Passagers | Sumo Admin',
  description: 'Gestion des passagers et support client',
}

export default function PassengersLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <PassengersLayout>{children}</PassengersLayout>
}