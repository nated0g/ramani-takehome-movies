import Image from "next/image";

import Movie from "../schema/Movie";
import Series from "../schema/Series";
import * as Constants from "../constants"
import { isMovie } from "../util";

type PreviewItemProps = {
  item: Movie | Series
}

export default function PreviewItem(props: PreviewItemProps){
  const {item} = props;
  const title = (isMovie(item)) ? item.title : item.name;
  return (
    <li key={item.id} className="relative cursor-pointer">
      <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
        <Image src={`${Constants.BASE_IMAGE_URL}${Constants.IMAGE_SIZE_THUMBNAIL}${item.poster_path}`} alt={`${title} poster`} className="object-cover pointer-events-none group-hover:opacity-75" layout='responsive' width={500} height={750} />
            <button type="button" className="absolute inset-0 focus:outline-none">
              <span className="sr-only">View details for {title}</span>
            </button>
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{title}</p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">Rating: {item.vote_average}</p>
    </li>
  )
}
