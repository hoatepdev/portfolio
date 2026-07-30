"use client";

import { ArrowRightIcon } from "@primer/octicons-react";
import Image from "next/image";

import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ProgressBarLink } from "@/components/progress-bar";
import AboutSection from "@/components/section/about";
import { cn } from "@/lib/utils";
import "@/styles/testimonials.css";
import type { Testimonial } from "@/types/testimonial";

type TestimonialsProps = {
  items: Testimonial[];
  title?: string;
  description?: string;
  variant?: "home" | "page";
  maxItems?: number;
  showViewAllLink?: boolean;
};

function TestimonialCard({
  testimonial,
  variant,
}: {
  testimonial: Testimonial;
  variant: "home" | "page";
}) {
  const details = [testimonial.role, testimonial.company]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      id={variant === "page" ? testimonial.id : undefined}
      className={cn(
        "testimonial-card",
        variant === "home" && "testimonial-card-preview"
      )}
    >
      {testimonial.isPlaceholder && (
        <span className="testimonial-placeholder-badge">
          Placeholder content
        </span>
      )}

      <div className="testimonial-card-header">
        <figure className="testimonial-avatar-box">
          <Image
            src={testimonial.image}
            alt={`${testimonial.name} avatar`}
            width={72}
            height={72}
            className="testimonial-avatar"
          />
        </figure>

        <div>
          <h3 className="testimonial-name">{testimonial.name}</h3>
          <p className="testimonial-details">{details}</p>
          {testimonial.date && (
            <time className="testimonial-date" dateTime={testimonial.date}>
              {testimonial.date}
            </time>
          )}
        </div>
      </div>

      <blockquote className="testimonial-quote">
        <span aria-hidden="true" className="testimonial-quote-mark">
          “
        </span>
        <p>{testimonial.quote}</p>
      </blockquote>

      {testimonial.sourceUrl && (
        <a
          className="testimonial-source-link"
          href={testimonial.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View original recommendation
        </a>
      )}
    </article>
  );
}

export default function Testimonials({
  items,
  title = "Testimonials",
  description,
  variant = "home",
  maxItems,
  showViewAllLink = variant === "home",
}: TestimonialsProps) {
  const visibleItems = maxItems ? items.slice(0, maxItems) : items;

  if (items.length === 0) {
    if (variant === "home") return null;

    return (
      <section className="testimonials-empty-state">
        <p>No testimonials are available yet.</p>
      </section>
    );
  }

  const content = (
    <>
      {description && <p className="testimonials-description">{description}</p>}

      <div
        className={cn(
          "testimonials-grid",
          variant === "page" && "testimonials-grid-page"
        )}
      >
        {visibleItems.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            variant={variant}
          />
        ))}
      </div>

      {showViewAllLink && (
        <div className="testimonials-cta">
          <div className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
            <ProgressBarLink href="/testimonials">
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ See All Testimonials</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </ProgressBarLink>
          </div>
        </div>
      )}
    </>
  );

  if (variant === "home") {
    return (
      <AboutSection id="testimonials" title={title}>
        {content}
      </AboutSection>
    );
  }

  return <section className="testimonials-section">{content}</section>;
}
