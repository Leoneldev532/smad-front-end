
'use server'
import { Resend } from 'resend';
import { toast } from 'sonner';

export  const   GetAudience  = async (resendApikey:string | null) => {
    const resend = new Resend(resendApikey || " ");
    const result = await resend.audiences.list();
    return result
}

export  const   getAEmailsOfOneAudience  = async (resendApikey:string | null,idAudience:string) => {
    const resend = new Resend(resendApikey || " ");
    const result = await resend.contacts.list({
        audienceId: idAudience,
      });
    return result
}


export const getUniqueElement = (array1: string[], array2: string[]) => {
    const set2 = new Set(array2);
    return array1.filter(item => !set2.has(item));
};


export const SendContactToAudience  = async (
    idAudienceSelected: string,
    resendApikey: string,
    data: any[]
) => {
    const resend = new Resend(resendApikey);
    const AudiencesDataAvailable = await getAEmailsOfOneAudience(resendApikey, idAudienceSelected);
    const tabAudiencesEmailsAvailable =  AudiencesDataAvailable?.data?.data?.map((item) => item.email) || [];
    const tabEmail = getUniqueElement(data, tabAudiencesEmailsAvailable);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


    const results = await Promise.all(
        tabEmail.map(async (contact, index) => {
            try {
                await resend.contacts.create({
                    email: contact,
                    audienceId: idAudienceSelected,
                });
                await delay(1000); // Ajoute un délai de 1 seconde entre les requêtes
                return { success: true, email: contact };
            } catch (error: any) {
                console.error(`Error adding contact ${contact} to the audience:`, error);
                return { success: false, email: contact, error: error?.message };
            }
        })
    );

    const successes = results.filter((result) => result.success);
    const errors = results.filter((result) => !result.success);

    if (errors.length > 0) {
        console.error("Some contacts failed to be added:", errors);
    }

    return {
        success: successes.length === data.length,
        successes: successes,
        errors: errors,
    };
};


// export const SendContactToAudience = async (idAudienceSelected: string, resendApikey: string, data: string[]) => {

//     const resend = new Resend(resendApikey);

//     console.log(idAudienceSelected, "idAudienceSelected", resendApikey, "resendApikey", data, "data");

//     const promises = data.map((contact) => {
//         return resend.contacts.create({
//             email: contact,
//             audienceId: idAudienceSelected
//         });
//     });

//     try {
//         await Promise.all(promises);
//         console.log("All promises resolved");
//         return { success: true };
//     } catch (error) {
//         console.error('Error adding contacts to the audience:', error);
//         return { success: false, error: (error?.message as any)};
//     }
// };

