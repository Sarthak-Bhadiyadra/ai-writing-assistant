export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 pb-40">
      <h1 className="text-4xl font-bold mb-12">Terms of Service</h1>
      
      <div className="glass-card p-10 prose prose-invert prose-brand max-w-none">
        <p className="text-text-muted mb-8 italic">Last updated: March 16, 2026</p>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">1. Agreement to Terms</h2>
          <p className="text-text-secondary leading-relaxed">
            By accessing or using Writing Buddy, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">2. Description of Service</h2>
          <p className="text-text-secondary leading-relaxed">
            Writing Buddy provides an AI-powered text improvement tool via a Chrome Extension and web platform. We reserve the right to modify or discontinue any aspect of the service at any time.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">3. User Accounts</h2>
          <p className="text-text-secondary leading-relaxed">
            You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">4. Fair Use & Subscription</h2>
          <ul className="list-disc pl-6 text-text-secondary space-y-2">
            <li>Free users are limited to 30 improvements per day.</li>
            <li>Pro users enjoy unlimited improvements, subject to fair usage policies to prevent automated abuse.</li>
            <li>Subscriptions are billed in advance on a monthly basis and are non-refundable.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">5. Prohibited Conduct</h2>
          <p className="text-text-secondary leading-relaxed">
            You may not use our service for any illegal purpose, to generate harmful content, or to attempt to reverse-engineer our technology.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">6. Limitation of Liability</h2>
          <p className="text-text-secondary leading-relaxed">
            Writing Buddy is provided "as is". We are not liable for any direct, indirect, or consequential damages resulting from your use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-text-primary">7. Governing Law</h2>
          <p className="text-text-secondary leading-relaxed">
            These terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </div>
  );
}
