import BackToHomeButton from "./BackHome";

const Privacy = () => {
  return (
    <section
      id="privacy"
      className="relative mt-20 bg-gradient-to-t bg-[#dbd5c5]  px-4 pt-20 border-b-4 border-[#dbd5c5]"
    >
      <div className="container mx-auto text-left max-w-5xl">
        <h2
          className="text-4xl sm:text-6xl font-semibold text-[#620808] mb-12"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          Privacy Policy
        </h2>

        <div
          className="space-y-10 text-[#620808]"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          <div>
            <h3 className="text-2xl font-semibold mb-4">1. Overview</h3>
            <p className="text-lg">
              At Eventino, we are committed to protecting the privacy and
              personal information of our clients, partners, and website
              visitors. This Privacy Policy outlines how we collect, use, store,
              and safeguard the information you provide to us through our
              services and digital platforms.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              2. Information We Collect
            </h3>
            <p className="text-lg">
              We may collect personal and business-related information
              including, but not limited to: your name, contact details, company
              information, project requirements, and communication history. This
              data is collected through contact forms, consultation bookings,
              email inquiries, and service engagements.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h3>
            <p className="text-lg">
              Information collected is used to deliver tailored business
              solutions, respond to inquiries, improve our services, and manage
              client relationships. We may also use your data for internal
              analytics, marketing communication (with your consent), and legal
              compliance.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">4. Data Security</h3>
            <p className="text-lg">
              We implement industry-standard security measures to protect your
              information against unauthorized access, alteration, disclosure,
              or destruction. Our team is trained to handle sensitive business
              data with care and confidentiality.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              5. Third-Party Sharing
            </h3>
            <p className="text-lg">
              We do not sell or rent your personal information to third parties.
              Any third-party services used (such as payment processors or IT
              platforms) are contractually obligated to comply with data
              protection regulations and maintain the confidentiality of your
              data.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">6. Your Rights</h3>
            <p className="text-lg">
              You have the right to access, correct, or delete your personal
              information. If you wish to exercise any of these rights or have
              questions about our data practices, please contact us at{" "}
              <a
                href="mailto:hello@techreturners.com"
                className="underline text-[#112b62]"
              >
                hello@techreturners.com
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">7. Policy Updates</h3>
            <p className="text-lg">
              This Privacy Policy may be updated periodically to reflect changes
              in our practices or legal requirements. We encourage you to review
              this page regularly to stay informed about how we protect your
              information.
            </p>
          </div>

          <div>
            <p className="text-lg italic">Last Updated: June 2025</p>
          </div>
        </div>
        <div className="flex justify-center mb-10">
          <BackToHomeButton />
        </div>
      </div>
    </section>
  );
};

export default Privacy;
