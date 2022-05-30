import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'

import Movie from '../schema/Movie'
import Series from '../schema/Series'

import { isMovie } from '../util'

type SearchProps = {
  items: (Movie | Series)[];
  setSelectedItem: Dispatch<SetStateAction<(Movie | Series)>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function Search(props: SearchProps){
  const { items, setSelectedItem, className, setOpen} = props;
  const [query, setQuery] = useState('')

  const filteredItems = (query === '')
      ? items
      : items.filter((item) => {
        let title = isMovie(item) ? item.title : item.name;
        return title?.toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      }
      );

  return (
    <div className={className + ' shrink-0'}>
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700"
      >
        Search
      </label>
      {/* The type error here is a bug in the library component, value and onChange should accept different types */}
      {/* @ts-ignore */}
      <Combobox name='search' value={items} onChange={
        (item: (Movie | Series)) => {
          setSelectedItem(item);
          setOpen(true);
        }
      }>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(item: Movie | Series) => isMovie(item) ? item.title : item.name}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItems.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {isMovie(item) ? item.title : item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                              }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
