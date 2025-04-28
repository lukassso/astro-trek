import { useChat } from "@ai-sdk/react";

export default function TitanicChat() {
  const { messages, input, setInput, append } = useChat({
    api: "/api/ask-titanic",
  });

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await append({ role: "user", content: input });
          setInput("");
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Titanic data..."
          className="border p-2 rounded w-full"
        />
        <button type="submit">Send</button>
      </form>

      <div className="mt-4">
        {messages.map((m, idx) => (
          <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
            <strong>{m.role === "user" ? "You" : "AI"}:</strong> {m.content}
          </div>
        ))}
      </div>
    </div>
  );
}
