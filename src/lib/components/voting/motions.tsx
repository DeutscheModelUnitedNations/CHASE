import React from "react";
import WidgetTemplate from "../WidgetTemplate";
import WidgetBoxTemplate from "../WidgetBoxTemplate";
import NoDataPlaceholder from "../NoDataPlaceholder";
import FlipMove from "react-flip-move";
import type { Motion } from "@/lib/types/types";
import * as m from "@/paraglide/messages";
import { SmallFlag } from "../Flag";
import FAIcon from "../FAIcon";
import Button from "../Button";

/**
 * This Component is used on the Voting page and displays all open motions in a list format.
 * It also includes many animations, when a motion is added or removed.
 * When a motion is handeled by the chair, it can be highlighted.
 * The motions are preordered by the backend, so that the motions with most precedence are on top.
 */

export default function Motions({
  motionData,
  highlightedMotionId,
  setActiveMotion,
  chairOptions = false,
}: {
  motionData: Motion[];
  highlightedMotionId?: string;
  setActiveMotion: (motionId: string) => void;
  chairOptions?: boolean;
}) {

  return (
    <>
      <WidgetTemplate cardTitle="">
        {motionData.length === 0 ? (
          <NoDataPlaceholder title={m.currentlyNoMotions()} />
        ) : (
          <FlipMove
            duration={500}
            appearAnimation="fade"
            enterAnimation="fade"
            leaveAnimation="fade"
            className="flex flex-1 flex-col gap-2"
          >
            {motionData.map((motion) => {
              return (
                <div key={motion.motionId}>
                  <WidgetBoxTemplate
                    highlight={highlightedMotionId === motion.motionId}
                    onClick={() => setActiveMotion(motion.motionId)}
                  >
                    <SmallFlag
                      countryCode={motion.introducedBy}
                      showNameOnHover
                    />
                    <div className="flex-1 flex-col items-center justify-start">
                      <div className="text-gray-text dark:text-primary-800 text-sm font-semibold">
                        {motion.motionText}
                      </div>
                    </div>

                    {motion.status === "in-voting" && (
                      <FAIcon
                        icon="check-to-slot"
                        className="text-primary dark:text-primary-950 fa-beat-fade mr-1 text-3xl"
                      />
                    )}

                    {motion.status === "passed" &&
                      (motion.voting ? (
                        <FAIcon
                          icon="check-to-slot"
                          className="text-2xl text-green-700"
                        />
                      ) : (
                        <FAIcon
                          icon="circle-check"
                          className="text-2xl text-green-700"
                        />
                      ))}

                    {motion.status === "failed" &&
                      (motion.voting ? (
                        <FAIcon
                          icon="xmark-to-slot"
                          className="text-2xl text-red-600"
                        />
                      ) : (
                        <FAIcon
                          icon="xmark-circle"
                          className="text-2xl text-red-600"
                        />
                      ))}

                    {chairOptions && (
                      <>
                        {motion.status === "open" && (
                          <>
                            <Button
                              faIcon="circle-check"
                              faIconClassName="text-voting-for text-xl"
                              size="small"
                              text
                            />
                            <Button
                              faIcon="xmark-circle"
                              faIconClassName="text-voting-against text-xl"
                              size="small"
                              text
                            />
                            <Button
                              faIcon="check-to-slot"
                              faIconClassName="dark:text-white text-xl"
                              size="small"
                            />
                          </>
                        )}
                        <Button
                          faIcon="trash-alt"
                          faIconClassName="text-lg"
                          size="small"
                          severity="danger"
                        />
                      </>
                    )}
                  </WidgetBoxTemplate>
                </div>
              );
            })}
          </FlipMove>
        )}
      </WidgetTemplate>
    </>
  );
}
