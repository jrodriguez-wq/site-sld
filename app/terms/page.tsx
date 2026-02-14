import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Terms of Service | Standard Land Development",
  description: "Terms of Service for Standard Land Development - Read our terms and conditions.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        description="Read our terms and conditions to understand the terms of use for our services and website."
        backgroundImage="/houses/3711/principal.webp"
        badge="Legal Information"
      />
      <div className="py-16 sm:py-20 md:py-24">
      <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#090040] via-[#2d2c55] to-[#090040] bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-gray-600 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing and using the Standard Land Development website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
                <p className="mb-4">Permission is granted to temporarily access the materials on Standard Land Development&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Investment Programs</h2>
                <p>
                  All investment opportunities presented on this website are subject to applicable securities laws and regulations. Past performance does not guarantee future results. All investments carry risk, and you should consult with a qualified financial advisor before making any investment decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disclaimer</h2>
                <p className="mb-4">The materials on Standard Land Development&apos;s website are provided on an &apos;as is&apos; basis. Standard Land Development makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Implied warranties or conditions of merchantability</li>
                  <li>Fitness for a particular purpose</li>
                  <li>Non-infringement of intellectual property or other violation of rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitations</h2>
                <p>
                  In no event shall Standard Land Development or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Standard Land Development&apos;s website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Accuracy of Materials</h2>
                <p>
                  The materials appearing on Standard Land Development&apos;s website could include technical, typographical, or photographic errors. Standard Land Development does not warrant that any of the materials on its website are accurate, complete, or current.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Links</h2>
                <p>
                  Standard Land Development has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Standard Land Development.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modifications</h2>
                <p>
                  Standard Land Development may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of the State of Florida and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
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
