import AuthLayoutWrapper from '@/components/pages/auth/AuthLayoutWrapper'
import React from 'react'

export const metadata = {
  title: 'Sécurité et Authentification | Sumo Admin',
  description: 'Gestion des rôles, permissions et journaux de sécurité',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
}