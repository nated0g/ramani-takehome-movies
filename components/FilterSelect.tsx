import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

type FilterSelectProps<ObjectType> = {
  className?: string;
  selected: ObjectType[];
  setSelected: Dispatch<SetStateAction<ObjectType[]>>;
  placeholder: string;
  label: string;
  multiple: boolean;
  list: ObjectType[];
}

export default function FilterSelect<ObjectType extends { id: number, name: string }>(props: FilterSelectProps<ObjectType>) {
  const { className, selected, setSelected, placeholder, label, multiple, list } = props;

  const removeObject = (toRemove: ObjectType) => {
    setSelected((prev) => {
      return prev.filter((c) => c !== toRemove);;
    })
  }

  return (
    <div className={`text-left items-center ${className}`}>
      <label
        htmlFor="filter"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <Listbox
        name="filter"
        value={selected}
        onChange={setSelected}
        multiple={multiple}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {selected.length
                ? selected.map((item) => (
                  <span key={item.id} id={item.name} className="transition-all inline-flex mx-0.5 items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {item.name}
                    <button
                      type="button"
                      className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-500 focus:outline-none focus:bg-slate-500 focus:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.currentTarget.blur();
                        removeObject(item);
                      }}
                    >
                      <span className="sr-only">Remove small option</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))
                : <span>{`${placeholder}`}</span>
              }
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {list.map((filter, filterIdx) => (
                <Listbox.Option
                  key={filterIdx}
                  id={`${filterIdx}${filter.name}`}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={filter}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {filter.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
