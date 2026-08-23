import { LegalPage } from "@/components/legal/legal-page";
import { CONTACT_INFO } from "@/config/contact";

export const metadata = {
  title: "Cookie Policy | Standard Land Development",
  description: "Cookies used on the Standard Land Development website and how to accept or decline them.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="What cookies we use, why, and how you control them."
    >
      <section>
        <h2>1. What cookies are</h2>
        <p>
          Cookies are small files stored on your device. Some are required for the site to function. Others help us understand traffic or measure ads.
        </p>
      </section>
      <section>
        <h2>2. Categories we use</h2>
        <ul>
          <li>
            <strong>Essential.</strong> Load the site, remember your cookie choice (`sld_cookie_consent`). Always on.
          </li>
          <li>
            <strong>Analytics and advertising (optional).</strong> Meta Pixel and similar tags. These load only after you Accept. Decline still lets you use the full site.
          </li>
        </ul>
      </section>
      <section>
        <h2>3. How to change your mind</h2>
        <p>
          Clear this site&apos;s cookies in your browser, then reload — the banner will appear again. You can also email {CONTACT_INFO.email.display}. More on data use:{" "}
          <a className="underline text-[#090040]" href="/privacy">
            Privacy Policy
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
