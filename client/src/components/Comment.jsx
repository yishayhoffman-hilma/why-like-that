import "../App.css";
export default function Comment(props) {
  console.log(props);

  return (
    <>
      <p>
        <span className="author">{props.author}</span>: {props.content}
      </p>
    </>
  );
}
