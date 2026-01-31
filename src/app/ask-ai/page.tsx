"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAbout } from "@/context/AboutProvider";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  suggestedQuestions?: string[];
}

const AskAIPage = () => {
  const { userData } = useAbout();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingInterval, setStreamingInterval] = useState<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Add welcome message when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Hi! I'm Ashmin, and I'm here to answer questions about myself - my skills, experience, projects, background, and anything else you'd like to know about me. What would you like to know?",
      }]);
    }
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (streamingInterval) {
        clearInterval(streamingInterval);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [streamingInterval]);

  const handleSend = async (questionText?: string) => {
    const question = questionText || input.trim();
    if (!question || loading) return;

    const userMessage: Message = { role: "user", content: question };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput("");
    setLoading(true);

    // Create AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Add empty assistant message with "Processing..." that will be streamed
    setMessages((prev) => [...prev, { role: "assistant", content: "Processing...", isStreaming: true }]);

    try {
      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: currentMessages,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      // Check if request was aborted before parsing
      if (abortController.signal.aborted) {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === "assistant" && lastMessage.content === "Processing...") {
            newMessages.pop();
          }
          return newMessages;
        });
        return;
      }

      const data = await response.json();
      const fullResponse = data.response || "Sorry, I couldn't process your request.";

      // Check again if request was aborted after getting response
      if (abortController.signal.aborted) {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === "assistant" && (lastMessage.content === "Processing..." || lastMessage.content === "")) {
            newMessages.pop();
          }
          return newMessages;
        });
        return;
      }

      // Update the existing assistant message and start streaming the actual response
      setMessages((prev) => {
        const newMessages = [...prev];
        const assistantIndex = newMessages.length - 1;
        if (newMessages[assistantIndex] && newMessages[assistantIndex].role === "assistant") {
          newMessages[assistantIndex] = {
            ...newMessages[assistantIndex],
            content: "",
            isStreaming: true,
          };
        }
        return newMessages;
      });

      // Animate text character by character (typewriter effect)
      let currentIndex = 0;
      let isStopped = false;
      const streamInterval = setInterval(() => {
        // Check if stopped or aborted
        if (isStopped || abortController.signal.aborted) {
          clearInterval(streamInterval);
          setStreamingInterval(null);
          return;
        }

        if (currentIndex < fullResponse.length) {
          setMessages((prev) => {
            const newMessages = [...prev];
            const assistantIndex = newMessages.length - 1;
            if (newMessages[assistantIndex] && newMessages[assistantIndex].role === "assistant") {
              newMessages[assistantIndex] = {
                ...newMessages[assistantIndex],
                content: fullResponse.substring(0, currentIndex + 1),
                isStreaming: currentIndex + 1 < fullResponse.length,
              };
            }
            return newMessages;
          });
          currentIndex++;
        } else {
          clearInterval(streamInterval);
          setStreamingInterval(null);
          setLoading(false);
          abortControllerRef.current = null;
        }
      }, 15); // Adjust speed: lower = faster (15ms per character)

      setStreamingInterval(streamInterval);

      // Store stop function
      (streamInterval as any).stop = () => {
        isStopped = true;
      };
    } catch (error: any) {
      // Don't show error if request was aborted
      if (error.name === 'AbortError' || abortController.signal.aborted) {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === "assistant" && (lastMessage.content === "" || lastMessage.content === "Processing...")) {
            // Remove the processing message if stopped
            newMessages.pop();
          }
          return newMessages;
        });
        setLoading(false);
        abortControllerRef.current = null;
        return;
      }

      console.error("Error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        // Check if there's already an assistant message, if not add one
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === "assistant" && (lastMessage.content === "" || lastMessage.content === "Processing...")) {
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: "Sorry, I'm having trouble connecting. Please try again later.",
            isStreaming: false,
          };
        } else {
          newMessages.push({
            role: "assistant",
            content: "Sorry, I'm having trouble connecting. Please try again later.",
            isStreaming: false,
          });
        }
        return newMessages;
      });
      if (streamingInterval) {
        clearInterval(streamingInterval);
        setStreamingInterval(null);
      }
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 flex flex-col gap-2 pt-8 pb-6 border-b">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <h1 className="text-2xl font-bold theme-gradient-text">Ask About Me</h1>
          </div>
          <p className="text-sm text-muted-foreground ">
            Ask me anything about my skills, experience, projects, or background. I&apos;m here to help you learn more about me!
          </p>
        </div>

        {/* Messages Area - Scrollable */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="space-y-4 pr-4 py-4">
            {messages.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm">
                  Start a conversation! Ask me about my experience, projects,
                  skills, or anything else you&apos;d like to know.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-border">
                    {userData?.profile && Array.isArray(userData.profile) && userData.profile[0] ? (
                      <Image
                        src={userData.profile[0]}
                        alt="Ashmin"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : userData?.profile && typeof userData.profile === 'string' ? (
                      <Image
                        src={userData.profile}
                        alt="Ashmin"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Bot className="h-5 w-5 text-primary" />
                    )}
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                    }`}
                >
                  <div
                    className="text-sm whitespace-pre-wrap break-words overflow-wrap-anywhere word-break-break-word"
                    style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                    dangerouslySetInnerHTML={{
                      __html: (message.content || '')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                        .replace(/^[-•]\s+(.+)$/gm, '<div class="ml-2">• $1</div>')
                        .replace(/(https?:\/\/[^\s\)]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80 break-all">$1</a>')
                        .replace(/\n/g, '<br />') +
                        (message.isStreaming && message.content && message.content !== "Processing..." ? '<span class="inline-block ml-1 text-foreground animate-pulse">|</span>' : '')
                    }}
                  />
                  {message.role === "assistant" && message.suggestedQuestions && message.suggestedQuestions.length > 0 && !message.isStreaming && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.suggestedQuestions.map((question, qIndex) => (
                        <Button
                          key={qIndex}
                          variant="outline"
                          size="sm"
                          className="text-xs h-auto py-1.5 px-3 rounded-full hover:bg-primary/10 border-border"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSend(question);
                          }}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium">You</span>
                  </div>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area - Fixed */}
        <div className="flex-shrink-0 flex gap-2 pt-4 pb-6 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={loading}
            className="flex-1"
          />
          <Button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            size="icon"
            className={loading ? "border-none" : ""}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin rounded-full" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AskAIPage;

