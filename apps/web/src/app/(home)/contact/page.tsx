"use client";

import React, { useEffect } from "react";
import { FaRegPaperPlane } from "react-icons/fa";

import PageHeader from "@/components/page-header";
import MapBox from "@/components/section/contact/map-box";
import config from "@/config";

const { title, about } = config;

/**
 * TODO: #341 still need to update with another method to avoid client side not available metadata
 * export const metadata: Metadata = {
 *   title: `Contact | ${title}`,
 * };
 */

function Contact() {
  useEffect(() => {
    document.title = `Contact | ${title}`;
  }, [title]);

  return (
    <article>
      <PageHeader header={`${about.preferredName}'s Contact`} />
      <section className="mb-[10px]">
        <MapBox googleMapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14005.365475345357!2d105.80249969012159!3d21.00981321254594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac9e29394f65%3A0x8dc13ae6c56b08da!2zMTM5IMSQLiBOZ3V54buFbiBOZ-G7jWMgVsWpLCBUcnVuZyBIb8OgLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSAwMDE3NSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1749034254147!5m2!1sen!2s" />
        <h3 className="text-white-2 mb-[20px] text-2xl font-bold">
          Contact Form
        </h3>
        <form action="#" className="form" data-form>
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
              data-form-input
            />
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              required
              data-form-input
            />
          </div>
          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
            data-form-input
          ></textarea>
          <button
            className="form-btn"
            disabled
            data-form-btn
            onClick={() => alert("not implemented yet!")}
          >
            <FaRegPaperPlane />
            <span>Send Message</span>
          </button>
        </form>
      </section>
    </article>
  );
}

export default Contact;
