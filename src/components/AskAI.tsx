"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Bot, Send, Sparkles, Loader2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useAbout } from "@/context/AboutProvider";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  suggestedQuestions?: string[];
}

const AskAI = () => {
  const { userData } = useAbout();
  const [open, setOpen] = useState(false);
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

  // Reset messages when dialog closes and add welcome message when opens
  useEffect(() => {
    if (!open) {
      setMessages([]);
      setInput("");
      // Clear any ongoing streaming and cancel requests
      if (streamingInterval) {
        clearInterval(streamingInterval);
        setStreamingInterval(null);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setLoading(false);
    } else if (open) {
      // Add welcome message when dialog opens (only if no messages exist)
      setMessages((prev) => {
        if (prev.length === 0) {
          return [{
            role: "assistant",
            content: "Hi! I'm Ashmin. How can I help you today?",
          }];
        }
        return prev;
      });
    }
  }, [open]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (streamingInterval) {
        clearInterval(streamingInterval);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 w-full justify-center">
          <Sparkles className="h-4 w-4" />
          Ask AI
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Bot className="h-5 w-5" />
            Ask Me Anything
          </DialogTitle>
          <DialogDescription className="text-sm  text-start text-muted-foreground mt-2">
            Ask me anything about my skills, experience, projects, or background. I&apos;ll answer based on my portfolio information.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">
                  Start a conversation! Ask me about my experience, projects,
                  skills, or anything else you&apos;d like to know.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-border">
                    {userData?.profile && Array.isArray(userData.profile) && userData.profile[0] ? (
                      <Image 
                        src={userData.profile[0]} 
                        alt="Ashmin" 
                        width={32} 
                        height={32} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : userData?.profile && typeof userData.profile === 'string' ? (
                      <Image 
                        src={userData.profile} 
                        alt="Ashmin" 
                        width={32} 
                        height={32} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Bot className="h-4 w-4 text-primary" />
                    )}
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium">You</span>
                  </div>
                )}
              </div>
            ))}


            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="px-6 pb-6 pt-4 border-t">
          <div className="flex gap-2">
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
      </DialogContent>
    </Dialog>
  );
};

export default AskAI;

