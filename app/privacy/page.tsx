import { LegalPage } from "@/components/legal/legal-page";
import { CONTACT_INFO } from "@/config/contact";

export const metadata = {
  title: "Privacy Policy | Standard Land Development",
  description:
    "How Standard Land Development collects, uses, and protects personal information, including Florida and U.S. privacy rights.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How we handle personal information on standardlanddevelopment.com."
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          Standard Land Development, LLC (&quot;SLD,&quot; &quot;we,&quot; &quot;us&quot;) develops land and builds homes in Southwest Florida. Principal place of business: {CONTACT_INFO.address.full}. Email: {CONTACT_INFO.email.display}.
        </p>
      </section>
      <section>
        <h2>2. Information we collect</h2>
        <ul>
          <li>Contact data you type into forms (name, email, phone, message) or give us by phone.</li>
          <li>Appointment data if you book through Calendly or a similar scheduler.</li>
          <li>Technical data: IP address, browser, pages viewed, approximate location derived from IP.</li>
          <li>Advertising identifiers if you accept analytics/advertising cookies (Meta Pixel).</li>
        </ul>
      </section>
      <section>
        <h2>3. How we use it</h2>
        <ul>
          <li>Respond to tour requests, model questions, and commercial inquiries.</li>
          <li>Operate and secure this website.</li>
          <li>Measure marketing performance when you have accepted cookies.</li>
          <li>Comply with law (subpoenas, Fair Housing recordkeeping where applicable).</li>
        </ul>
      </section>
      <section>
        <h2>4. Sharing</h2>
        <p>
          We do not sell personal information. We share with service providers who process data for us (email delivery, calendar, hosting, analytics if accepted). We may share if required by law or to protect the company, staff, or visitors.
        </p>
      </section>
      <section>
        <h2>5. Cookies</h2>
        <p>
          Essential cookies keep the site working. Analytics and advertising cookies run only after you tap Accept on the cookie banner. Details:{" "}
          <a className="underline text-[#090040]" href="/cookies">
            Cookie Policy
          </a>
          .
        </p>
      </section>
      <section>
        <h2>6. Your rights</h2>
        <p>
          Depending on your state (including Florida), you may request access, correction, or deletion of personal information we hold, and you may opt out of sale/share of personal information (we do not sell). Email {CONTACT_INFO.email.display} with the subject &quot;Privacy request.&quot; Do not send Social Security numbers by email.
        </p>
      </section>
      <section>
        <h2>7. Children</h2>
        <p>This site is for adults inquiring about real property. We do not knowingly collect data from children under 13.</p>
      </section>
      <section>
        <h2>8. Contact</h2>
        <p>
          Privacy questions: {CONTACT_INFO.email.display}. Phone: {CONTACT_INFO.contacts.map((c) => `${c.name} ${c.display}`).join("; ")}. Mail: {CONTACT_INFO.address.full}.
        </p>
      </section>
    </LegalPage>
  );
}
