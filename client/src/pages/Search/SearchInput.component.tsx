import React, { ChangeEvent, useEffect, useState } from 'react';

import Input from '../../components/Input/Input.component';
import useDebounce from '../../hooks/search/useDebounce';

import styles from './Search.module.css';

const dummyData = [
  {
    img: 'https://avatars.githubusercontent.com/u/52685261?v=4',
    userName: '김주현',
    userId: 'jju.hyeoni',
  },
  {
    img: 'https://avatars.githubusercontent.com/u/52685261?v=4',
    userName: '고석환',
    userId: 'k_osssshhhh',
  },
  {
    img: 'https://avatars.githubusercontent.com/u/52685261?v=4',
    userName: '이건희',
    userId: 'blackpepper__17',
  },
  {
    img: 'https://avatars.githubusercontent.com/u/52685261?v=4',
    userName: '윤서환',
    userId: 's_hxwan',
  },
  {
    img: 'https://avatars.githubusercontent.com/u/52685261?v=4',
    userName: '이승훈',
    userId: 'tmdgnsle',
  },
  {
    img: 'https://avatars.githubusercontent.com/u/52685261?v=4',
    userName: '윤성호',
    userId: 'barley_15',
  },
];

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // TODO: 데이터 형식 어떻게 받아올지 정하기

  const debouncedSearchText = useDebounce(query, 1000);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  // console.log(debouncedSearchText);

  useEffect(() => {
    if (debouncedSearchText) {
      const search = async () => {
        // 서버와 통신하는 부분.
      };
      search();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchText]);

  return (
    <div>
      <Input name='query' onChangeHandler={changeHandler} value={query} />
      <ul>
        {dummyData.map((data, index) => {
          return (
            <a
              className={styles['search-box-a']}
              href={`profile/${data.userId}`}>
              <div className={styles['search-box']}>
                <div className={styles['search-users-img']}></div>
                {/* </div> */}
                <div className={styles['search-users-info']}>
                  <div className={styles['search-users-id']}>{data.userId}</div>
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
