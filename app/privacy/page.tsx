import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Privacy Policy | Standard Land Development",
  description: "Privacy Policy for Standard Land Development - Learn how we protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="Learn how we protect your personal information and respect your privacy."
        backgroundImage="/houses/713/principal.webp"
        badge="Your Privacy Matters"
      />
      <div className="bg-white py-16 sm:py-20 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-slate-900">
                Privacy Policy
              </h1>
              <p className="text-slate-600 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="prose prose-lg prose-slate max-w-none space-y-8 text-slate-700 prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                <p>
                  Standard Land Development (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
                <p className="mb-4">We may collect information about you in a variety of ways:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact information you provide when contacting us or filling out forms.</li>
                  <li><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, and pages visited.</li>
                  <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our website.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Respond to your inquiries and provide customer service</li>
                  <li>Send you information about our services and programs</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist us in operating our website</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-slate-100 rounded-lg text-slate-800">
                  <p className="font-semibold">Standard Land Development</p>
                  <p>2721 Vista Parkway</p>
                  <p>West Palm Beach, FL 33411</p>
                  <p>Email: info@sld.com</p>
                  <p>Phone: (123) 456-7890</p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
