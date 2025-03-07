"use client"
import React from 'react';
import { YouTubeEmbed } from '@next/third-parties/google'
import CodeHighlight from '@/components/CodeSection';
import CodeHighlightWriter from '@/components/CodeSectionWritter';

const Page = () => {
    return (
        <section className="flex justify-start px-8 flex-col items-start w-full h-full">
            <h5 className="text-xl font-bold mb-4 text-left text-neutral-400 w-full  py-4">How it work ?  </h5>

            <div className="flex justify-start bg-white/70 border-white/70 border-[0.4px]  overflow-hidden items-start h-56 md:h-[28rem] w-full rounded-lg">

            <YouTubeEmbed videoid="vQO3hDJEhzo" height={1500} width={1000}    />


            </div>
            <h1 className="text-3xl text-neutral-300 font-bold mb-4 text-left  w-full  py-4 max-w-xl">How To build a mailing list
              , waitlist in less than 2 min </h1>
            <div className=" w-full overflow-hidden  border-t border-neutral-500/40">



            <h3 className="text-xl text-yellow-400 font-bold mb-4 text-left  w-full  pt-4 max-w-xl">How to custom form (example)  </h3>
              <div className="pb-3">



            {`<link rel="stylesheet"  href="https://templates.smadmail.com/css/iframe.css"/>
                <iframe src="https://templates.smadmail.com/ui/form1.html?private_key=smad250208172113c78c8ab94d&project_id=3fb6d9ce-2433-4b8c-ede-bfd9c26c945d
                \n
                &bg_btn=000000\n
                &bg_hover_btn=black\n
                &text_color_btn=white\n
                &border_radius_btn=5px\n
                &bg_input=f0f0f0\n
                &text_color_input=333333\n
                &border_radius_form=10px\n
                &border_form=cccccc\n
                &text_color_hover_btn=yellow" \n
                 scrolling="no"  ></iframe>
                 `}
          </div>

            <table className="min-w-full  border rounded-lg overflow-hidden border-neutral-700/30 text-neutral-400">
            <thead className="bg-neutral-700">
                <tr>
                    <th className="py-2 px-4 border-b text-left text-xs md:text-sm">Parameter</th>
                    <th className="py-2 px-4 border-b text-left text-xs md:text-sm">Description</th>
                </tr>
            </thead>
            <tbody className="bg-neutral-900">
                <tr>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">bg_btn</td>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">Background color of the button</td>
                </tr>
                <tr>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">text_color_btn</td>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">Text color of the button</td>
                </tr>
                <tr>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">border_radius_btn</td>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">Border radius of the button</td>
                </tr>
                <tr>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">bg_input</td>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">Background color of the input field</td>
                </tr>
                <tr>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">text_color_input</td>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">Text color of the input field</td>
                </tr>
                <tr>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">border_radius_form</td>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">Border radius of the form</td>
                </tr>
                <tr>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">border_form</td>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">Border color of the form</td>
                </tr>
                <tr>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">bg_hover_btn</td>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">Background color of the button on hover</td>
                </tr>
                <tr>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">text_color_hover_btn</td>
                    <td className="py-4 px-4  md:px-4 border-b  text-xs md:text-sm ">Text color of the button on hover</td>
                </tr>
            </tbody>
        </table>
            </div>



        </section>
    );
};

export default Page;
