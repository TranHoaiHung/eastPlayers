import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const SvgComponent = (props) => (
  <Svg
    {...props}
    width={(props.size * 0.78) || 7}
    height={props.size || 9}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M1.74.97 5.26 4.5 1.74 8.03"
      stroke={props.color || "#9CA1B8"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo
