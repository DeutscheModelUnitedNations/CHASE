import type React from "react";
import FlipMove from "react-flip-move";
import type { SpeakersListData } from "./speakers_list_block";
import * as m from "@/paraglide/messages";

/**
 * This Component is used in the Queue List Component on the Speakers List Page.
 * It creates a list of boxes, each containing a country flag and the country name in
 * the oder of the given speakers list.
 * It uses the FlipMove Component to animate the boxes when they are added or removed from the list.
 */

export default function Timeline({
  list,
  content,
}: {
  list?: NonNullable<SpeakersListData>["speakers"];
  content: (
    item: NonNullable<SpeakersListData>["speakers"][number],
  ) => React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-1 flex-col">
        {list?.length && list?.length > 1 ? (
          <FlipMove
            duration={500}
            enterAnimation="fade"
            leaveAnimation="fade"
            appearAnimation="fade"
          >
            {list.slice(1).map((item: any) => {
              return (
                <div key={item.id} className="flex flex-col items-start">
                  {content(item)}
                </div>
              );
            })}
          </FlipMove>
        ) : (
          list?.length === 1 && (
            <div className="flex flex-1 items-center">
              <p className="text-sm text-gray-500">{m.listIsEmpty()}</p>
            </div>
          )
        )}
      </div>
    </>
  );
}
