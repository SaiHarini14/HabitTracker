import { useState, useEffect } from 'react'
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import './App.css'

 const getToday = () => {
      return new Date().toDateString();
    };

  const getLast7days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.push(d.toDateString());
    }
      return days;
  };

function App() {

  const [darkMode, setDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "dark";
});


  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse (savedHabits) : [];
  })
  const [newHabit, setNewHabit] = useState("")

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    const today = getToday();
    const lastday = localStorage.getItem("lastDate");

    if (today !== lastday) {
      const resetHabits = habits.map(habit => ({
        ...habit,
        doneToday: false,
      }));
      setHabits(resetHabits);
      localStorage.setItem("lastDate", today);
    }

  }, []);


  useEffect(() => {
  localStorage.setItem("theme", darkMode ? "dark" : "light");
}, [darkMode]);


  const addHabit = () => {
    if (newHabit.trim() == "") return;

    const habit = {
      id : Date.now(),
      name : newHabit,
      streak : 0,
      doneToday : false,
      history : [],
    };
    setHabits([...habits, habit]);
    setNewHabit("");
  };

  const markDone = (id) => {
    const today = new Date().toDateString();
    const updateHabit = habits.map((habit) =>
       habit.id === id && !habit.doneToday
        ? {...habit, 
          doneToday: true, 
          streak : (habit.streak || 0) + 1, 
          history : [...habit.history, today],
        }
        : habit
      );
      setHabits(updateHabit);
    };

    const deleteHabit = (id) => {
      const updatedHabits = habits.filter((habit => habit.id !== id));
      setHabits (updatedHabits);
    };


  return (
    <>
      <div className={`container ${darkMode ? "dark" : ""}`}>

        <h1>Habit Tracker</h1>

        <button
        style={{ marginBottom: "15px" }}
        onClick={() => setDarkMode(!darkMode)}
        >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        
        <HabitForm
        newHabit={newHabit}
        setNewHabit={setNewHabit}
        addHabit={addHabit}
        />

        <p>Total Habits: {habits.length}</p>

        <HabitList
        habits={habits}
        markDone={markDone}
        deleteHabit={deleteHabit}
        />

      
      </div>
    </>
  )
}

export default App
