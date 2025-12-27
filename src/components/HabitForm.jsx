function HabitForm({ newHabit, setNewHabit, addHabit }) {
  return (
    <>
    <div className="form-row">
    <input type="text" 
        placeholder="Enter habit" 
        value = {newHabit}
        onChange= {(e) => setNewHabit(e.target.value)}>
        </input>

        <button onClick={addHabit}>Add Habit</button>
         </div></>
  );
}

export default HabitForm;