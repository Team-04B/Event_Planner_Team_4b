"use client";

import { Button } from "@/components/ui/button";
import { sendContactMail } from "@/service/contact";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    const html = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${form.name}</p>
    <p><strong>Email:</strong> ${form.email}</p>
    <p><strong>Subject:</strong> ${form.subject}</p>
    <p><strong>Message:</strong><br/>${form.message}</p>
  `;

    const res = await sendContactMail({
      name: form.name,
      subject: form.subject,
      message: html,
      email: form.email,
    });

    if (res.success) {
      setResponseMsg("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setResponseMsg(
        res.error || "Failed to send message. Please try again later."
      );
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Have questions or need assistance? We are here to help! Reach out to
          our team using any of the methods below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-lg">
        {/* Left Side: Form */}
        <div className="pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {["name", "email", "subject"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="text-sm font-medium text-gray-700 block mb-1"
                >
                  {field === "email"
                    ? "Email Address"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  required
                  value={form[field as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder={
                    field === "name"
                      ? "John Doe"
                      : field === "email"
                      ? "john@example.com"
                      : "How can we help you?"
                  }
                />
              </div>
            ))}
            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-700 block mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Your message here..."
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              ></textarea>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
            {responseMsg && (
              <p className="text-sm mt-2 text-center text-gray-700">
                {responseMsg}
              </p>
            )}
          </form>
        </div>

        {/* Right Side: Info & Socials */}
        <div className="pl-0 md:pl-6">
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          <div className="space-y-4 mb-8">
            <ContactInfo
              icon={<MapPinIcon className="h-5 w-5 text-purple-600" />}
              title="Address"
              text="Tangail,Dhaka,Bangladesh"
            />
            <ContactInfo
              icon={<PhoneIcon className="h-5 w-5 text-purple-600" />}
              title="Phone"
              text="+8801642550487"
            />
            <ContactInfo
              icon={<MailIcon className="h-5 w-5 text-purple-600" />}
              title="Email"
              text="rifatswd@gmail.com"
            />
            <ContactInfo
              icon={<ClockIcon className="h-5 w-5 text-purple-600" />}
              title="Business Hours"
              text={`Mon-Fri: 9 AM - 6 PM\nSat: 10 AM - 4 PM\nSun: Closed`}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
            <div className="flex space-x-4">
              <SocialLink
                href="https://facebook.com"
                label="Facebook"
                icon={<FacebookIcon className="h-5 w-5" />}
              />
              <SocialLink
                href="https://twitter.com"
                label="Twitter"
                icon={<TwitterIcon className="h-5 w-5" />}
              />
              <SocialLink
                href="https://instagram.com"
                label="Instagram"
                icon={<InstagramIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Map */}
      <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29213.406191530657!2d89.8986944!3d24.2513454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37567bf8b9b37c37%3A0x6b9d60fa13e54271!2sTangail!5e0!3m2!1sen!2sbd!4v1715420887935!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              How do I create an event?
            </h3>
            <p className="text-gray-600">
              To create an event, log in to your account, navigate to your
              dashboard, and click on &quot;Create Event.&quot; Fill out the event details
              form and submit.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              Can I charge for my events?
            </h3>
            <p className="text-gray-600">
              Yes, you can set a registration fee for your events. We offer
              secure payment processing for both public and private paid events.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              How do I manage event participants?
            </h3>
            <p className="text-gray-600">
              You can manage participants through your event dashboard. Approve
              or reject join requests, ban participants, and send invitations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              What is the difference between public and private events?
            </h3>
            <p className="text-gray-600">
              Public events are visible to everyone, while private events
              require approval to join. Both can be free or paid.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Contact Info
function ContactInfo({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-600 whitespace-pre-line">{text}</p>
      </div>
    </div>
  );
}

// Social Link
function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-gray-100 hover:bg-purple-100 text-gray-800 p-3 rounded-full transition-colors"
    >
      {icon}
    </a>
  );
}
