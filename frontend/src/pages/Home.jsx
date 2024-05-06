import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import '../styles/Home.css';

function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note Deleted!");
        } else {
          alert("Failed to delete note");
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title: title, content: content })
      .then((res) => {
        if (res.status === 201) {
          alert("Note Created");
        } else {
          alert("Failed to make note");
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
      <h2>Create Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
export default Home;
