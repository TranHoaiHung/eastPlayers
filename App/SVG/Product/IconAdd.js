import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const SvgComponent = (props) => (
  <Svg
    {...props}
    width={props?.size || 24}
    height={props?.size || 24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M18 12.75H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75Z"
      fill={props?.color || "#0F172A"}
    />
    <Path
      d="M12 18.75c-.41 0-.75-.34-.75-.75V6c0-.41.34-.75.75-.75s.75.34.75.75v12c0 .41-.34.75-.75.75Z"
      fill={props?.color || "#0F172A"}
    />
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo
