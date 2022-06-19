import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const SvgComponent = (props) => (
  <Svg
    {...props}
    width={props?.size ||20}
    height={(props?.size * 0.85) || 17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M10 17 1.435 9.401A5.64 5.64 0 0 1 .333 7.537a5.78 5.78 0 0 1-.329-2.16 5.687 5.687 0 0 1 1.737-3.891A5.306 5.306 0 0 1 5.628.004c1.434.06 2.175.707 3.148 1.798.612.686 1.006 1.459 1.224 1.459.218 0 .51-.658 1.224-1.459C12.197.71 12.938.064 14.372.004a5.306 5.306 0 0 1 3.887 1.482 5.687 5.687 0 0 1 1.737 3.892A5.718 5.718 0 0 1 18.565 9.4L10 17Z"
      fill={props?.color || '#fff'}
    />
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo
