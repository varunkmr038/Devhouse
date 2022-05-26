import React from "react";

const ContextData = React.createContext();

function ContextProvider({ children }) {
  const [loading, isLoading] = React.useState(true);
  const [user, setUser] = React.useState([]);
  const [repo, setRepo] = React.useState([]);
  const [person, setPerson] = React.useState("");
  const [sortBy, setSortBy] = React.useState("forks");
  const [foundNoUser, setFoundNoUser] = React.useState(false);
  const [stats, setStats] = React.useState([]);

  function getUser() {
    fetch(`https://api.github.com/users/${person}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        setUser(data);
        isLoading(false);
        setFoundNoUser(false);
      })
      .catch((error) => {
        setFoundNoUser(true);
        isLoading(false);
      });
  }

  function fetchRepo() {
    fetch(`https://api.github.com/users/${person}/repos?per_page=100`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        setStats(data);
        setRepo(data.sort((a, b) => b.forks - a.forks).slice(0, 12));
      })
      .catch((error) => {
        console.log("error");
      });
  }

  React.useEffect(() => {
    getUser();
    fetchRepo();
  }, [person, loading]);

  const handleChange = (e) => {
    let jeff = [...repo];

    if (e.target.value === "forks") {
      let sorter = jeff.sort((a, b) => b.forks - a.forks);
      setRepo(sorter);
    }
    if (e.target.value === "stargazers_count") {
      let sorter = jeff.sort((a, b) => b.stargazers_count - a.stargazers_count);
      setRepo(sorter);
    }
    setSortBy(e.target.value);
  };

  return (
    <ContextData.Provider
      value={{
        loading,
        setPerson,
        user,
        repo,
        handleChange,
        foundNoUser,
        stats,
        sortBy,
      }}
    >
      {children}
    </ContextData.Provider>
  );
}

export { ContextData, ContextProvider };
