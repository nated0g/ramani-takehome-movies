import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

import Movie from '../schema/Movie'
import Series from '../schema/Series'
import * as Constants from "../constants"
import { isMovie } from '../util'
import Image from 'next/image'

type DetailModalProps = {
  item: Movie | Series;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DetailModal(props: DetailModalProps) {
  const { item, open, setOpen } = props;
  let title, dateString;
  if (item && isMovie(item)) {
    title = item.title
    dateString = 'Release date: ' + item.release_date;
  } else if (item) {
    title = item.name;
    dateString = 'First air date: ' + item.first_air_date;
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-700 bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:w-[50%] sm:p-6">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 justify-center align-middle">
                  <div className="align-middle">
                    <Image src={`${Constants.BASE_IMAGE_URL}${Constants.IMAGE_SIZE_THUMBNAIL}${item.poster_path}`} alt={`${title} poster`} layout='responsive' height={750} width={500}/>
                  </div>
                  <div>
                    <div className="px-4 py-5 sm:px-6">
                      <h2 className="text-xl leading-6 font-medium text-gray-900">{title}</h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">{dateString}</p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Overview</dt>
                          <dd className="mt-1 text-sm text-gray-900">{item.overview}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Rating</dt>
                          <dd className="mt-1 text-sm text-gray-900">{item.vote_average}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Number of votes</dt>
                          <dd className="mt-1 text-sm text-gray-900">{item.vote_count}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}