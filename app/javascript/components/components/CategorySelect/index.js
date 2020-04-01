import React from 'react';
import {CheckBox} from '@components/Inputs';
import {LabelWrapper} from '@components/Inputs/Label';
import Loader from '@components/List/Loader';
import styles from './index.module.css';

const Category = ({category,defaultValue}) => {
  const value = category.value+"";
  return <CheckBox  defaultValue={defaultValue && defaultValue.includes(value)} label={category.label} name={value} />
}
export default ({categories,defaultValue}) => (<>
  <LabelWrapper>Categories</LabelWrapper>
  <div className={styles.checkboxes}>
    {categories ? (
      categories.map((category) => <Category key={category.value} category={category} defaultValue={defaultValue} />)
    ) : (
      <Loader className={styles.loader} text="categories" />
    )}
  </div>
</>)
