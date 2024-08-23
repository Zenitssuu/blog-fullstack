import { Container, Logo } from "../index.js";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 px-4 md:px-6 bg-[#f3d3b5] flex items-center mt-28 justify-center">
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
        <div className="space-y-3">
          <h4 className="text-lg font-semibold">About</h4>
          <p className="text-muted-foreground">
            Learn more about our mission and values.
          </p>
          <Link to="/about" className="text-sm hover:underline" prefetch={false}>
            Read More
          </Link>
        </div>
        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Careers</h4>
          <p className="text-muted-foreground">
            Explore our open positions and join our team.
          </p>
          <Link to="#" className="text-sm hover:underline" prefetch={false}>
            View Openings
          </Link>
        </div>        
      </div>
      <div className="container max-w-6xl px-4 md:px-6">
        <div className="bg-muted rounded-lg p-6 bg-slate-100">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="">
              <h4 className="text-lg font-semibold">New Features</h4>
              <p className="text-muted-foreground">
                Check out what's coming soon to the blog.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white"
              prefetch={false}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
