import BackToHomeButton from "./BackHome";

const Terms = () => {
  return (
    <section
      id="terms"
      className="relative mt-20 bg-gradient-to-t bg-[#dbd5c5] px-4 pt-20 border-b-4 border-[#dbd5c5]"
    >
      <div className="container mx-auto text-left max-w-5xl">
        <h2
          className="text-4xl sm:text-6xl font-semibold text-[#620808] mb-12"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          Terms & Conditions
        </h2>

        <div
          className="space-y-10 text-[#620808] "
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h3>
            <p className="text-lg">
              By accessing or using any services provided by Eventino, you agree
              to be bound by these Terms & Conditions. If you do not agree with
              any part of these terms, you should refrain from using our
              services or website.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              2. Services Provided
            </h3>
            <p className="text-lg">
              Eventino provides a platform for discovering and participating in
              local events. Our services include event creation and management
              for staff, event browsing and joining for users, as well as
              personalized event recommendations and secure user authentication.
              We aim to make event participation seamless and accessible for all
              users.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              3. Client Responsibilities
            </h3>
            <p className="text-lg">
              Clients are responsible for providing accurate and complete
              information necessary to deliver our services effectively. Any
              delays or complications resulting from incomplete or incorrect
              information are not the responsibility of Eventino.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              4. Intellectual Property
            </h3>
            <p className="text-lg">
              All content, branding, designs, reports, and materials produced by
              Eventino remain our intellectual property unless explicitly stated
              otherwise in a written agreement. Clients are not permitted to
              reproduce, resell, or distribute our work without prior consent.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              6. Limitation of Liability
            </h3>
            <p className="text-lg">
              Eventino will not be held liable for any indirect, incidental, or
              consequential damages arising from the use or inability to use our
              services. Our total liability under any circumstance shall be
              limited to the amount paid for the services in question.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">8. Governing Law</h3>
            <p className="text-lg">
              These Terms & Conditions shall be governed by and interpreted in
              accordance with the laws of the United Kingdom. Any disputes will
              be subject to the exclusive jurisdiction of British courts.
            </p>
          </div>

          <div>
            <p className="text-lg italic">Last Updated: May 2025</p>
          </div>

          <div className="flex justify-center mb-10">
            <BackToHomeButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
