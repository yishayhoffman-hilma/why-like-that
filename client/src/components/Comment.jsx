import "../App.css";
export default function Comment(props) {
  const activeUser = JSON.parse(localStorage.getItem("ActiveUser"));
  console.log(activeUser);

  return (
    <>
      <span>
        <span className="author">{props.author}</span>: {props.content}
      </span>

      {activeUser.userId === props.userId ? (
        <button
          onClick={() => {
            props.deleteComment(props.id);
          }}
        >
          delete
        </button>
      ) : (
        ""
      )}
      <br></br>
      <br></br>
    </>
  );
}
