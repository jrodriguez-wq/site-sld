import { LegalPage } from "@/components/legal/legal-page";
import { CONTACT_INFO } from "@/config/contact";

export const metadata = {
  title: "Accessibility | Standard Land Development",
  description: "Accessibility commitment for standardlanddevelopment.com.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      description="We aim for this website to be usable by people with disabilities."
    >
      <section>
        <h2>Our effort</h2>
        <p>
          We design pages with readable type, keyboard-reachable controls, and alternative text on informational images. We follow WCAG 2.2 Level AA as a target, not a guarantee that every third-party widget (maps, calendars) meets every criterion.
        </p>
      </section>
      <section>
        <h2>Need another format?</h2>
        <p>
          If you cannot use a part of this site, email {CONTACT_INFO.email.display} or call {CONTACT_INFO.phone.display} and describe the page and the barrier. We will work with you on an alternative (phone walkthrough, office visit, or document).
        </p>
      </section>
    </LegalPage>
  );
}
