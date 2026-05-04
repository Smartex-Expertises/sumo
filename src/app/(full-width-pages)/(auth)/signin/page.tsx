import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | Sumo Mobility Admin",
  description: "Tableau de bord administrateur Sumo Mobility",
};

export default function SignIn() {
  return <SignInForm />;
}
