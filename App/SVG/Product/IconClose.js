import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const SvgComponent = (props) => (
  <Svg
    {...props}
    width={props?.size ||11}
    height={(props?.size * 0.91) ||10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M1.063 8.656 9.5.781M1.063.781 9.5 8.656"
      stroke={props?.color || "#D3D3E1"}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo
