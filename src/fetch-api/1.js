import React from "react";

function ExampleOne() {
  const [users, setUsers] = React.useState(null);

  const getUserData = async () => {
    const users = await fetch("https://jsonplaceholder.typicode.com/users");
    const userJson = await users.json();
    return userJson;
  };

  React.useEffect(() => {
    getUserData().then((userData) => {
      setUsers(userData);
      console.log(userData);
    });
  }, []);

  return (
    <div>
      <header>
        {users === null && <div>No Users Found</div>}
        {users &&
          users.map((user) => {
            return <div key={user.id}>{user.name}</div>;
          })}
      </header>
    </div>
  );
}

export default ExampleOne;
