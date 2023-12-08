import React, { ChangeEvent, useEffect, useState } from 'react';

import Input from '../../components/Input/Input.component';
import useDebounce from '../../hooks/search/useDebounce';

import useNetwork from '../../stores/network';

import styles from './Search.module.css';

type SearchResults = {
  profilePhoto: null | string;
  profilePhrase: null | string;
  userId: string;
  userName: string;
};

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);

  const { httpInterface } = useNetwork();

  const debouncedSearchText = useDebounce(query, 1000);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchText) {
      const search = async () => {
        httpInterface
          .searchUsers(debouncedSearchText)
          .then((res) => {
            console.log(res.data);

            setSearchResults(res.data);
          })
          .catch((err) => {
            console.log('search error');
            console.log(err);
          });
      };
      search();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchText]);

  return (
    <div>
      <Input
        name='query'
        onChangeHandler={changeHandler}
        value={query}
        className={styles['search-input']}
        placeholder='검색하실 아이디를 입력해주세요'
      />
      <ul>
        {searchResults.map((data, index) => {
          return (
            <a
              className={styles['search-box-a']}
              href={`profile/${data.userId}`}>
              <div className={styles['search-box']}>
                <div className={styles['search-users-img']}></div>
                <div className={styles['search-users-info']}>
                  <div className={styles['search-users-id']}>
                    @{data.userId}
                  </div>
                  <div className={styles['search-users-name']}>
                    {data.userName}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </ul>
    </div>
  );
}
