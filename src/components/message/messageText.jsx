import React from 'react';

const Text = ({name, label, error, ...rest}) => {
  return (
      <div className="form-control twitterInputCont">
        <label className="formLabel" htmlFor={name}>&bull;&nbsp;{label}</label>
        <textarea rows="4" {...rest}
        name={name} id={name} aria-autocomplete="none"
        spellCheck="false" autoComplete="off" className="form-control shadow-none twitterInput m-0 p-0"/>
        {error && <div className="errorMess p-2 mx-1">{error}</div>}
      </div>
  );
};
export default Text;

