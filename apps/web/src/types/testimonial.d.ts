export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  featured?: boolean;
  sourceUrl?: string;
  date?: string;
  isPlaceholder?: boolean;
};

export type TestimonialsConfig = {
  title: string;
  description: string;
  items: Testimonial[];
};
