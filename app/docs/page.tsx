"use client"
import CodeHighlight from '@/components/CodeSection';
import React from 'react';

const Page = () => {
    return (
        <section className="flex justify-center flex-col items-center w-full h-full">
            <h1 className="text-3xl font-bold mb-4 text-left w-full line">Créez votre propre formulaire</h1>
            <div className="max-w-4xl mx-auto p-6 bg-transparent rounded-lg shadow-md">
                <p className="mb-4 text-gray-700">
                    L&apos;API smadmail fournit un endpoint pour enregistrer des adresses email. Cet endpoint est utilisé pour collecter et stocker des adresses email dans le cadre de campagnes marketing, newsletters, ou autres services nécessitant l&apos;inscription par email.
                </p>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Endpoint</h2>
                    <p className="text-gray-700"><strong>URL :</strong> https://api.smadmail.com/api/v1/email/save</p>
                    <p className="text-gray-700"><strong>Méthode :</strong> POST</p>
                    <p className="text-gray-700"><strong>Description :</strong> Cet endpoint permet d&apos;enregistrer une adresse email avec des informations supplémentaires telles que project_id et private_key.</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Paramètres de Requête</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li><strong>email (string, requis) :</strong> L&apos;adresse email à enregistrer.</li>
                        <li><strong>project_id (string, requis) :</strong> L&apos;identifiant du projet auquel l&apos;adresse email est associée.</li>
                        <li><strong>private_key (string, requis) :</strong> La clé privée utilisée pour authentifier la requête.</li>
                    </ul>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">En-têtes de Requête</h2>
                    <p className="text-gray-700"><strong>Content-Type :</strong> application/json</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Exemple de Requête</h2>
                    <CodeHighlight code={`POST https://api.smadmail.com/api/v1/email/save\nContent-Type: application/json\n\n{\n  &quot;email&quot;: &quot;johndoe@example.com&quot;,\n  &quot;project_id&quot;: &quot;your_project_id&quot;,\n  &quot;private_key&quot;: &quot;your_private_key&quot;\n}`} /> 
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code>
                            &quot;email&quot;: &quot;johndoe@example.com&quot;,<br />
                            &quot;project_id&quot;: &quot;your_project_id&quot;,<br />
                            &quot;private_key&quot;: &quot;your_private_key&quot;<br />
                        </code>
                    </pre>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Réponse</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li><strong>Status 200 OK :</strong> La requête a été traitée avec succès.</li>
                        <li><strong>Status 400 Bad Request :</strong> La requête est mal formée ou des paramètres sont manquants.</li>
                        <li><strong>Status 401 Unauthorized :</strong> La clé privée est invalide ou manquante.</li>
                        <li><strong>Status 500 Internal Server Error :</strong> Une erreur serveur s&apos;est produite.</li>
                    </ul>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Exemple de Réponse</h2>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code>
                            {'{'}<br />
                            &nbsp;&nbsp;&quot;status&quot;: &quot;success&quot;,<br />
                            &nbsp;&nbsp;&quot;message&quot;: &quot;Email enregistré avec succès.&quot;<br />
                            {'}'}
                        </code>
                    </pre>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Utilisation</h2>
                    <p className="text-gray-700">
                        Pour utiliser cet endpoint, vous devez envoyer une requête POST avec les paramètres requis (email, project_id, private_key) au format JSON. Assurez-vous d&apos;inclure l&apos;en-tête Content-Type: application/json.
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Exemple d&apos;utilisation en JavaScript avec Axios</h2>
                    <CodeHighlight code={`
const API_URL = &quot;https://api.smadmail.com/api/v1/email/save&quot;;
const CONTENT_TYPE = &quot;application/json&quot;;

const saveEmail = async (email, project_id, private_key) => {
  try {
    const response = await axios.post(API_URL, {
      email,
      project_id,
      private_key
    }, {
      headers: {
        &quot;Content-Type&quot;: CONTENT_TYPE
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(&apos;Erreur lors de l&apos;enregistrement de l&apos;email:&apos;, error);
  }
};

// Exemple d&apos;appel
saveEmail(&apos;johndoe@example.com&apos;, &apos;your_project_id&apos;, &apos;your_private_key&apos;);
                    `} />
                </div>
            </div>
        </section>
    );
};

export default Page;
