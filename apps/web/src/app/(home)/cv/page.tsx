import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CV",
  description: "Download Hòa T. (Thomas) Nguyen's CV in PDF format.",
};

export default function CVPage() {
  redirect("/cv.pdf");
}
