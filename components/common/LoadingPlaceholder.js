import React from 'react'
import { Dimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native'
import { Card } from 'native-base';

const width = Dimensions.get('window').width;

export default () => (
  <Card>
    <ContentLoader 
      speed={2}
      width={width}
      height={450}
      viewBox={`0 0 ${width} 450`}
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      <Rect x={(width / 2) - 100} y='10' rx='0' ry='0' width='200' height='200' />
      <Rect x='20' y='220' rx='0' ry='0' width='100' height='20' />
      <Rect x='20' y='255' rx='0' ry='0' width='239' height='20' />
      <Rect x='20' y='282' rx='0' ry='0' width='274' height='20' />
      <Rect x='20' y='312' rx='0' ry='0' width='214' height='20' />
      <Rect x='20' y='352' rx='0' ry='0' width='110' height='30' />
    </ContentLoader>
  </Card>
);