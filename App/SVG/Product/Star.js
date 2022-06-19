import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const SvgComponent = (props) => (
  <Svg
    {...props}
    width={props?.size || 14}
    height={props?.size || 13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M6.144.634c.27-.829 1.443-.829 1.712 0l.963 2.963a.9.9 0 0 0 .855.621h3.116c.872 0 1.234 1.116.529 1.63l-2.52 1.83a.9.9 0 0 0-.328 1.006l.963 2.963c.27.829-.68 1.519-1.386 1.006l-2.52-1.83a.9.9 0 0 0-1.057 0l-2.52 1.83c-.706.513-1.654-.177-1.385-1.006l.963-2.963A.9.9 0 0 0 3.2 7.678L.682 5.848c-.705-.513-.342-1.629.53-1.629h3.114a.9.9 0 0 0 .856-.62L6.145.634Z"
      fill={props?.color || "#FDCC0B"}
    />
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo
