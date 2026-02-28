import { Link } from "react-router-dom";
import { Zap, Users, Globe, Mic2, ArrowRight, Upload } from "lucide-react";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Mic2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">Audiowiz</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/upload" className="text-sm font-medium hover:text-primary transition-colors">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              Transform Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Audio into Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional audio transcription, speaker identification, and real-time translation. Perfect for meetings, interviews, and Q&A sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/upload"
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Start Transcribing
              </Link>
              <button className="px-8 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Visual demo area */}
          <div className="mt-20 bg-card border border-border rounded-2xl p-8 sm:p-12 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Real-time Processing</h3>
                  <p className="text-sm text-muted-foreground">Instant transcription as you speak or upload</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">Speaker Diarization</h3>
                  <p className="text-sm text-muted-foreground">Automatically identify and track different speakers</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Multi-language Translation</h3>
                  <p className="text-sm text-muted-foreground">Translate to 50+ languages instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to extract maximum value from your audio</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/50 text-primary-foreground flex items-center justify-center mb-4 text-xl">
                📝
              </div>
              <h3 className="text-xl font-bold mb-2">Transcription</h3>
              <p className="text-muted-foreground mb-4">
                Accurate speech-to-text transcription with 99%+ accuracy. Supports multiple languages and formats.
              </p>
              <Link to="/upload" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                Try it now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-secondary/50 text-secondary-foreground flex items-center justify-center mb-4 text-xl">
                🎯
              </div>
              <h3 className="text-xl font-bold mb-2">Diarization</h3>
              <p className="text-muted-foreground mb-4">
                Automatically detect who spoke and when. Perfect for meeting notes and interview analysis.
              </p>
              <Link to="/upload" className="text-secondary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                Get started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/50 text-primary-foreground flex items-center justify-center mb-4 text-xl">
                🌍
              </div>
              <h3 className="text-xl font-bold mb-2">Translation</h3>
              <p className="text-muted-foreground mb-4">
                Break language barriers with instant translation. Generate insights from global conversations.
              </p>
              <Link to="/upload" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for Your Workflow</h2>
            <p className="text-lg text-muted-foreground">Designed for professionals who need to capture and act on every word</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2">Meeting Minutes</h3>
              <p className="text-muted-foreground mb-4">
                Automatically generate comprehensive meeting summaries with action items, decisions, and speaker attribution. Never miss important details again.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Automatic speaker identification</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Summary generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Action item extraction</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2">Q&A Bot Training</h3>
              <p className="text-muted-foreground mb-4">
                Build intelligent Q&A bots from your audio content using RAG (Retrieval Augmented Generation). Answer questions based on your actual conversations.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span>RAG-based answer generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Context-aware responses</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Training on any audio file</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-primary/10 to-secondary/10 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground">
            Upload your first audio file and see the power of Audiowiz in action
          </p>
          <Link
            to="/upload"
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 text-lg"
          >
            <Upload className="w-5 h-5" />
            Start Now - It's Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
