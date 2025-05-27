import { ArrowLeft, Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

import PageHeader from "@/components/page-header";
import config from "@/config";

const { title } = config;

export const metadata: Metadata = {
  title: `Not Found | ${title}`,
};

function NotFound() {
  return (
    <article>
      <PageHeader header="Page Not Found!" />

      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="relative mx-auto mb-6 h-64 w-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-light-gray text-9xl font-bold">404</span>
            </div>
          </div>
          <h2 className="text-xl text-gray-500 dark:text-gray-400">
            Oops! The page you're looking for seems to have wandered off.
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <div className="mx-auto grid w-full max-w-lg grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="bg-border-gradient-onyx hover:bg-orange-yellow-crayola-dark text-white-2 mx-1 flex cursor-pointer items-center rounded-xl border-none px-4 py-2 text-base font-bold shadow-lg hover:scale-105 active:scale-95"
              >
                <Home className="mr-2 h-4 w-4" />
                <span>Return Home</span>
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <Link
                href="javascript:history.back()"
                className="bg-border-gradient-onyx hover:bg-orange-yellow-crayola-dark text-orange-yellow-crayola mx-1 flex cursor-pointer items-center rounded-xl border-none px-4 py-2 text-base font-bold shadow-lg hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Go Back</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-sm text-gray-500">
          <p>
            Still having trouble?{" "}
            <Link
              href="mailto:hugo970217@gmail.com"
              className="text-primary underline underline-offset-2"
            >
              Contact me
            </Link>{" "}
            and I'll help you find what you're looking for.
          </p>
        </div>
      </div>
    </article>
  );
}

export default NotFound;
