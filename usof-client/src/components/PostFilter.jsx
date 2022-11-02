import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({filter, setFilter }) => {
  return (
    <div>
        <MyInput
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
          placeholder="Search"
        
        />
        <MySelect
        value={filter.sort}
          defaultValue={"Sorting by"}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          options={[
            {value: "title", name: "By title"},
            {value: "content", name: "By content"}
          ]}
        />
      </div>
  )
}

export default PostFilter