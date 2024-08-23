import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/index.js";

function About() {
  return (
    <div className="w-full flex justify-center gap-x-4">
      <main>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container max-w-6xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About Our Blog
                </h1>
                <p className="mt-4 text-muted-foreground">
                  Welcome to EasyBlog, your digital sanctuary for all things
                  reading and writing. Our application is designed to nurture
                  your literary passions, whether you're an avid reader, an
                  aspiring author, or simply someone who loves to explore the
                  written word. Here, you'll find a suite of tools to organize
                  your personal library, discover new books tailored to your
                  tastes, and connect with a community of like-minded
                  bibliophiles. For writers, we offer a distraction-free writing
                  environment, progress tracking, and resources to hone your
                  craft. EasyBlog was born from a simple idea: to create a
                  space where the magic of literature could flourish in the
                  digital age. Our team of book lovers and tech enthusiasts has
                  worked tirelessly to bring you an intuitive, feature-rich
                  platform that caters to all your reading and writing needs.
                  From customizable reading lists and in-depth book analyses to
                  writing prompts and peer review options, we're committed to
                  fostering creativity and literary appreciation. Join us in
                  celebrating the power of storytelling, the joy of literary
                  discovery, and the endless possibilities that unfold when
                  words meet imagination. Whether you're curling up with a good
                  book or penning your next masterpiece, EasyBlog is here to
                  enhance your journey through the wonderful world of words.
                </p>
              </div>
              <div>
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="About"
                  className="rounded-lg object-cover"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container max-w-6xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold">Read Our Articles</h2>
                <p className="mt-4 text-muted-foreground">
                  Explore our collection of thought-provoking articles on a
                  variety of topics. From personal stories to industry insights,
                  our writers share their unique perspectives to inspire and
                  inform our readers.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-4"
                  prefetch={false}
                >
                  View Articles
                </Link>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Write for Our Blog</h2>
                <p className="mt-4 text-muted-foreground">
                  Are you passionate about a topic and want to share your
                  expertise with our readers? We welcome guest contributions
                  from writers of all backgrounds. Submit your article proposal
                  and join our community of thought leaders.
                </p>
                <Link
                  to="/add-post"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-4"
                  prefetch={false}
                >
                  Write for Us
                </Link>
              </div>
            </div>
          </div>
        </section>       
      </main>
    </div>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default About;
