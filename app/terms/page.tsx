import { LegalPage } from "@/components/legal/legal-page";
import { CONTACT_INFO } from "@/config/contact";

export const metadata = {
  title: "Terms of Use | Standard Land Development",
  description: "Terms for using the Standard Land Development website.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" description="Rules for using this website. Not a construction contract.">
      <section>
        <h2>1. Agreement</h2>
        <p>
          By using standardlanddevelopment.com you agree to these terms. If you do not agree, leave the site. A visit, model tour, or purchase is governed by separate written agreements, not this page.
        </p>
      </section>
      <section>
        <h2>2. What this site is</h2>
        <p>
          Marketing for Standard Land Development, LLC, a Florida land developer and homebuilder. Floor-plan photos are model photography unless we label a street address. Prices, specs, and availability change.
        </p>
      </section>
      <section>
        <h2>3. No investment offer on this page</h2>
        <p>
          Nothing here is an offer to sell securities. Any lender or cash program is described on dedicated pages and remains subject to documents and law. Past results do not predict future results.
        </p>
      </section>
      <section>
        <h2>4. License</h2>
        <p>You may view pages for personal, non-commercial use. You may not scrape, copy our photography for other businesses, or reverse-engineer the site.</p>
      </section>
      <section>
        <h2>5. Disclaimer</h2>
        <p>The site is provided &quot;as is.&quot; We do not warrant that content is error-free. Photos, maps, and copy may lag the field.</p>
      </section>
      <section>
        <h2>6. Limitation of liability</h2>
        <p>
          To the fullest extent allowed by Florida law, SLD is not liable for damages arising from use of this website. This does not limit liability that the law does not allow us to limit.
        </p>
      </section>
      <section>
        <h2>7. Fair Housing</h2>
        <p>
          We are pledged to the letter and spirit of U.S. policy for equal housing opportunity. We do not discriminate because of race, color, religion, sex, handicap, familial status, or national origin.
        </p>
      </section>
      <section>
        <h2>8. Contact</h2>
        <p>
          {CONTACT_INFO.address.full} · {CONTACT_INFO.email.display}
        </p>
      </section>
    </LegalPage>
  );
}
