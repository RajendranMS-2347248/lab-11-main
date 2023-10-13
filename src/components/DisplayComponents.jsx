import "./DisplayComponents.css";

export default function DisplayComponents({
  tasks,
  display_a_message,
  setTasksList,
}) {
  return tasks.map((element) => (
    <div key={element.name} className="displayComponent">
      <div
        style={{
          background: "#d0d0d0",
          border: "1px solid black",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4 style={{ textAlign: "center" }}>{element.name}</h4>
        <button onClick={() => display_a_message(element.name)}>Delete</button>
        <button
          onClick={() => setTasksList(element)}
          style={{ marginTop: "10px" }}
        >
          Update
        </button>
      </div>
    </div>
  ));
}

function card() {}
