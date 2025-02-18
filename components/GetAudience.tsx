
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


export const  getUniqueElement = (array1:string[], array2:string[]) => {
    const set2 = new Set(array2);
    return array1.filter(item => !set2.has(item));
}



export const SendContactToAudience = async (idAudienceSelected: string, resendApikey: string, data: string[]) => {

    const AudiencesDataAvailable=  await getAEmailsOfOneAudience(resendApikey, idAudienceSelected);
    const tabAudiencesEmailsAvailable = AudiencesDataAvailable?.data?.data.map((item)=>item.email)
    const tabEmail =  getUniqueElement(data,tabAudiencesEmailsAvailable || [])

    if(tabEmail.length === 0) return null;

    const resend = new Resend(resendApikey);


    const promises = tabEmail.map((contact) => {
        return resend.contacts.create({
            email: contact,
            audienceId: idAudienceSelected
        });
    });

    try {
        await Promise.all(promises);
        console.log("All promises resolved");
        return { success: true };
    } catch (error:any) {
        console.error('Error adding contacts to the audience:', error);
        return { success: false, error: (error?.message)};
    }
};

