import React from 'react';

const Polygon = ({stroke, fill, size, className}) =>
<svg width={size} height={size} className={className} viewBox="0 0 160.619 139.1">
<polygon fill={fill} stroke={stroke} strokeWidth="6" points="41.31,137.1 2.31,69.55 41.31,2 119.31,2 158.31,69.55 119.31,137.1 "/>
</svg>

export default Polygon;
