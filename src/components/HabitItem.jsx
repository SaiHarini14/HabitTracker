import { getLast7Days } from "../utils/dateUtils";


function HabitItem({ habit, markDone, deleteHabit }) {
    const week = getLast7Days();
  return (
    <li>
       <div>
        <strong>{habit.name}</strong><br />
        🔥 {habit.streak} days

       <div style={{ marginTop: "6px" }}>
          {week.map((day) => (
            <span
              key={day}
              style={{
                display: "inline-block",
                width: "14px",
                height: "14px",
                marginRight: "4px",
                borderRadius: "3px",
                backgroundColor: habit.history?.includes(day)
                    ? "#22c55e"
                    : "#e5e7eb",

              }}
            ></span>
          ))}
        </div>
      </div>

            < div className="habit-actions">
            <button 
            onClick= {() => 
              markDone(habit.id)}
              disabled={habit.doneToday} >

              {habit.doneToday ? "Done Today" : "Mark as Done"}
              </button>
            
            <button onClick={() => deleteHabit(habit.id)}> Delete</button>
            </div>
          </li>
  );
}

export default HabitItem;