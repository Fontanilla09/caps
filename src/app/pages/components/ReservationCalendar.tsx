import React, { useState } from "react";
import { Calendar } from "../../components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";

// Example events data
const events = [
  { id: 1, title: "Wedding - Maria Santos", date: "2026-05-20", status: "confirmed" },
  { id: 2, title: "Corporate Event - John Reyes", date: "2026-05-25", status: "pending" },
  { id: 3, title: "Birthday - Anna Cruz", date: "2026-05-28", status: "completed" },
];

export function ReservationCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Filter events for the selected date
  const eventsForDate = selectedDate
    ? events.filter((e) => e.date === selectedDate)
    : [];

  // Format selected date for display
  const formattedSelectedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString()
    : "(select a date)";

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Reservation Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{
                booked: events.map((e) => new Date(e.date)),
              }}
              modifiersClassNames={{
                booked: "bg-blue-100 border-blue-400 border-2",
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Events on {formattedSelectedDate}</h3>
            {eventsForDate.length === 0 ? (
              <div className="text-slate-500">No events for this date.</div>
            ) : (
              <ul className="space-y-2">
                {eventsForDate.map((event) => (
                  <li key={event.id} className="p-3 rounded border flex items-center gap-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      event.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : event.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : event.status === "completed"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                    <span>{event.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
