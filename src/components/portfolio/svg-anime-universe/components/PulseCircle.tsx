import { type FunctionComponent } from "react";

interface PulseCircleProps {
  cx: number;
  cy: number;
}
const PulseCircle: FunctionComponent<PulseCircleProps> = ({ cx, cy }) => (
  <>
    <circle cx={cx} cy={cy} r="20" stroke="red" strokeWidth={1} fill="transparent">
      <animate
        attributeType="SVG"
        attributeName="r"
        from="5"
        to="20"
        dur="1.5s"
        begin="0s"
        repeatCount="indefinite"
      />
      <animate
        attributeType="CSS"
        attributeName="opacity"
        from="1"
        to="0"
        dur="1.5s"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx={cx} cy={cy} r="20" stroke="red" strokeWidth={1} fill="transparent">
      <animate
        attributeType="SVG"
        attributeName="r"
        from="5"
        to="18"
        dur="1.5s"
        begin="0.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeType="CSS"
        attributeName="opacity"
        from="1"
        to="0"
        dur="1.5s"
        begin="0.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx={cx} cy={cy} fill="red" r={4} />
  </>
);

export default PulseCircle;
