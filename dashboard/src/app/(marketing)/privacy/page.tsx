export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 pb-40">
      <h1 className="text-4xl font-bold mb-12">Privacy Policy</h1>
      
      <div className="glass-card p-10 prose prose-invert prose-brand max-w-none">
        <p className="text-text-muted mb-8 italic">Last updated: March 16, 2026</p>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">1. Introduction</h2>
          <p className="text-text-secondary leading-relaxed">
            AI Writing Assistant ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Chrome Extension and website.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">2. Information We Collect</h2>
          <p className="text-text-secondary mb-4 leading-relaxed">
            We collect information that you provide directly to us or that is generated during your use of our services:
          </p>
          <ul className="list-disc pl-6 text-text-secondary space-y-2">
            <li><strong>Account Information:</strong> Email address and authentication tokens via Supabase.</li>
            <li><strong>Text Interaction:</strong> We process the text you select for rewriting. This text is processed ephemerally and is not stored permanently unless you choose to save it.</li>
            <li><strong>Usage Data:</strong> We track the number of improvements made per day to enforce plan limits.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">3. How We Use AI</h2>
          <p className="text-text-secondary leading-relaxed">
            Your text is sent to our AI providers (such as OpenAI or Google DeepMind) for processing. We ensure that our integrations with these providers do not allow them use your data for training their public models.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">4. Data Security</h2>
          <p className="text-text-secondary leading-relaxed">
            We implement enterprise-grade security measures including SSL/TLS encryption for all data in transit. Your authentication is managed securely through Supabase.
          </p>
        </section>

        <section className="mb-10">
           <h2 className="text-2xl font-bold mb-4 text-text-primary">5. Cookies</h2>
           <p className="text-text-secondary leading-relaxed">
             We use essential cookies for session management and authentication. By using our site, you agree to the use of these necessary cookies.
           </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-text-primary">6. Contact Us</h2>
          <p className="text-text-secondary leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at privacy@aiwriter.com.
          </p>
        </section>
      </div>
    </div>
  );
}
