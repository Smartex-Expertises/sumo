import React from 'react'
import PaymentsLayout from '@/components/pages/payments/PaymentsLayout'

export const metadata = {
  title: 'Paiements | Sumo Admin',
  description: 'Gestion des transactions et finances',
}

export default function PaymentsLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <PaymentsLayout>{children}</PaymentsLayout>
}