import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CV",
  description: "Download Chun-Ho (Hugo) Lin's CV in PDF format.",
};

export default function CVPage() {
  redirect("/cv.pdf");
}
