import React from 'react';

const Polygon = ({stroke, fill, size, className}) =>
<svg width={size} height={size} className={className} viewBox="0 0 139.1 160.619">
<polygon fill={fill} stroke={stroke} strokeWidth="6" points="137.1,119.31 69.55,158.31 2,119.31 2,41.31 69.55,2.31 137.1,41.31 "/>
</svg>

export default Polygon;
