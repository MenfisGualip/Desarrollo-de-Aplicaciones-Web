const List = (props) => {
  return (
      <ul>
          {props.items &&
              props.items.map((item) => (
                  <li key={item.id || item.name}>  {/* Usa item.id si existe, si no item.name */}
                      <div>
                          <h3>{item.name}</h3>
                          <p>{item.description || "No description"}</p>
                          <p>Due: {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "No date"}</p>
                      </div>
                      <button onClick={() => props.remove && props.remove(item.id || item.name)}>X</button>
                  </li>
              ))}
      </ul>
  );
};

export default List;