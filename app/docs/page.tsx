"use client";
import React from "react";
import { YouTubeEmbed } from "@next/third-parties/google";
import CodeHighlight from "@/components/CodeSection";
import CodeHighlightWriter from "@/components/CodeSectionWritter";
import CodeBlock from "@/components/editor";

const Page = () => {
  return (
    <section className="flex justify-start px-8 flex-col items-start w-full h-full">
      <h5 className="text-xl font-bold mb-4 text-left text-neutral-400 w-full py-4">
        How does it work?
      </h5>

      <div className="flex justify-start bg-white/70 border-white/70 border-[0.4px] overflow-hidden items-start h-56 md:h-[28rem] w-full rounded-lg">
        <YouTubeEmbed videoid="vQO3hDJEhzo" height={1500} width={1000} />
      </div>

      <h1 className="text-3xl text-neutral-300 font-bold mb-4 text-left w-full py-4 max-w-xl">
        How to build a mailing list or waitlist in less than 2 minutes
      </h1>

      <div className="w-full overflow-hidden border-t border-neutral-500/40">
        <h3 className="text-xl text-yellow-400 font-bold mb-4 text-left w-full pt-4 max-w-xl">
          Use our API endpoints for custom integration
        </h3>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Save an Email to Your Mailing List
          </h2>

          <p className="text-neutral-400 mb-2">
            To add an email to your mailing list, make a POST request to the
            following endpoint:
          </p>

          <pre className="bg-gray-800 text-white p-4 rounded mb-4">
            <code className="language-javascript">
              POST: https://api.smadmail.com/api/v1/email/save
            </code>
          </pre>

          <p className="text-neutral-400 mb-2">
            The request body should be a JSON object with the following
            structure:
          </p>

          <CodeBlock
            language="javascript"
            code={`{
        email: string;
        project_id: string;
        private_key: string;
        name: string; // Optional, only if "add user name field" is enabled when you create the project
      }`}
          />

          <p className="text-neutral-400 py-4 mb-2">
            <strong className="text-2xl">Field Descriptions:</strong>
          </p>

          <ul className="list-disc list-inside flex flex-col gap-y-6 justify-start items-start text-neutral-400 mb-4">
            <li>
              <code className="bg-neutral-800 py-1 px-3 border border-neutral-700 rounded">
                email
              </code>{" "}
              : The email address you want to add to your mailing list.
            </li>
            <li>
              <code className="bg-neutral-800 py-1 px-3 border border-neutral-700 rounded">
                project_id
              </code>{" "}
              : The unique identifier of your project. Replace{" "}
              <code>{"123-456-789-000"}</code> with your own project ID. You can
              retrieve it by clicking the{" "}
              {"Copy Project ID"} button on the dashboard.
            </li>
            <li>
              <code className="bg-neutral-800 py-1 px-3 border border-neutral-700 rounded">
                private_key
              </code>{" "}
              : Your private key to authenticate the request. Replace{" "}
              <code>{"your_private_key_here"}</code> with your private key. You
              can retrieve it on the <code>/account</code> page accessible by
              clicking on the chevron near your profile picture and selecting
              the {"Account & Pricing"} menu. Then, on the new page, copy the{" "}
              <code>private_key</code>.
            </li>
            <li>
              <code className="bg-neutral-800 py-1 px-3 border border-neutral-700 rounded">
                name
              </code>{" "}
              : The name of the user. This field is optional and will only be
              considered if the {"add user name field"} checkbox was enabled during project creation.
            </li>
          </ul>

          <p className="text-neutral-400 mb-2">
            <strong className="text-2xl">Body Example:</strong>
          </p>

          <CodeBlock
            language="javascript"
            code={`{
        "email": "example@gmail.com",
        "project_id": "123-456-789-000",
        "private_key": "your_private_key_here",
        "name": "John Doe" //  Optional, only if "add user name field" is enabled when you create the project, else set null
      }`}
          />

          <p className="text-neutral-400 py-3">
            <strong className={"text-xl md:text-2xl"}>Instructions:</strong>
          </p>

          <ol className="list-decimal list-inside text-lg text-neutral-400 mb-4">
            <li>Replace the example values with your actual data.</li>
            <li>
              The private key is essential for authentication. Keep it secret,
              and it should be stored as an environment variable.
            </li>
            <li>
              Ensure the email address is valid before sending the request to
              avoid errors.
            </li>
            <li>
              If the {"add user name field"} checkbox was enabled during project creation, include the {`name`} field in the payload.
            </li>
          </ol>

          <p className="text-neutral-400 py-3">
            <strong className={"text-xl md:text-2xl"}>Example with JavaScript:</strong>
          </p>

          <CodeBlock
            language="javascript"
            code={`async function saveEmailToMailingList(email, name) {
        const response = await fetch('https://api.smadmail.com/api/v1/email/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            project_id: process.env.PROJECT_ID,
            private_key: process.env.PRIVATE_KEY,
            name: name //  Optional, only if "add user name field" is enabled when you create the project, else set null
          })
        });

        if (!response.ok) {
          throw new Error('Failed to save email');
        }

        return await response.json();
      }`}
          />

          <p className="text-neutral-400 py-3">
            <strong className={"text-xl md:text-2xl"}>Example with Node.js:</strong>
          </p>

          <CodeBlock
            language="javascript"
            code={`const fetch = require('node-fetch');

      async function saveEmailToMailingList(email, name) {
        try {
          const response = await fetch('https://api.smadmail.com/api/v1/email/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              project_id: process.env.PROJECT_ID,
              private_key: process.env.PRIVATE_KEY,
              name: name // Include name  Optional, only if "add user name field" is enabled when you create the project, else set null
            }),
          });

          if (!response.ok) {
            throw new Error(\`Failed to save email: \${response.statusText}\`);
          }

          return await response.json();
        } catch (error) {
          console.error(\`Error saving email: \${error.message}\`);
          throw error;
        }
      }

      module.exports = saveEmailToMailingList;`}
          />

          <p className="text-neutral-400 py-3">
            <strong className={"text-xl md:text-2xl"}>Example with PHP:</strong>
          </p>

          <CodeBlock
            language="javascript"
            code={`<?php
      $url = 'https://api.smadmail.com/api/v1/email/save';
      $data = array(
        'email' => 'example@gmail.com',
        'project_id' => getenv('PROJECT_ID'),
        'private_key' => getenv('PRIVATE_KEY'),
        'name' => 'John Doe' //  Optional, only if "add user name field" is enabled when you create the project, else set null
      );

      $options = array(
        'http' => array(
          'header'  => "Content-Type: application/json\r\n",
          'method'  => 'POST',
          'content' => json_encode($data),
        ),
      );

      $context  = stream_context_create($options);
      $result = file_get_contents($url, false, $context);

      if ($result === FALSE) {
        throw new Exception('Failed to save email');
      }

      var_dump($result);
      ?>`}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
