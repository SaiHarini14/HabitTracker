import HabitItem from "./HabitItem";

function HabitList({ habits, markDone, deleteHabit }) {
  return (
    <ul>
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          markDone={markDone}
          deleteHabit={deleteHabit}
        />
      ))}
    </ul>
  );
}

export default HabitList;
