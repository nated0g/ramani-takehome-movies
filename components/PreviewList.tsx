import { Dispatch, SetStateAction } from "react";

import Movie from "../schema/Movie"
import Series from "../schema/Series"
import PreviewItem from "./PreviewItem"

type PreviewListProps = {
  items: (Movie | Series)[];
  setSelectedItem: Dispatch<SetStateAction<Movie | Series>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function PreviewList(props: PreviewListProps){
  const { items, setSelectedItem, setOpen } = props;
  return (
    <ul role="list" className="grid mt-10 grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 xl:grid-cols-5 lg:grid-cols-4 xl:gap-x-8">
      {items.map((item) => (
        <div key={item.id}  onClick={() => {

          setSelectedItem(item);
          setOpen(true);
        }}>
          <PreviewItem item={item} />
        </div>
      ))}
    </ul>
  )
}
