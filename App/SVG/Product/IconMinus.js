import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const SvgComponent = (props) => (
  <Svg
    {...props}
    width={props?.size ||14}
    height={(props?.size * 0.15) || 2}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M13 1.75H1C.59 1.75.25 1.41.25 1S.59.25 1 .25h12c.41 0 .75.34.75.75s-.34.75-.75.75Z"
      fill={props?.color || "#0F172A"}
    />
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo
