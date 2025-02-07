import Link from 'next/link';
import { useState, useEffect } from 'react';
import CodeHighlight from '../../components/Highlight';
import ClickAwayListener from 'react-click-away-listener';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '@/components/Icon/IconCode';
import IconSearch from '@/components/Icon/IconSearch';
import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';

const items = [
    {
        thumb: 'profile-5.jpeg',
        name: 'Alan Green',
        email: 'alan@mail.com',
        status: 'Active',
        statusClass: 'badge badge-outline-primary',
    },
    {
        thumb: 'profile-11.jpeg',
        name: 'Linda Nelson',
        email: 'Linda@mail.com',
        status: 'Busy',
        statusClass: 'badge badge-outline-danger',
    },
    {
        thumb: 'profile-12.jpeg',
        name: 'Lila Perry',
        email: 'Lila@mail.com',
        status: 'Closed',
        statusClass: 'badge badge-outline-warning',
    },
    {
        thumb: 'profile-3.jpeg',
        name: 'Andy King',
        email: 'Andy@mail.com',
        status: 'Active',
        statusClass: 'badge badge-outline-primary',
    },
    {
        thumb: 'profile-15.jpeg',
        name: 'Jesse Cory',
        email: 'Jesse@mail.com',
        status: 'Busy',
        statusClass: 'badge badge-outline-danger',
    },
];

const Search = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Search'));
    });

    const [search, setSearch] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<any>(items);

    const [codeArr, setCodeArr] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    useEffect(() => {
        setFilteredItems(() => {
            return items.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search]);

    const [focus, setFocus] = useState(false);

    const overlaySearchClick = () => {
        setFocus(true);
    };
    const overlayClickAway = () => {
        setFocus(false);
    };
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="#" className="text-primary hover:underline">
                        Elements
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Search</span>
                </li>
            </ul>
            <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
                {/* Live Search */}
                <div className="panel lg:row-span-2" id="live">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Live Search</h5>
                        <button
                            onClick={() => {
                                toggleCode('code1');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 space-y-5">
                        <div>
                            <form className="mx-auto mb-5 w-full sm:w-1/2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        placeholder="Search Attendees..."
                                        className="form-input h-11 rounded-full bg-white shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <button type="button" className="btn btn-primary absolute inset-y-0 m-auto flex h-9 w-9 items-center justify-center rounded-full p-0 ltr:right-1 rtl:left-1">
                                        <IconSearch className="mx-auto" />
                                    </button>
                                </div>
                            </form>
                            <div className="block w-full space-y-4 overflow-x-auto rounded-lg border border-white-dark/20 p-4">
                                {filteredItems.map((item: any) => {
                                    return (
                                        <div
                                            key={item.email}
                                            className="flex min-w-[625px] items-center justify-between rounded-xl bg-white p-3 font-semibold
                                         text-gray-500 shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] transition-all duration-300 hover:scale-[1.01] hover:text-primary dark:bg-[#1b2e4b]"
                                        >
                                            <div className="user-profile">
                                                <img src={`/assets/images/${item.thumb}`} alt="img" className="h-8 w-8 rounded-md object-cover" />
                                            </div>
                                            <div>{item.name}</div>
                                            <div>{item.email}</div>
                                            <div className={`badge ${item.statusClass} border-2 border-dashed`}>{item.status}</div>
                                            <div className="cursor-pointer">
                                                <IconHorizontalDots className="w-6 h-6 opacity-70" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code1') && (
                        <CodeHighlight>
                            <pre className="language-typescript">
                                {`import { useState, useEffect } from 'react';

const items = [
    {
        thumb: 'profile-5.jpeg',
        name: 'Alan Green',
        email: 'alan@mail.com',
        status: 'Active',
        statusClass: 'badge badge-outline-primary',
    },
    {
        thumb: 'profile-11.jpeg',
        name: 'Linda Nelson',
        email: 'Linda@mail.com',
        status: 'Busy',
        statusClass: 'badge badge-outline-danger',
    },
    {
        thumb: 'profile-12.jpeg',
        name: 'Lila Perry',
        email: 'Lila@mail.com',
        status: 'Closed',
        statusClass: 'badge badge-outline-warning',
    },
    {
        thumb: 'profile-3.jpeg',
        name: 'Andy King',
        email: 'Andy@mail.com',
        status: 'Active',
        statusClass: 'badge badge-outline-primary',
    },
    {
        thumb: 'profile-15.jpeg',
        name: 'Jesse Cory',
        email: 'Jesse@mail.com',
        status: 'Busy',
        statusClass: 'badge badge-outline-danger',
    },
];

const [search, setSearch] = useState<string>('');
const [filteredItems, setFilteredItems] = useState<any>(items);

useEffect(() => {
        setFilteredItems(() => {
            return items.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase());
            });
        });
}, [search]);


<div className="mb-5 space-y-5">
    <form className="mx-auto w-full sm:w-1/2 mb-5">
        <div className="relative">
            <input
                type="text"
                value={search}
                placeholder="Search Attendees..."
                className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="button" className="btn btn-primary absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full w-9 h-9 p-0 flex items-center justify-center">
                <svg>...</svg>
            </button>
        </div>
    </form>
    <div className="p-4 border border-white-dark/20 rounded-lg space-y-4 overflow-x-auto w-full block">
        {filteredItems.map((item: any) => {
            return (
                <div
                    key={item.email}
                    className="bg-white dark:bg-[#1b2e4b] rounded-xl shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] p-3 flex items-center justify-between
                        text-gray-500 font-semibold min-w-[625px] hover:text-primary transition-all duration-300 hover:scale-[1.01]"
                >
                    <div className="user-profile">
                        <img src={\`/assets/images/\${item.thumb}\`} alt="img" className="w-8 h-8 rounded-md object-cover" />
                    </div>
                    <div>{item.name}</div>
                    <div>{item.email}</div>
                    <div className={\`badge \${item.statusClass} border-2 border-dashed\`}>{item.status}</div>
                    <div className="cursor-pointer">
                        <svg>...</svg>
                    </div>
                </div>
            );
        })}
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Overlay */}
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Overlay</h5>
                        <button
                            onClick={() => {
                                toggleCode('code2');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 space-y-5">
                        <form>
                            <ClickAwayListener onClickAway={overlayClickAway}>
                                <div className="search-form-overlay relative h-12 w-full rounded-md border border-white-dark/20" onClick={overlaySearchClick}>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className={`peer form-input hidden h-full bg-white placeholder:tracking-wider ltr:pl-12 rtl:pr-12 ${focus ? '!block' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        className={`absolute inset-y-0 my-auto flex h-9 w-9 items-center justify-center p-0 text-dark/70 peer-focus:text-primary ltr:right-1 rtl:left-1 ${
                                            focus ? '!ltr:!right-auto ltr:left-1 rtl:right-1' : ''
                                        }`}
                                    >
                                        <IconSearch className="mx-auto w-5 h-5" />
                                    </button>
                                </div>
                            </ClickAwayListener>
                        </form>
                    </div>
                    {codeArr.includes('code2') && (
                        <CodeHighlight>
                            <pre className="language-typescript">
                                {`import { useState} from 'react';

const [focus, setFocus] = useState(false);

const overlayClickAway = () => {
    setFocus(false);
};

<form>
    <ClickAwayListener onClickAway={overlayClickAway}>
        <div className="search-form-overlay relative border border-white-dark/20 rounded-md h-12 w-full" onClick={overlaySearchClick}>
            <input
                type="text"
                placeholder="Search..."
                className={\`form-input bg-white h-full placeholder:tracking-wider hidden ltr:pl-12 rtl:pr-12 peer ${focus ? '!block' : ''}\`}
            />
            <button
                type="button"
                className={\`text-dark/70 absolute ltr:right-1 rtl:left-1 inset-y-0 my-auto w-9 h-9 p-0 flex items-center justify-center peer-focus:text-primary ${
                    focus ? '!ltr:!right-auto ltr:left-1 rtl:right-1' : ''
                }\`}
            >
                <svg>...</svg>
            </button>
        </div>
    </ClickAwayListener>
</form>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Search Box */}
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Search Box</h5>
                        <button
                            onClick={() => {
                                toggleCode('code3');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 space-y-5">
                        <form>
                            <div className="relative flex w-full  border border-white-dark/20">
                                <button type="submit" className="m-auto flex items-center justify-center p-3 text-primary">
                                    <IconSearch className="mx-auto w-5 h-5" />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Let's find your question in fast way"
                                    className="form-input rounded-none border-0 border-l bg-white  py-3 placeholder:tracking-wider focus:shadow-[0_0_5px_2px_rgb(194_213_255_/_62%)] focus:outline-none dark:shadow-[#1b2e4b]"
                                />
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code3') && (
                        <CodeHighlight>
                            <pre className="language-typescript">
                                {`import { useState} from 'react';
import ClickAwayListener from 'react-click-away-listener';

const [focus, setFocus] = useState(false);

const overlaySearchClick = () => {
        setFocus(true);
};

<form>
    <div className="relative border border-white-dark/20  w-full flex">
        <button type="submit" className="text-primary m-auto p-3 flex items-center justify-center">
            <svg>...</svg>
        </button>
        <input
            type="text"
            placeholder="Let's find your question in fast way"
            className="form-input border-0 border-l rounded-none bg-white  focus:shadow-[0_0_5px_2px_rgb(194_213_255_/_62%)] dark:shadow-[#1b2e4b] placeholder:tracking-wider focus:outline-none py-3"
        />
    </div>
</form>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
