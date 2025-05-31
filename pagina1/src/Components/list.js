const List = (props) => {
  return (
    <ul>
      {props.items &&
        props.items.map((item) => (
          <li key={item.id || item.name}>
            <div>
              <h3
                onClick={() => props.toggle && props.toggle(item.id)}
                style={{
                  cursor: props.toggle ? 'pointer' : 'default',
                  textDecoration: item.complete ? 'line-through' : 'none',
                }}
              >
                {item.name}
              </h3>
              <p>{item.description || 'No description'}</p>
              <p>
                Due:{' '}
                {item.dueDate
                  ? new Date(item.dueDate).toLocaleDateString()
                  : 'No date'}
              </p>
            </div>
            <button onClick={() => props.remove && props.remove(item)}>
              X
            </button>
          </li>
        ))}
    </ul>
  );
};

export default List;
