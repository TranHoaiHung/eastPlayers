import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const SvgComponent = (props) => (
  <Svg
    {...props}
    width={(props?.size * 0.64 ) || 9}
    height={props?.size ||14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M7.1 12.883 1.233 7 7.1 1.117"
      stroke={props?.color || "#0F172A"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo
