import SupportLayoutWrapper from "@/components/pages/support/SupportLayoutWrapper"


export const metadata = {
  title: 'Centre de Support | Sumo Admin',
  description: 'Gérez les réclamations, signalements et tickets de support',
}

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SupportLayoutWrapper>{children}</SupportLayoutWrapper>
}