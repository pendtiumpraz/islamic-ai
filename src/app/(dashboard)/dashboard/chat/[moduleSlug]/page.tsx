"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface Module {
  id: string;
  name: string;
  nameAr: string | null;
  icon: string | null;
  description: string;
}

export default function ChatPage() {
  const params = useParams();
  const moduleSlug = params.moduleSlug as string;
  
  const [module, setModule] = useState<Module | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch module info
  useEffect(() => {
    fetch(`/api/modules?slug=${moduleSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.modules && data.modules.length > 0) {
          setModule(data.modules[0]);
        }
      });
  }, [moduleSlug]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Create session and send message
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setIsLoading(true);

    // Add user message immediately
    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      content: userMessage,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      let currentSessionId = sessionId;

      // Create session if not exists
      if (!currentSessionId) {
        const sessionRes = await fetch("/api/chat/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ moduleSlug }),
        });
        
        if (!sessionRes.ok) {
          const err = await sessionRes.json();
          throw new Error(err.error || "Gagal membuat sesi");
        }
        
        const sessionData = await sessionRes.json();
        currentSessionId = sessionData.session.id;
        setSessionId(currentSessionId);
      }

      // Send message and get streaming response
      const response = await fetch(`/api/chat/sessions/${currentSessionId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: userMessage }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Gagal mengirim pesan");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      // Add assistant message placeholder
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);

      if (reader) {
        let fullContent = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          fullContent += chunk;
          
          // Update assistant message with streamed content
          setMessages((prev) => 
            prev.map((msg) =>
              msg.id === assistantMsg.id
                ? { ...msg, content: fullContent }
                : msg
            )
          );
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      // Remove the temp user message if error
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMsg.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Link href="/dashboard/chat" className="text-gray-500 hover:text-gray-700">
            ← Modul
          </Link>
          {module && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">{module.icon || "📚"}</span>
              <div>
                <h1 className="font-semibold text-gray-900">{module.name}</h1>
                {module.nameAr && (
                  <p className="text-xs text-gray-500 font-arabic">{module.nameAr}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-3xl">
          {messages.length === 0 && module && (
            <Card className="p-6 mb-4 bg-emerald-50 border-emerald-200">
              <div className="text-center">
                <span className="text-4xl mb-2 block">{module.icon || "📚"}</span>
                <h2 className="text-lg font-semibold text-emerald-800 mb-1">
                  {module.name}
                </h2>
                <p className="text-sm text-emerald-600">{module.description}</p>
                <p className="text-xs text-emerald-500 mt-3">
                  Ketik pertanyaan untuk memulai percakapan
                </p>
              </div>
            </Card>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block max-w-[85%] p-4 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white rounded-br-md"
                    : "bg-white border shadow-sm rounded-bl-md"
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                {msg.role === "assistant" && !msg.content && isLoading && (
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-t border-red-200 p-3 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Input Area */}
      <footer className="border-t bg-white p-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pertanyaan Anda..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                "Kirim"
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            AI dapat membuat kesalahan. Verifikasi informasi penting dengan sumber terpercaya.
          </p>
        </div>
      </footer>
    </div>
  );
}
