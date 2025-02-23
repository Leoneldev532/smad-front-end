
"use client"
import CodeHighlight from '@/components/CodeSection';
import React from 'react';

const Page = () => {
    return (
        <section className="flex justify-center flex-col items-center w-full h-full">

                <h1 className="text-3xl font-bold mb-4 text-left w-full line  ">Create your own Form</h1>

            <div className="max-w-4xl mx-auto p-6 bg-transparent rounded-lg shadow-md">
                <p className="mb-4 text-gray-700"></p>
                    L'API smadmail fournit un endpoint pour enregistrer des adresses email. Cet endpoint est utilisé pour collecter et stocker des adresses email dans le cadre de campagnes marketing, newsletters, ou autres services nécessitant l'inscription par email.
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Endpoint</h2>
                    <p className="text-gray-700"><strong>URL :</strong> https://api.smadmail.com/api/v1/email/save</p>
                    <p className="text-gray-700"><strong>Méthode :</strong> POST</p>
                    <p className="text-gray-700"><strong>Description :</strong> Cet endpoint permet d'enregistrer une adresse email avec des informations supplémentaires telles que project_id et private_key.</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Paramètres de Requête</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li><strong>email (string, requis) :</strong> L'adresse email à enregistrer.</li>
                        <li><strong>project_id (string, requis) :</strong> L'identifiant du projet auquel l'adresse email est associée.</li>
                        <li><strong>private_key (string, requis) :</strong> La clé privée utilisée pour authentifier la requête.</li>
                    </ul>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">En-têtes de Requête</h2>
                    <p className="text-gray-700"><strong>Content-Type :</strong> application/json</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Exemple de Requête</h2>

                    <CodeHighlight code={`POST https://api.smadmail.com/api/v1/email/save<br />
                            Content-Type: application/json<br />
                           
                           "email": "johndoe@example.com",
                            "project_id": "your_project_id",
                            "private_key": "your_private_key"
                          `} /> 

                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code>
                            
                        </code>
                    </pre>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Response</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li><strong>Status 200 OK :</strong> The request was successfully processed.</li>
                        <li><strong>Status 400 Bad Request :</strong> The request is malformed or parameters are missing.</li>
                        <li><strong>Status 401 Unauthorized :</strong> The private key is invalid or missing.</li>
                        <li><strong>Status 500 Internal Server Error :</strong> A server error occurred.</li>
                    </ul>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Response Example</h2>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code>
                            {'{'}<br />
                            &nbsp;&nbsp;"status": "success",<br />
                            &nbsp;&nbsp;"message": "Email successfully registered."<br />
                            {'}'}
                        </code>
                    </pre>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Usage</h2>
                    <p className="text-gray-700">
                        To use this endpoint, you must send a POST request with the required parameters (email, project_id, private_key) in JSON format. Make sure to include the Content-Type: application/json header.
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">JavaScript Usage Example with Axios</h2>
                    <CodeHighlight  code={`
const API_URL = "https://api.smadmail.com/api/v1/email/save";
const CONTENT_TYPE = "application/json";

const saveEmail = async (email, project_id, private_key) => {
  try {
    const response = await axios.post(API_URL, {
      email,
      project_id,
      private_key
    }, {
      headers: {
        "Content-Type": CONTENT_TYPE
      }
    });
    console.log(response.data);
  }catch (error) {
    console.error('Error registering email:', error);
  }
};

// Example call
saveEmail('johndoe@example.com', 'your_project_id', 'your_private_key');
                        `} />
                       
            </div>
            </div>
        </section>
    );
};

export default Page;
