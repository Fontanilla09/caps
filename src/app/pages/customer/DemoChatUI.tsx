import React, { useState, useRef, useEffect } from "react";

// Mock chat users/caterers
const mockChatUsers = [
  {
    id: "cat1",
    name: "Premium Catering Co.",
    avatar: "PC",
    messages: [
      { sender: "Premium Catering Co.", text: "Hello! How can I help you today?" },
      { sender: "You", text: "Hi! I want to ask about the menu options." },
      { sender: "Premium Catering Co.", text: "Sure! We offer a variety of dishes. Do you have any preferences?" },
    ],
    unread: true,
  },
  {
    id: "cat2",
    name: "Business Events Pro",
    avatar: "BE",
    messages: [
      { sender: "Business Events Pro", text: "Hi! Your booking is pending. Do you have any questions?" },
      { sender: "You", text: "When is the payment due?" },
      { sender: "Business Events Pro", text: "Payment is due by May 13. Let us know if you need more time." },
    ],
    unread: false,
  },
];

export const DemoChatUI = () => {
  const [selectedUserId, setSelectedUserId] = useState(mockChatUsers[0].id);

  // Expose a global function to select chat user by name (for dashboard chat button)
  React.useEffect(() => {
    (window as any).selectChatUserByName = (name: string) => {
      const user = mockChatUsers.find((u) => u.name === name);
      if (user) setSelectedUserId(user.id);
      return user;
    };
    return () => {
      (window as any).selectChatUserByName = undefined;
    };
  }, []);
  const [input, setInput] = useState("");
  const [chatUsers, setChatUsers] = useState(mockChatUsers);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedUser = chatUsers.find((u) => u.id === selectedUserId)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUser.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Add message to selected user
    setChatUsers((users) =>
      users.map((u) =>
        u.id === selectedUserId
          ? {
              ...u,
              messages: [...u.messages, { sender: "You", text: input }],
            }
          : u
      )
    );
    setInput("");
    // Simulate reply
    setTimeout(() => {
      setChatUsers((users) =>
        users.map((u) =>
          u.id === selectedUserId
            ? {
                ...u,
                messages: [
                  ...u.messages,
                  { sender: u.name, text: "Thank you for your message! We'll get back to you shortly." },
                ],
              }
            : u
        )
      );
    }, 1200);
  };

  return (
    <div className="flex bg-white rounded shadow h-[32rem] max-w-2xl mx-auto">
      {/* Chat user list */}
      <aside className="w-56 border-r p-2 flex flex-col gap-2 bg-slate-50">
        <h2 className="font-bold text-blue-700 mb-2 text-lg">Chats</h2>
        {chatUsers.map((user) => (
          <button
            key={user.id}
            className={`flex items-center gap-2 px-2 py-2 rounded hover:bg-blue-100 w-full text-left ${
              selectedUserId === user.id ? "bg-blue-100 text-blue-700" : ""
            }`}
            onClick={() => setSelectedUserId(user.id)}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-200 text-blue-800 font-bold">
              {user.avatar}
            </span>
            <span className="flex-1">{user.name}</span>
            {user.unread && <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">New</span>}
          </button>
        ))}
      </aside>
      {/* Chat conversation */}
      <section className="flex-1 flex flex-col p-4">
        <h3 className="font-semibold text-slate-900 mb-2">{selectedUser.name}</h3>
        <div className="flex-1 overflow-y-auto mb-2 border rounded p-2 bg-slate-50">
          {selectedUser.messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.sender === "You"
                  ? "text-right mb-2"
                  : "text-left mb-2"
              }
            >
              <span
                className={
                  msg.sender === "You"
                    ? "inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg"
                    : "inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-lg"
                }
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex gap-2 mt-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            type="text"
            placeholder={`Message ${selectedUser.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
};