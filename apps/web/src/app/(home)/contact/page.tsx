import type { Metadata } from "next";

import PageHeader from "@/components/page-header";
import MapBox from "@/components/section/contact/map-box";
import config from "@/config";

import ContactForm from "./contact-form";

const { title, about } = config;
const fallbackEmail =
  config.contacts.find((contact) => contact.link?.startsWith("mailto:"))
    ?.content ?? "hoanguyentrandev@gmail.com";

export const metadata: Metadata = {
  title: `Contact | ${title}`,
  description: `Get in touch with ${about.preferredName}.`,
};

function Contact() {
  return (
    <article>
      <PageHeader header={`${about.preferredName}'s Contact`} />
      <section className="mb-[10px]">
        <MapBox googleMapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14005.365475345357!2d105.80249969012159!3d21.00981321254594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac9e29394f65%3A0x8dc13ae6c56b08da!2zMTM5IMSQLiBOZ3V54buFbiBOZ-G7jWMgVsWpLCBUcnVuZyBIb8OgLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSAwMDE3NSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1749034254147!5m2!1sen!2s" />
        <h3 className="text-white-2 mb-[20px] text-2xl font-bold">
          Contact Form
        </h3>
        <ContactForm fallbackEmail={fallbackEmail} />
      </section>
    </article>
  );
}

export default Contact;
