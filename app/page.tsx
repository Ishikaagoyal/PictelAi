"use client"

import Image from "next/image";
import Authentication from "./_components/Authentication";
import { Button } from "@/components/ui/button";
import { auth } from "@/configs/firebaseConfig";
import ProfileAvatar from "./_components/ProfileAvatar";
import { useAuthContext } from "./provider";
import { useTheme } from "next-themes";
import {
  Monitor,
  PencilRuler,
  CreditCard,
  BrainCircuit,
} from "lucide-react";

export default function Home() {
  const user = useAuthContext();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const features = [
    {
      title: "Design History",
      desc: "All your generated designs are saved and viewable anytime.",
      icon: <Monitor className="size-6 text-white" />,
    },
    {
      title: "Live Code Editor",
      desc: "Edit the generated code and instantly preview your changes.",
      icon: <PencilRuler className="size-6 text-white" />,
    },
    {
      title: "Free Credits",
      desc: "Every user gets 5 free credits to try out our features.",
      icon: <CreditCard className="size-6 text-white" />,
    },
    {
      title: "Model Choices",
      desc: "Select from Gemini, DeepSeek, or Llama for AI generation.",
      icon: <BrainCircuit className="size-6 text-white" />,
    },
  ];

  return (
    <div>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700">
        <nav
          className="relative p-4 max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <div>
              <Image
                src={isDark ? "/logo2.svg" : "/logo.svg"}
                alt="logo"
                width={150}
                height={150}
              />
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
              {!user?.user?.email ? (
                <Authentication>
                  <div className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500">
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                    Login Here
                  </div>
                </Authentication>
              ) : (
                <ProfileAvatar />
              )}
            </div>
          </div>
        </nav>
      </header>

      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
  Code UIs. <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent animate-float">Without</span> Coding UIs
</h1>

          </div>
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              Bring your wireframes to life with PictelAI — transform sketches into stunning, responsive components in seconds.
            </p>
          </div>
          <div className="mt-8 gap-3 flex justify-center">
            <a
              className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
              href="/dashboard"
            >
              Get started
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col justify-center hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
                {item.icon}
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
//copyrights @ishikagoyal