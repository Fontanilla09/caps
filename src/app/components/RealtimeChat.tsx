import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Send, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  sender: "customer" | "caterer";
  content: string;
  timestamp: string;
  image?: string; // base64 or url
}

interface RealtimeChatProps {
  bookingId: string;
  customerName: string;
  catererName: string;
  userRole: "customer" | "caterer";
}

export function RealtimeChat({ bookingId, customerName, catererName, userRole }: RealtimeChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "customer",
      content: "Hi! Can we change the event time from 6pm to 7pm?",
      timestamp: "2026-05-14T10:15:00",
    },
    {
      id: "2",
      sender: "caterer",
      content: "Hello! Yes, we can accommodate that change. I'll update your booking to 7:00 PM.",
      timestamp: "2026-05-14T10:20:00",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !imagePreview) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: userRole === "customer" ? "customer" : "caterer",
      content: newMessage,
      timestamp: new Date().toISOString(),
      image: imagePreview || undefined,
    };

    setMessages([...messages, message]);
    setNewMessage("");
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const otherPartyName = userRole === "customer" ? catererName : customerName;

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <div>
              <CardTitle className="text-lg">Chat with {otherPartyName}</CardTitle>
              <p className="text-sm text-slate-500">Booking #{bookingId}</p>
            </div>
          </div>
          <Badge variant="default" className="bg-green-600">
            <span className="w-2 h-2 bg-white rounded-full mr-2" />
            Online
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === userRole ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === userRole
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="sent-img"
                      className="mb-2 max-w-full max-h-48 rounded"
                    />
                  )}
                  {message.content && <p className="text-sm">{message.content}</p>}
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === userRole ? "text-blue-100" : "text-slate-500"
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

        <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            {/* Add (+) icon */}
            <button type="button" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-black text-lg">
              +
            </button>
            {/* Image icon */}
            <label className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                title="Upload image"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor"/>
                <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor"/>
                <path stroke="currentColor" d="M21 19l-5.5-7-4.5 6-3-4-4 5" />
              </svg>
            </label>
            {/* GIF icon (placeholder) */}
            <button type="button" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-black text-base font-bold">
              GIF
            </button>
            {/* Emoji icon (placeholder) */}
            <button type="button" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-black text-lg">
              <span role="img" aria-label="smile">😊</span>
            </button>
          </div>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 ml-2"
          />
          <Button type="submit" size="icon">
            <Send className="w-4 h-4" />
          </Button>
          {imagePreview && (
            <div className="relative ml-2">
              <img src={imagePreview} alt="preview" className="w-12 h-12 object-cover rounded" />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                onClick={() => setImagePreview(null)}
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
