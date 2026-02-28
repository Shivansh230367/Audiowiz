import { useState } from "react";
import { Link } from "react-router-dom";
import { Mic2, Download, Copy, Share2, Edit2, ChevronDown, Globe } from "lucide-react";
import Footer from "@/components/Footer";

interface TranscriptSegment {
  speaker: string;
  time: string;
  text: string;
}

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState<"transcript" | "summary" | "qa">("transcript");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [copied, setCopied] = useState(false);

  // Mock data for demonstration
  const mockTranscript: TranscriptSegment[] = [
    {
      speaker: "Sarah",
      time: "00:00",
      text: "Good morning everyone. Let's start with a quick update on the Q3 marketing campaign.",
    },
    {
      speaker: "John",
      time: "00:15",
      text: "Thanks Sarah. We've seen a 45% increase in engagement compared to last quarter.",
    },
    {
      speaker: "Sarah",
      time: "00:35",
      text: "That's excellent news. What about the conversion rates?",
    },
    {
      speaker: "John",
      time: "00:45",
      text: "Conversion rates are up by 32%. We're particularly pleased with the social media performance.",
    },
    {
      speaker: "Sarah",
      time: "01:10",
      text: "Great! Moving forward, let's focus on expanding into new markets.",
    },
  ];

  const mockSummary = `
    Meeting Date: Today
    Attendees: Sarah, John, and team

    Key Points Discussed:
    • Q3 marketing campaign showed strong performance
    • 45% increase in engagement vs. Q2
    • Conversion rates improved by 32%
    • Social media channel performing exceptionally well

    Action Items:
    • John to prepare detailed market expansion plan (Due: Next week)
    • Sarah to set up follow-up meeting with regional teams (Due: Friday)
    • Team to analyze competitor strategies (Due: Next week)

    Next Meeting: Same time next week
  `;

  const mockQA = [
    {
      question: "What was the engagement increase?",
      answer: "The engagement increased by 45% compared to the last quarter.",
    },
    {
      question: "What are the conversion rate changes?",
      answer: "Conversion rates are up by 32% with particularly strong performance on social media.",
    },
    {
      question: "What's the focus moving forward?",
      answer: "The focus is on expanding into new markets.",
    },
  ];

  const handleCopy = () => {
    const text = mockTranscript.map((s) => `${s.speaker} (${s.time}): ${s.text}`).join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Mic2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">Audiowiz</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/upload"
              className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
            >
              New Transcription
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Transcription Results</h1>
          <p className="text-muted-foreground">Q3 Marketing Strategy Meeting</p>
        </div>

        {/* Top Actions Bar */}
        <div className="bg-card border border-border rounded-lg p-4 mb-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Processing complete • 2 speakers identified</span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy"}
            </button>
            <button className="flex-1 sm:flex-none px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex-1 sm:flex-none px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <label htmlFor="language" className="text-sm font-medium">
              View translation:
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm font-medium"
            >
              <option value="english">English (Original)</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="chinese">Chinese Simplified</option>
              <option value="japanese">Japanese</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8 flex gap-8">
          <button
            onClick={() => setActiveTab("transcript")}
            className={`pb-4 font-semibold border-b-2 transition-colors ${
              activeTab === "transcript"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Full Transcript
          </button>
          <button
            onClick={() => setActiveTab("summary")}
            className={`pb-4 font-semibold border-b-2 transition-colors ${
              activeTab === "summary"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab("qa")}
            className={`pb-4 font-semibold border-b-2 transition-colors ${
              activeTab === "qa"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Q&A
          </button>
        </div>

        {/* Content */}
        {activeTab === "transcript" && (
          <div className="space-y-4">
            {mockTranscript.map((segment, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      {segment.speaker}
                    </span>
                    <span className="ml-3 text-sm text-muted-foreground">{segment.time}</span>
                  </div>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-foreground leading-relaxed mt-3">{segment.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "summary" && (
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="prose prose-invert max-w-none">
              {mockSummary.split("\n").map((line, idx) => {
                if (line.startsWith("##")) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold mt-6 mb-3">
                      {line.replace("## ", "")}
                    </h2>
                  );
                }
                if (line.startsWith("•")) {
                  return (
                    <div key={idx} className="flex gap-3 mb-2 text-foreground">
                      <span className="text-primary font-bold">•</span>
                      <span>{line.replace("• ", "")}</span>
                    </div>
                  );
                }
                if (line.trim() === "") {
                  return <div key={idx} className="h-2" />;
                }
                return (
                  <p key={idx} className="text-muted-foreground mb-2">
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "qa" && (
          <div className="space-y-4">
            {mockQA.map((item, idx) => (
              <details
                key={idx}
                className="bg-card border border-border rounded-lg overflow-hidden group"
              >
                <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <span className="font-semibold text-foreground">{item.question}</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <div className="bg-muted/30 border-t border-border px-6 py-4">
                  <p className="text-foreground leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-lg p-6 mt-8">
              <h3 className="font-semibold mb-2">Ask a custom question</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use our RAG-powered Q&A bot to ask any question about this transcript
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="What was discussed about engagement metrics?"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Ask
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
