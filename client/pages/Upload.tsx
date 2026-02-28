import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Upload, Mic2, X, Play, AlertCircle } from "lucide-react";
import Footer from "@/components/Footer";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("audio/")) {
        setUploadedFile(file);
      } else {
        alert("Please drop an audio file");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const startRecording = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setRecordedAudio(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);

      let errorMessage = "Unable to access microphone";

      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
          errorMessage = "Microphone permission denied. Please enable microphone access in your browser settings and try again.";
        } else if (error.name === "NotFoundError") {
          errorMessage = "No microphone found. Please connect a microphone and try again.";
        } else if (error.name === "NotReadableError") {
          errorMessage = "Unable to read microphone. It may be in use by another application.";
        }
      }

      setMicError(errorMessage);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleRemoveRecording = () => {
    setRecordedAudio(null);
    setRecordingTime(0);
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
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Upload or Record Audio</h1>
          <p className="text-lg text-muted-foreground">Choose how you'd like to provide your audio file</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Upload File</h2>

            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="inline-block p-3 bg-primary/10 rounded-lg">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="inline-block p-3 bg-muted rounded-lg">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Drag and drop your audio file</p>
                    <p className="text-sm text-muted-foreground">or click to select a file</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Supports MP3, WAV, M4A, FLAC, and more</p>
                </div>
              )}
            </div>
          </div>

          {/* Recording Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Record Audio</h2>

            {micError && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-destructive text-sm mb-1">Microphone Not Available</p>
                  <p className="text-sm text-destructive/80 mb-3">{micError}</p>
                  <button
                    onClick={() => setMicError(null)}
                    className="text-xs font-medium text-destructive hover:underline"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            <div className="bg-card border border-border rounded-xl p-8 space-y-6">
              <div className="text-center">
                <div
                  className={`inline-block p-4 rounded-full transition-colors ${
                    isRecording
                      ? "bg-destructive/10 animate-pulse"
                      : "bg-primary/10"
                  }`}
                >
                  <Mic2
                    className={`w-8 h-8 ${
                      isRecording ? "text-destructive" : "text-primary"
                    }`}
                  />
                </div>
              </div>

              {recordedAudio ? (
                <div className="space-y-4">
                  <div className="bg-muted rounded-lg p-4 space-y-3">
                    <p className="font-semibold text-sm">Recording saved</p>
                    <div className="flex items-center gap-3">
                      <button className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                      <div className="flex-1">
                        <p className="text-sm">
                          {recordedAudio.size ? (recordedAudio.size / 1024).toFixed(2) : 0} KB
                        </p>
                        <p className="text-xs text-muted-foreground">{formatTime(recordingTime)}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveRecording}
                    className="w-full text-sm text-destructive hover:bg-destructive/10 rounded-lg py-2 transition-colors font-medium"
                  >
                    Delete Recording
                  </button>
                </div>
              ) : isRecording ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-destructive">{formatTime(recordingTime)}</p>
                    <p className="text-sm text-muted-foreground mt-2">Recording in progress...</p>
                  </div>
                  <button
                    onClick={stopRecording}
                    className="w-full px-6 py-3 rounded-lg bg-destructive text-white font-semibold hover:bg-destructive/90 transition-colors"
                  >
                    Stop Recording
                  </button>
                </div>
              ) : (
                <button
                  onClick={startRecording}
                  disabled={!!micError}
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Recording
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        {(uploadedFile || recordedAudio) && (
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">Ready to process?</h3>
            <p className="text-muted-foreground mb-6">
              Click the button below to start transcription, diarization, and translation
            </p>
            <Link
              to="/results"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Process Audio
              <Upload className="w-5 h-5" />
            </Link>
          </div>
        )}

        {/* Features Preview */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-2xl mb-2">✨</div>
            <h4 className="font-semibold mb-2">Accurate Transcription</h4>
            <p className="text-sm text-muted-foreground">
              State-of-the-art speech recognition with support for multiple languages
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-2xl mb-2">👥</div>
            <h4 className="font-semibold mb-2">Speaker Detection</h4>
            <p className="text-sm text-muted-foreground">
              Automatically identify and track different speakers throughout your audio
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-semibold mb-2">Multi-Language</h4>
            <p className="text-sm text-muted-foreground">
              Translate your transcription to 50+ languages automatically
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
