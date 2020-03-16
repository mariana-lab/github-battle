import React from "react";

export default class UncontrolledForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.onChangeInputOnForm = this.onChangeInputOnForm.bind(this);
  }

  onChangeInputOnForm() {
    console.log(this.formRef.current.value);
  }
  //onChangeInputOnForm(kkk){console.log(kkk.target.value)}

  render() {
    return (
      <input
        type="text"
        ref={this.formRef}
        placeholder="lets see"
        onChange={this.onChangeInputOnForm}
      ></input>
    );
  }
}
