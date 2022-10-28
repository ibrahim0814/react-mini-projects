import React, { useEffect, useState } from "react";

// key to this is to have two states
// one is the real search value which updates character by character
// the other one is to have a debounced state value, which you update after a settimeout
// you only search the api once you've updated the debounced value

const SearchDebounce = () => {
  const [notices, setNotices] = useState(null);
  const [search, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [searchDebouncedValue, setSearchDebouncedValue] = useState(null);

  const searchApi = async () => {
    setIsLoading(true);
    // make sure to update to debounced search value in URl too
    const url = `https://ws-public.interpol.int/notices/v1/red?forename=${searchDebouncedValue}&resultPerPage=200`;
    const data = await fetch(url);
    const dataJson = await data.json();
    const notices = dataJson._embedded.notices;
    console.log(notices);
    setNotices(notices);
    setIsLoading(false);
  };

  useEffect(() => {
    const timeoutDebounce = setTimeout(() => {
      if (search?.length > 0) {
        setSearchDebouncedValue(search);
      } else {
        setNotices([]);
      }
    }, 500);

    return () => clearTimeout(timeoutDebounce);
  }, [search]);

  useEffect(() => {
    searchApi();
  }, [searchDebouncedValue]);

  return (
    <div>
      <h2>Debouced Search</h2>
      <label style={{ fontSize: "1rem" }}>Search Interpol: </label>
      <input
        type="search"
        placeholder="Enter search"
        onChange={(e) => setSearch(e.target.value)}
      />

      {notices &&
        !isLoading &&
        notices.map((notice) => {
          return (
            <div key={notice.entity_id}>
              {notice.name} {notice.forename}
            </div>
          );
        })}

      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default SearchDebounce;
