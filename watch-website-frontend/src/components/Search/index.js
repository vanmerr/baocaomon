
import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import style from './Search.module.scss';

const cx = classNames.bind(style);

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        // Clear search results on component unmount
        return () => setSearchResult([]);
    }, []);

    const handleSearch = () => {
        onSearch(query);
        setQuery('')
    };

    return (
        <Tippy
            interactive
            visible={searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {/* Display search results here */}
                        <p>Search results...</p>
                    </PopperWrapper>
                </div>
            )}
        >
            <div className={cx('search')}>
                <div className={cx('search-input-wrapper')}>
                    <input
                        placeholder="Tìm kiếm sản phẩm"
                        spellCheck={false}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && (
                        <button className={cx('clean-btn')} onClick={() => setQuery('')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                </div>
                <button className={cx('search-btn')} onClick={handleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </Tippy>
    );
};

export default Search;
