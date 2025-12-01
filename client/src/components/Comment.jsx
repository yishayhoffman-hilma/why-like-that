export default function Comment(props) {
  console.log(props);

  return (
    <>
      <p>{props.content}</p>
    </>
  );
}
