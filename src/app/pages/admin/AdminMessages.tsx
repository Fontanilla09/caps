import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Send } from "lucide-react";

const MOCK_CONVERSATIONS = [
  {
    id: "1",
    customer: "Maria Santos",
    bookingId: "BK-001",
    lastMessage: "Thank you! That works perfectly.",
    timestamp: "2026-05-14T10:30:00",
    unread: false,
  },
  {
    id: "2",
    customer: "John Reyes",
    bookingId: "BK-002",
    lastMessage: "Can we add 10 more guests?",
    timestamp: "2026-05-14T09:15:00",
    unread: true,
  },
  {
    id: "3",
    customer: "Lisa Cruz",
    bookingId: "BK-003",
    lastMessage: "What time will the setup start?",
    timestamp: "2026-05-13T16:45:00",
    unread: true,
  },
];

const MOCK_MESSAGES = {
  "1": [
    {
      id: "m1",
      sender: "customer",
      content: "Hi! Can we change the event time from 6pm to 7pm?",
      timestamp: "2026-05-14T10:15:00",
    },
    {
      id: "m2",
      sender: "admin",
      content: "Hello Maria! Yes, we can accommodate that change. I'll update your booking to 7:00 PM.",
      timestamp: "2026-05-14T10:20:00",
    },
    {
      id: "m3",
      sender: "customer",
      content: "Thank you! That works perfectly.",
      timestamp: "2026-05-14T10:30:00",
    },
  ],
  "2": [
    {
      id: "m1",
      sender: "customer",
      content: "Can we add 10 more guests?",
      timestamp: "2026-05-14T09:15:00",
    },
  ],
  "3": [
    {
      id: "m1",
      sender: "customer",
      content: "What time will the setup start?",
      timestamp: "2026-05-13T16:45:00",
    },
  ],
};

export function AdminMessages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");

  const activeMessages = selectedConversation ? MOCK_MESSAGES[selectedConversation as keyof typeof MOCK_MESSAGES] || [] : [];
  const activeConversation = MOCK_CONVERSATIONS.find((c) => c.id === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    // Mock sending message
    console.log("Sending:", messageInput);
    setMessageInput("");
  };

  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <Button variant="outline" size="sm" onClick={() => window.history.back()} className="mb-4">Back</Button>
          <h1 className="text-4xl mb-2 text-slate-900">Messages</h1>
          <p className="text-slate-600">Communicate with your customers in real-time</p>
        </div>

        <Card className="h-[600px]">
          <div className="grid md:grid-cols-3 h-full">
            {/* Conversations List */}
            <div className="border-r">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Conversations</CardTitle>
              </CardHeader>
              <ScrollArea className="h-[calc(600px-80px)]">
                <div className="p-2 space-y-1">
                  {MOCK_CONVERSATIONS.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedConversation === conv.id
                          ? "bg-blue-50 border-blue-200 border"
                          : conv.unread
                          ? "bg-blue-50/50 hover:bg-blue-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-sm">{conv.customer}</p>
                        {conv.unread && (
                          <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-1">Booking: {conv.bookingId}</p>
                      <p className="text-sm text-slate-600 truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(conv.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Message Thread */}
            <div className="md:col-span-2 flex flex-col">
              {selectedConversation && activeConversation ? (
                <>
                  {/* Header */}
                  <CardHeader className="border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{activeConversation.customer.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{activeConversation.customer}</CardTitle>
                        <CardDescription>Booking: {activeConversation.bookingId}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {activeMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              message.sender === "admin"
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-900"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sender === "admin" ? "text-blue-100" : "text-slate-500"
                              }`}
                            >
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  Select a conversation to view messages
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
