import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(0);
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [status, setStatus] = useState(0);
  
  const [newStatus, setNewStatus] = useState(0);

  const [BookList, setBookList] = useState([]);
 

  const addBook= () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      date: date,
      author: author,
      publisher: publisher,
      status: status,
    }).then(() => {
      setBookList([
        ...BookList,
        {
          name: name,
          date: date,
          author: author,
          publisher: publisher,
          status: status,
        },
      ]);
    });
  };
  
  const getBook = () => {
    Axios.get("http://localhost:3001/books").then((response) => {
      setBookList(response.data);
    });
  };

  const updateBookStatus = (id) => {
    Axios.put("http://localhost:3001/update", { status: newStatus, id: id }).then(
      (response) => {
        setBookList(
          BookList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  author: val.author,
                  date: val.date,
                  publisher: val.publisher,
                  status: newStatus,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteBook = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
     console.log(response.data)  
    setBookList(
        BookList.filter((val) => {
          console.log(response)
          return val.id != id;
        }))})}
  
  return (
    <div className="App">
      <div className="information">
        <label>Title:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        /> 
        <label>DateofPublication:</label>
        <input
          type="number"
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        <label>Author:</label>
        <input
          type="text"
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
        />
        <label>Publisher:</label>
        <input
          type="text"
          onChange={(event) => {
            setPublisher(event.target.value);
          }}
        />
        <label>Status:</label>
        <input
          type="text"
          onChange={(event) => {
            setStatus(event.target.value);
          }}
        />
        <button onClick={addBook}>Added</button>
      </div>
      <div className="books">
        <button onClick={getBook}>Show Books</button>
        
        {BookList.map((val, key) => {
          return (
            <div className="book">
              <div>
                <h3>Title of book: {val.name}</h3>
                <h3>DateofPublication : {val.date}</h3>
                <h3>Author: {val.author}</h3>
                <h3>Publisher: {val.publisher}</h3>
                <h3>Status: {val.status}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="..."
                  onChange={(event) => {
                    setNewStatus(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateBookStatus(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteBook(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
         
      </div>
    </div>
  );
}

export default App;
