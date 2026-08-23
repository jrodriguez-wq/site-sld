import { LegalPage } from "@/components/legal/legal-page";
import { CONTACT_INFO } from "@/config/contact";

export const metadata = {
  title: "Help & FAQ | Standard Land Development",
  description: "How to tour models, reach the LaBelle office, and use this website.",
};

export default function HelpPage() {
  return (
    <LegalPage title="Help" description="Practical answers for buyers, neighbors, and vendors visiting this site.">
      <section>
        <h2>Schedule a visit</h2>
        <p>
          Use{" "}
          <a className="underline text-[#090040]" href="/contact">
            Contact
          </a>{" "}
          to book a calendar slot or send email. Or call {CONTACT_INFO.contacts.map((c) => `${c.name} ${c.display}`).join(" or ")}. Office: {CONTACT_INFO.address.full}.
        </p>
      </section>
      <section>
        <h2>Floor plans vs. street addresses</h2>
        <p>
          Model pages compare house plans. They are not listings of a specific lot. For a community or available inventory, start at{" "}
          <a className="underline text-[#090040]" href="/locations">
            Communities
          </a>{" "}
          and talk to the office.
        </p>
      </section>
      <section>
        <h2>Sister company</h2>
        <p>
          Sales and rental operations for some homes are handled by{" "}
          <a className="underline text-[#090040]" href={CONTACT_INFO.mjNewellHomesUrl}>
            M.J. Newell Homes
          </a>
          . SLD is the developer/builder.
        </p>
      </section>
      <section>
        <h2>Website issues</h2>
        <p>Email {CONTACT_INFO.email.display} with the page URL and your browser. We do not provide login support for this marketing site — there is no customer account here.</p>
      </section>
      <section>
        <h2>Legal</h2>
        <p>
          <a className="underline text-[#090040]" href="/privacy">
            Privacy
          </a>
          ,{" "}
          <a className="underline text-[#090040]" href="/cookies">
            Cookies
          </a>
          ,{" "}
          <a className="underline text-[#090040]" href="/terms">
            Terms
          </a>
          ,{" "}
          <a className="underline text-[#090040]" href="/accessibility">
            Accessibility
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
