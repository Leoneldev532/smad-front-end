"use client"
import React,{useEffect} from 'react';
import { YouTubeEmbed } from '@next/third-parties/google'
import CodeHighlight from '@/components/CodeSection';
import CodeHighlightWriter from '@/components/CodeSectionWritter';
import CodeBlock from '@/components/editor';


const Page = () => {



    return (
      <section className="flex justify-start px-8 flex-col items-start w-full h-full">
      <h5 className="text-xl font-bold mb-4 text-left text-neutral-400 w-full py-4">How it works?</h5>

      <div className="flex justify-start bg-white/70 border-white/70 border-[0.4px] overflow-hidden items-start h-56 md:h-[28rem] w-full rounded-lg">
        <YouTubeEmbed videoid="vQO3hDJEhzo" height={1500} width={1000} />
      </div>

      <h1 className="text-3xl text-neutral-300 font-bold mb-4 text-left w-full py-4 max-w-xl">How to build a mailing list, waitlist in less than 2 minutes</h1>

      <div className="w-full overflow-hidden border-t border-neutral-500/40">
        <h3 className="text-xl text-yellow-400 font-bold mb-4 text-left w-full pt-4 max-w-xl">Use our API endpoints for custom integration</h3>

        <div>
        <h2 className="text-xl font-semibold mb-4">Save an Email to Your Mailing List</h2>

        <p className="text-neutral-400 mb-2">
          To add an email to your mailing list, make a POST request to the following endpoint:
        </p>

        <pre className="bg-gray-800 text-white p-4 rounded mb-4">
          <code className="language-javascript">
          POST: https://api.smadmail.com/api/v1/email/save
          </code>
        </pre>

        <p className="text-neutral-400 mb-2">
          The request body should be a JSON object with the following structure:
        </p>

        <CodeBlock language='javascript' code={`{
    email: string;
    project_id: string;
    private_key: string;
  }`} />

        <p className="text-neutral-400 py-4 mb-2">
          <strong className="text-2xl">Field Descriptions:</strong>
        </p>

        <ul className="list-disc list-inside flex flex-col gap-y-6 justify-start items-start text-neutral-400 mb-4">
          <li><code className="bg-neutral-800 py-1 px-3 border border-neutral-700 rounded">email</code> : The email address you want to add to your mailing list.</li>
          <li><code className="bg-neutral-800 py-1 px-3 border border-neutral-700 rounded">project_id</code> : The unique identifier of your project. Replace <code>{"123-456-789-000"}</code> with your own project ID. You can retrieve it by clicking the{ "Copy Project ID"} button on the dashboard.</li>
          <li><code className="bg-neutral-800 py-1 px-3 border border-neutral-700 rounded">private_key</code> : Your private key to authenticate the request. Replace <code>{"your_private_key_here"}</code> with your private key. You can retrieve it on the <code>/account</code> page accessible by clicking on the chevron near your profile picture and selecting the "Account & Pricing" menu. Then, on the new page, copy the <code>private_key</code>.</li>
        </ul>

        <p className="text-neutral-400 mb-2">
          <strong className="text-2xl">Request Example:</strong>
        </p>

        <CodeBlock language='javascript' code={`{
    "email": "example@gmail.com",
    "project_id": "123-456-789-000",
    "private_key": "your_private_key_here"
  }`} />

        <p className="text-neutral-400 py-3">
          <strong className={"text-2xl"}>Instructions:</strong>
        </p>

        <ol className="list-decimal list-inside text-lg text-neutral-400 mb-4">
          <li>Replace the example values with your actual data.</li>
          <li>The private key is essential for authentication. Keep it secret, it should be stored as an environment variable.</li>
          <li>Ensure the email address is valid before sending the request to avoid errors.</li>
        </ol>

        <p className="text-neutral-400 py-3">
          <strong className={"text-2xl"}>Status Descriptions:</strong>
        </p>

        <ul className="list-disc list-inside flex flex-col gap-y-6 justify-start items-start text-neutral-400 mb-4">
          <li><code className="bg-red-800 py-1 px-3 border border-red-700 rounded">400 Bad Request</code>: Private key is required.</li>
          <li><code className="bg-orange-800 py-1 px-3 border border-orange-700 rounded">401 Unauthorized</code>: Invalid private key.</li>
          <li><code className="bg-blue-800 py-1 px-3 border border-blue-700 rounded">404 Not Found</code>: User not found or invalid project ID or the project does not belong to the user.</li>
          <li><code className="bg-purple-800 py-1 px-3 border border-purple-700 rounded">500 Internal Server Error</code>: Internal server error.</li>
        </ul>
        </div>
      </div>
      </section>
    );
};

export default Page;
