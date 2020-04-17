import React from 'react';
import {CheckBox} from '@components/Inputs';
import {LabelWrapper} from '@components/Inputs/Label';
import Loader from '@components/List/Loader';
import styles from './index.module.css';

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
}
const Category = ({category,defaultValue}) => {
  return <CheckBox defaultValue={defaultValue && contains(defaultValue, category.value)} label={category.label} name={category.value+""} />
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
