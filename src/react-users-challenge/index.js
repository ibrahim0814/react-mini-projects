import React from "react";
import { getUsers, deleteUser } from "./api_methods";

/* 
  Implement a button which makes a get request to https://reqres.in/ to get a list of users and display them.
  100% free reign to accomplish this goal however you wish, within the context of react.

  apiMethods.js file has already been stubbed out for you. Feel free to use it or not.

  ****Make any changes to this boilerplate that you want to.*****
  ****The included code is only provided as a convienence.****

  Bonus 1:  Add a button for each user to make a delete request to delete that user. 
          Update the displayed users excluding the deleted user.

  Bonus 2: Make a filter box to filter the displayed users by name.
*/

const SingleUser = ({
  avatar,
  firstName,
  lastName,
  id,
  email,
  handleDeleteUser,
}) => {
  return (
    <div
      id="user-container"
      style={{
        display: "flex",
        border: "1px solid white",
        padding: "5px",
        borderRadius: "5px",
        margin: "5px",
      }}
    >
      <img src={avatar} />
      <div style={{ padding: "10px" }}>
        <p>
          <strong>Name: </strong>
          {firstName} {lastName}
        </p>
        <p>
          <strong>Email: </strong>
          {email}
        </p>
        <button onClick={() => handleDeleteUser(id)}>Delete User</button>
      </div>
    </div>
  );
};

function UsersChallenge() {
  const [users, setUsers] = React.useState(null);
  const [searchString, setSearchString] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [isFiltering, setIsFiltering] = React.useState(false);

  const handleGetUsers = async () => {
    const allData = await getUsers();
    const usersArr = allData.data;
    console.log(usersArr);
    setUsers(usersArr);
  };

  const handleDeleteUser = async (id) => {
    const status = await deleteUser(id);
    if (status === 204) {
      let copyUsers = [...users];
      const userIndex = copyUsers.findIndex((user) => user.id === id);
      copyUsers.splice(userIndex, 1);
      setUsers(copyUsers);
    }
  };

  const handleSearchStringChange = (event) => {
    const newSearchString = event.target.value;
    setSearchString(newSearchString);
    if (newSearchString?.length > 0) {
      setIsFiltering(true);
      let newFilteredUsersArr = [];
      // i could've used Array.filter() here
      for (let user of users) {
        const username = `${user.first_name} ${user.last_name}`.toLowerCase();
        const hasSearchStringInName = username.includes(
          newSearchString.toLowerCase()
        );
        if (hasSearchStringInName) {
          newFilteredUsersArr.push(user);
        }
      }
      setFilteredUsers(newFilteredUsersArr);
    } else {
      setIsFiltering(false);
      setFilteredUsers([]);
    }
  };

  return (
    <div>
      <h2>Users from API:</h2>
      <div>
        <button onClick={handleGetUsers}>GET USERS</button>
        <div>
          Filter:{" "}
          <input value={searchString} onChange={handleSearchStringChange} />
        </div>

        {users &&
          !isFiltering &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <SingleUser
                  avatar={user.avatar}
                  email={user.email}
                  firstName={user.first_name}
                  lastName={user.last_name}
                  id={user.id}
                  handleDeleteUser={handleDeleteUser}
                />
              </div>
            );
          })}

        {isFiltering &&
          filteredUsers.length > 0 &&
          filteredUsers.map((filteredUser) => {
            return (
              <div key={filteredUser.id}>
                <SingleUser
                  avatar={filteredUser.avatar}
                  email={filteredUser.email}
                  firstName={filteredUser.first_name}
                  lastName={filteredUser.last_name}
                  id={filteredUser.id}
                  handleDeleteUser={handleDeleteUser}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UsersChallenge;
