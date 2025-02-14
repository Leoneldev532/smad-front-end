



import { Resend } from 'resend'; // Assurez-vous d'importer correctement le SDK Resend

export const ResendServerComponent = ({ resendApiKey }:{resendApiKey:string}) => {
  // Initialiser l'instance Resend
  const resend = resendApiKey && new Resend(resendApiKey);

  // Récupérer les audiences
  const audiences = resend ? resend.audiences.list() : null;
    console.log(audiences,"0000")
  return {
    resend,
    audiences,
  };
};

