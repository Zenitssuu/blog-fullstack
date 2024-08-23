import React from "react";

function Contact() {
  return (
    <main>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container max-w-6xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Contact Us
              </h1>
              <p className="mt-4 text-muted-foreground">
                We'd love to hear from you! Fill out the form below and one of
                our team members will get back to you as soon as possible.
              </p>
              <form className="mt-8 space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Enter your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    className="min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </div>
            <div>
              <img
                src="/placeholder.svg"
                width={600}
                height={400}
                alt="Contact"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "600/400", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
