import React from 'react'
import RidesLayout from '@/components/pages/rides/RidesLayout'

export const metadata = {
  title: 'Courses | Sumo Admin',
  description: 'Gestion des courses et analyse des performances',
}

export default function RidesLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <RidesLayout>{children}</RidesLayout>
}